import './CreateIdeaPage.css'
import '../SignUpPage/SignUpPage.css'

import {useInput, useSuggestedListInput} from "../../Utils/UseInput";
import {validateEmpty, validateEmptyList} from "../../Utils/Validations";
import {TextField} from "../../Components/UI/TextField/TextField";
import {SuggestedList} from "../../Components/UI/SuggestedList/SuggestedList";
import {FilledButton} from "../../Components/UI/FilledButton/FilledButton";
import React, {useContext, useState} from "react";
import axios from "axios";
import {config, headers} from "../../config";
import {Navigate} from "react-router-dom";
import {Context} from "../../Utils/Context";

const CreateIdeaPage = () => {
    const description = useInput("")
    const name = useInput("")
    const directions = useSuggestedListInput([])

    const [directionsOptions, setDirectionsOptions] = useState([])
    const [getData, setGetData] = useState(false)
    const [isCreated, setCreated] = useState(false)



    const { currentPerson } = useContext(Context)

    if (!getData) {

        axios.get(config.getAllThemes,
            {
                headers: headers,
                baseURL: config.serverUrl
            }).then( (result) => {
                setDirectionsOptions(result.data.map( (theme) => {
                    return {
                        id: theme.pk,
                        name: theme.name
                    }
                }))
        } ).catch( (error) => {
            console.log(error)
        })

        setGetData(true)
    }


    
    const addTheme = (e) => {
        let direction = directionsOptions.find( (item, index, array) => item.name === e)

        if (direction){
            directions.addValueHandler(direction)
        }else{
            axios.post(config.serverUrl + config.postNewTheme, {
                name: e
            }).then( (result) => {
                console.log(result.data)
                directions.addValueHandler({
                    id: result.data.pk,
                    name: result.data.name
                })
            }).catch( (error) => {
                console.log(error)
            })
        }
    }

    const removeTheme = (e) => {
        let direction = directions.value.find( (item, index, array) => item.name === e)
        if (direction) {
            directions.removeValueHandler(direction)
        }
    }

    const createIdea = (e) => {
        let directionValidation = validateEmptyList(directions.value)
        let nameValidation = validateEmpty(name.value)
        let isValid = true

        directions.setValidation(directionValidation)
        name.setValidation(nameValidation)

        if (directionValidation !== "") {
            isValid = false
        }

        if (nameValidation !== "") {
            isValid = false
        }


        if (description.value.length < 100) {
            description.setValidation("Введите хотя бы 100 символов")
            isValid = false
        } else {
            description.setValidation("")
        }


        if (isValid){
            axios.post(config.serverUrl + config.postNewIdea,
                {
                    short_name: name.value,
                    wanted_skills: [],
                    description: description.value,
                    themes: directions.value.map( (theme) => theme.id)
                }).then( (result) => {
                console.log(result.data)
                axios.post( config.serverUrl + config.postNewTeam,
                    {
                        name: name.value + " Команда",
                        description: "Привет! Мы реализовываем идею " + name.value,
                        idea: result.data.pk,
                        persons: [currentPerson.userInfo.user_id],
                        wanted_skills: []
                    })
                setCreated(true)
            }).catch( (error) => {
                console.log(error)
            })
        }

    }
    return (
        <div className={"sign-up-form"}>
            { (isCreated) ? <Navigate to={"/"} /> : "" }
            <div className={"form-header"}>
                Расскажите о вашей идее
            </div>
            <div className={"sign-up-form-main"}>
                <div className={"sign-up-form-row"}>
                    <TextField name={"description"} type={"text"} onChange={name.valueHandler} value={name.value}
                               validation={name.validation}
                               placeholder={"Название идеи"} title={"Название идеи"} width={"75%"}/>
                </div>
                <div className={"sign-up-form-row"}>
                    <TextField name={"description"} type={"text"} onChange={description.valueHandler} value={description.value}
                               validation={description.validation}
                               placeholder={"Напишите о идее тут"} title={"Описание"} width={"75%"}
                               description={"Опишите идею в свободной форме"} multipleLines={"100px"} />
                </div>
                <div className={"sign-up-form-row"}>
                    <SuggestedList name={"directions"} width={"70%"} placeholder={"Выберите"} suggestions={directionsOptions}
                                   title={"Какими бы словами вы описали эту идею?"}
                                   addValue={addTheme}
                                   removeValue={removeTheme} value={directions.value}
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