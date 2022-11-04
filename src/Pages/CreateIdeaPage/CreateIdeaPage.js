import './CreateIdeaPage.css'
import '../SignUpPage/SignUpPage.css'

import {useInput, useSuggestedListInput} from "../../Utils/UseInput";
import {validateEmptyList} from "../../Utils/Validations";
import {TextField} from "../../Components/UI/TextField/TextField";
import {SuggestedList} from "../../Components/UI/SuggestedList/SuggestedList";
import {FilledButton} from "../../Components/UI/FilledButton/FilledButton";
import React from "react";

const CreateIdeaPage = () => {
    const description = useInput("")
    const directions = useSuggestedListInput([])

    const directionsOptions = [
        {
            name: "Архитектура"
        },
        {
            name: "Медицина"
        }
    ]

    const createIdea = (e) => {
        let directionValidation = validateEmptyList(directions.value)
        let isValid = true

        directions.setValidation(directionValidation)

        if (directionValidation !== "") {
            isValid = false
        }

        if (description.value.length < 200) {
            description.setValidation("Введите хотя бы 200 символов")
            isValid = false
        } else {
            description.setValidation("")
        }


        if (isValid){

        }

    }
    return (
        <div className={"sign-up-form"}>
            <div className={"form-header"}>
                Расскажите о вашей идее
            </div>
            <div className={"sign-up-form-main"}>
                <div className={"sign-up-form-row"}>
                    <TextField name={"description"} type={"text"} onChange={description.valueHandler} value={description.value}
                               validation={description.validation}
                               placeholder={"Напишите о идее тут"} title={"Описание"} width={"75%"}
                               description={"Опишите идею в свободной форме"} multipleLines={"100px"} />
                </div>
                <div className={"sign-up-form-row"}>
                    <SuggestedList name={"directions"} width={"70%"} placeholder={"Выберите"} suggestions={directionsOptions}
                                   title={"Какими бы словами вы описали эту идею?"}
                                   addValue={directions.addValueHandler}
                                   removeValue={directions.removeValueHandler} value={directions.value}
                                   setValue={directions.setValue} validation={directions.validation}/>
                </div>

                <div className={"sign-up-form-low"} style={{
                    justifyContent: "end"
                }}>
                    <FilledButton text={"Готово!"} name={"sign-up"} id={"sign-up-button"} onClick={createIdea}/>
                </div>
            </div>
        </div>
    )
}

export { CreateIdeaPage }