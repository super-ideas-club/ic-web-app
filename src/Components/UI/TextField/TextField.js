import React from "react";

import './TextField.css'


const TextField = (props) => {

    let input = <input name={props.name} type={props.type} placeholder={props.placeholder}
                       value={props.value} onChange={props.onChange}/>
    if (props.multipleLines) {
        input = <textarea className={"multiple-lines"} style={{height: props.multipleLines}} name={props.name}
                          type={props.type} placeholder={props.placeholder} value={props.value}
                          onChange={props.onChange}
                    ></textarea>
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
            {input}
            <div className={"text-field-description"}>
                {props.description}
            </div>
        </div>
    )
}

export { TextField }