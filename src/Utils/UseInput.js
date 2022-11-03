import {useState} from "react";
import {valueSelection} from "./Validations";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const [validation, setValidation] = useState("")

    const valueHandler = (e) => {
        setValue(e.target.value)
    }


    return {
        value,
        validation,
        setValidation,
        setValue,
        valueHandler
    }
}

const useSuggestedListInput = (initialValue) => {

    const [value, setValue] = useState(initialValue)
    const [validation, setValidation] = useState("")

    const addValueHandler = (e) => {
        value.push(e)
    }

    const removeValueHandler = (e) => {
        setValue(value.filter((a) => {return a !== e}))
    }

    return {
        value,
        validation,
        setValidation,
        setValue,
        addValueHandler,
        removeValueHandler
    }
}

export { useInput, useSuggestedListInput }