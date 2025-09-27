import React from 'react'
import main_icon from '../../../public/main-icon .png'

import './ShuttleSplit.css'

const ShuttleSplit = () => {
  return (
    <div className="shuttle-split">
      <div className="shuttle-split-form">
        <img src={main_icon} alt="" />
        <h2>Session Cost Calculator</h2>
        <form>
          <label htmlFor="sessionTemplate">Session Template:</label>
          <select name="sessionTemplate" title="Select a template">
            <option value={"template1"}>Template_1</option>
            <option value={"template2"}>Template_2</option>
            <option value={"template3"}>Template_3</option>
          </select>
          <label htmlFor="billType">Billing Type:</label>
          <select name="billType">
            <option value="weighted">Weighted</option>
            <option value="equally">Equally</option>
          </select>
          <label htmlFor="players">Players (comman-separated):</label>
          <input name="players" placeholder="Đạt, Thảo, Văn, Huy, Vu, Thịnh" />
          <label htmlFor="rentalCost">Rental Cost:</label>
          <input name="rentalCost" type="number" min={1} placeholder="200" />
          <label htmlFor="shuttleAmount">Shuttle Amount:</label>
          <input name="shuttleAmount" type="number" min={1} placeholder="3" />
          <label htmlFor="shuttlePrice">Shuttle Prices</label>
          <input name="shuttlePrice" type="number" min={1} placeholder="26" />
          <button className="btn-normal">Calculate</button>
        </form>
      </div>
    </div>
  )
}

export default ShuttleSplit
