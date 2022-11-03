import './SelectInput.css'
import '../TextField/TextField.css'
import React from "react";

const SelectInput = (props) => {
    let options = []

    for (let option in props.options) {
        options.push(<option value={props.options[option].value}>{props.options[option].title}</option>)
    }

  return (
      <div className={"text-field"} style={{width: props.width}}>
          <div className={"upon-text-field"}>
              <div className={"text-field-title"}>
                  {props.title}
              </div>
              <div className={"text-field-validation"}>
                  { props.validation }
              </div>
          </div>
          <select className={"select-input"} value={props.value} onChange={props.onChange}>
              {options}
          </select>
          <div className={"text-field-description"}>
              {props.description}
          </div>
      </div>
  )
}

export { SelectInput }