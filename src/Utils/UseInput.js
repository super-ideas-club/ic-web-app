import {useState} from "react";

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
        setValue(value.concat([e]))
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