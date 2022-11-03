import '../TextField/TextField.css'
import './SuggestedList.css'
import React from "react";
import {DropDownInputField} from "../DropDownInputField/DropDownInputField";
import {useInput} from "../../../Utils/UseInput";
import {valueSelection} from "../../../Utils/Validations";

const ListElement = (props) => {
    return (
        <div className={"suggested-list-element"} onClick={(e) => props.remove(props.value)}>
            {props.value + " x"}
        </div>
    )
}

const SuggestedList = (props) => {

    let currentValue = useInput("")

    const addElement = (e) => {
        if(currentValue.value){
            if(currentValue.value !== ""){
                if (!props.suggestedOnly || props.suggestions.find( (item, index, array) =>
                { return item.name === currentValue.value}) ){
                    props.addValue(currentValue.value)
                    currentValue.setValue("")
                }
            }
        }
    }

    return (
        <div className={"text-field"} style={{width: props.width}}>
            <div className={"upon-text-field"}>
                <div className={"text-field-title"}>
                    { props.title }
                </div>
                <div className={"text-field-validation"}>
                    { props.validation }
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <DropDownInputField type={"text"} width={props.width} title={props.title}
                                    placeholder={props.placeholder} suggestions={props.suggestions}
                                    onChange={currentValue.valueHandler} value={currentValue.value}
                                    setValue={currentValue.setValue} maxHeight={"200px"}
                                    autosuggestOnly/>
                <button className={"add-element-button"} onClick={addElement}>\/</button>
            </div>
            <div className={"suggested-list-container"}>
                {props.value.map((a) => {
                    return <ListElement value={a} remove={props.removeValue}/>;
                })}
            </div>
        </div>
    )
}

export { SuggestedList }

