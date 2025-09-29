import type { Template } from "../models/Template"

export type ShuttleSplitTemplatesData = {
  data: Template[]
}

export class HttpShuttleSplitGetTemplatesResponse {
  data?: ShuttleSplitTemplatesData
  templateMap?: Map<number, Template>
  constructor(data?: ShuttleSplitTemplatesData){
    this.data = data
  }
  public getTemplateMap = (): Map<number, Template> => {
    if(!this.templateMap) {
      this.templateMap = new Map(this.data?.data.map((item: Template) => {
            return [item.id, item]
          }))
    }
    return this.templateMap
  }
}