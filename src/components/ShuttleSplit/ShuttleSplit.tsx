import { Fragment, useEffect, useRef, useState, type ChangeEvent } from 'react'
import main_icon from '../../assets/main-icon.webp'
import download_icon from '../../assets/download-icon.svg'

import './ShuttleSplit.css'
import { useForm } from "react-hook-form"
import type { Template } from "../../common/models/Template"
import { ShuttleSplitCalculationEquallyRequestForm, ShuttleSplitCalculationWeightedRequestForm } from "../../common/requestForm/HttpShuttleSplitCalculationRequest"
import { HttpShuttleSplitCalculationResponse, type ShuttleSplitCalculationCost, } from "../../common/responseForm/HttpShuttleSplitCalculationResponse"
import { httpGet, httpPost } from "../../common/requestForm/HttpRequest"
import { HttpShuttleSplitGetTemplatesResponse } from "../../common/responseForm/HttpShuttleSplitGetTemplatesResponse"
import DownloadHTMLButton from "../DownloadHTMLButton/DownloadHTMLButton"
import Modal from "../Modal/Modal"
// import DataTable from "../DataTable/DataTable"

const ShuttleSplit = () => {

  const formTypeList: string[] = ["equally", "weighted"]
  const columns = { name: "Name", fee: "Fee" }
  const listSeparatorRegx = /\s*,\s*/

  const [templates, setTemplates] = useState<Map<number, Template>>(new Map())
  const [selectedTemplateType, setSelectedTemplateType] = useState<string>(formTypeList[0])
  const [calculationData, setCalculationData] = useState<ShuttleSplitCalculationCost>();
  const { register, handleSubmit, setValue, reset, getValues, formState } = useForm();
  const [targetModal, setTargetModal] = useState(false)

  const scrollFocusRef = useRef<HTMLTableElement | any>(null)
  const downloadRef = useRef<HTMLDivElement | any>(null)

  const handleOnChangeTemplate = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const templateId = Number(event.target.value)
    if (templateId !== -1) {
      const item = templates.get(templateId) as Template
      Object.keys(item).map((key: string) => {
        setValue(key, item[key as keyof Template])
      })
      setValue("numberOfPlayers", item.players?.length)
      setSelectedTemplateType(formTypeList[item.billingType - 1])
    } else {
      reset();
      setSelectedTemplateType(formTypeList[0])
    }
  }

  const handleListInput = (value: string) => {
    const valueList = typeof value === 'string' ? value.split(listSeparatorRegx) : getValues("players") || []
    return valueList.filter((item: string) => item.trim() !== "")
  }

  const handleBeforeDownLoad = () => {
    setTargetModal(true)
    calculationData && formState.isSubmitted && downloadRef.current?.scrollIntoView({ behavior: "smooth" }) || ""
  }

  const renderCostsList = () => {
    return (
      <table className="table" ref={scrollFocusRef} id="costs-table">
        <thead>
          <tr>
            <th colSpan={Object.keys(columns).length} style={{ backgroundColor: "unset", paddingTop: "0px", paddingBottom: "0px"}}>
              <input type="date" {...register("latestDate")} />
            </th>
          </tr>
          <tr>
            {
              Object.keys(columns).map((k: string) => {
                return <th key={k}>{columns[k as keyof typeof columns]}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            calculationData &&
            Object.keys(calculationData.cost).map((key: string, index) => {
              return <tr key={`_${index}`}>
                <td>{key}</td>
                <td>{calculationData.cost[key] || ""}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    )
  }

  const onSubmitForm = (formData: any) => {
    let requestForm = null
    let endpoint: string = "Not Found"
    if (selectedTemplateType === formTypeList[1]) {
      endpoint = "/sessions/calc-cost-weighted"
      requestForm = new ShuttleSplitCalculationWeightedRequestForm(formData)
    } else if (selectedTemplateType === formTypeList[0]) {
      endpoint = "/sessions/calc-cost-equally"
      requestForm = new ShuttleSplitCalculationEquallyRequestForm(formData)
    }
    const response = new HttpShuttleSplitCalculationResponse()
    httpPost(endpoint, {}, { ...requestForm })
      .then((res) => {
        response.data = res.data
        setCalculationData(response.getData())
      })
      .catch((error) => {
        setCalculationData(undefined)
        console.log("Fetch data error: ", error)
      });
  }

  useEffect(() => {
    if (templates.size === 0)
      httpGet('/sessions/templates')
        .then((res) => {
          const response = new HttpShuttleSplitGetTemplatesResponse(res.data)
          setTemplates(response.getTemplateMap())
        })
        .catch((error) => console.error('Error fetching data:', error));
    calculationData && formState.isSubmitted && scrollFocusRef.current?.scrollIntoView({ behavior: "smooth" }) || ""
  }, [
    calculationData
  ]);

  return (
    <div className="shuttle-split">
      <div className="shuttle-split-form">
        <img src={main_icon} rel="preload" alt="" />
        <h2>Session Cost Calculator</h2>
        <div className="option">
          <label htmlFor="sessionTemplate">Session Template:</label>
          <select id="sessionTemplate" title="Select a template" onChange={(e) => handleOnChangeTemplate(e)}>
            <option value={-1}>-- Please select a template ---</option>
            {
              [...templates?.values()].map((template) => {
                return (
                  <option key={template.id} value={template.id}>{template.name}</option>
                )
              })
            }
          </select>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <label htmlFor="billType">Billing Type:</label>
          <select id="billType" value={selectedTemplateType} onChange={e => { setSelectedTemplateType(e.target.value) }}>
            {
              formTypeList?.map((formType: string) => {
                return <option value={formType} key={formType}>{formType[0].toUpperCase() + formType.slice(1)}</option>
              })
            }
          </select>
          <div style={{ display: selectedTemplateType === "weighted" ? "inherit" : "none" }}>
            <label htmlFor="players">Players (comman-separated):</label>
            <input id="players" type="text" placeholder="Đạt, Thảo, Văn, Huy, Vu, Thịnh"
              {...register("players",
                {
                  setValueAs: (value) => handleListInput(value)
                })
              }
            />
          </div>
          <div style={{ display: selectedTemplateType === "equally" ? "inherit" : "none" }}>
            <label htmlFor="numberOfPlayers">Number of Players:</label>
            <input id="numberOfPlayers" type="number" min={1} placeholder="5"
              {...register("numberOfPlayers", { valueAsNumber: true })}
            />
          </div>
          <label htmlFor="rentalCost">Rental Cost:</label>
          <input id="rentalCost" type="number" min={1} placeholder="200"
            {...register("rentalCost", { valueAsNumber: true })}
          />
          <label htmlFor="shuttleAmount">Shuttle Amount:</label>
          <input id="shuttleAmount" type="number" min={1} placeholder="3"
            {...register("shuttleAmount", { valueAsNumber: true })}
          />
          <label htmlFor="shuttlePrice">Shuttle Prices</label>
          <input id="shuttlePrice" type="number" min={1} placeholder="26"
            {...register("shuttlePrice", { valueAsNumber: true })}
          />
          <input className="btn btn-normal" type="submit" value="Calculate" disabled={formState.isSubmitting} />
        </form>
      </div>
      {
        <Modal title="Results" setTarget={setTargetModal} target={targetModal}>
          <div className="costs-list" id="costs">
            {
              calculationData &&
              renderCostsList()
            }
          </div>
        </Modal>
      }
      {/* <DataTable title="Players"></DataTable> */}
      <div className="costs-list" id="costs" ref={downloadRef}>
        {
          calculationData &&
          <Fragment>
            {renderCostsList()}
            <div className="download-ref">
              <DownloadHTMLButton svg={download_icon} refElement={scrollFocusRef} onBefore={handleBeforeDownLoad}></DownloadHTMLButton>
            </div>
          </Fragment>
        }
      </div>
    </div>
  )
}


export default ShuttleSplit
