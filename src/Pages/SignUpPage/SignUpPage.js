import './SignUpPage.css'
import {TextField} from "../../Components/UI/TextField/TextField";
import React, {useContext, useState} from "react";
import {DropDownInputField} from "../../Components/UI/DropDownInputField/DropDownInputField";
import {DateInput} from "../../Components/UI/DateInput/DateInput";
import {FilledButton} from "../../Components/UI/FilledButton/FilledButton";
import {Link, Navigate, useNavigation} from "react-router-dom";
import {
    validateEmail,
    validateEmpty,
    validateEmptyList,
    validatePassword,
    valueSelection
} from "../../Utils/Validations";
import {BlankButton} from "../../Components/UI/BlankButton/BlankButton";
import {useInput, useSuggestedListInput} from "../../Utils/UseInput";
import {SuggestedList} from "../../Components/UI/SuggestedList/SuggestedList";
import axios from "axios";
import {config, headers} from "../../config";
import {Context} from "../../Utils/Context";
import useCookies from "@js-smart/react-cookie-service";


const citizenshipSuggestions = [
    {
        name: 'Россиянин',
        value: "ru"
    },
    {
        name: 'Таджикистанец',
        value: "tg"
    },
];

const skillsSuggestions = [
    {
        name: "Java"
    },
    {
        name: "Python"
    }
]

const genderOptions = [
    {
        name: 'Предпочитаю  не сообщать',
        value: 'Prefer not to say'
    },
    {
        name: 'Мужчина',
        value: 'Male'
    },
    {
        name: 'Женщина',
        value: 'Female'
    },
]

const themeOptions = [
    {
        name: "Frontend"
    },
    {
        name: "Backend"
    }
]

const directionsOptions = [
    {
        name: "Архитектура"
    },
    {
        name: "Медицина"
    }
]

const careerOptions = [
    {
        name: "Студент",
        value: "student"
    },
    {
        name: "Ученый",
        value: "scientist"
    }
]

const numberValidation = (text) => {
    const reg = /^\d+$/;
  return reg.test(text)
}

const nameByValue = (string, options) => {
    let name = options.find( (item, index, array) => { return item.value === string})
    if (name) {
        return name.name
    }
}

const birthDateToAge = (date) => {
    let n = new Date()
    let b = new Date(date)
    let age = n.getFullYear() - b.getFullYear();
    return n.setFullYear(1970) < b.setFullYear(1970) ? age - 1 : age;
}

const dateToString = (date) => {
    return date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" + date.getDay().toString()
}

const MainSignUpForm = (props) => {
    let email = useInput(props.formData.email)
    let password = useInput(props.formData.password)
    let surname = useInput(props.formData.surname)
    let name = useInput(props.formData.name)
    let patronymic = useInput(props.formData.patronymic)
    let country = useInput(props.formData.country)
    let city = useInput(props.formData.city)

    let citizenshipName = nameByValue(props.formData.citizenship, citizenshipSuggestions)
    if (!citizenshipName)
    {
        citizenshipName = ""
    }
    let citizenship = useInput(citizenshipName)

    let genderName = nameByValue(props.formData.gender, genderOptions)
    if (!genderName)
    {
        genderName = ""
    }
    let gender = useInput(genderName)

    let career = useInput(props.formData.career)
    let birthDate = useInput(props.formData.birthDate)
    let INN = useInput(props.formData.INN)


    const onNextButtonClick = (e) => {
        let emailValidation = validateEmail(email.value)
        let passwordValidation = validatePassword(password.value)
        let nameValidation = validateEmpty(name.value)

        let surnameValidation = validateEmpty(surname.value)
        let citizenshipValue = valueSelection(citizenship.value, citizenshipSuggestions)
        let genderValue = valueSelection(gender.value, genderOptions)
        let careerValidation = validateEmpty(career.value)

        let isValid = true

        email.setValidation(emailValidation)
        password.setValidation(passwordValidation)
        name.setValidation(nameValidation)
        surname.setValidation(surnameValidation)
        career.setValidation(careerValidation)


        if (citizenshipValue) {
            citizenship.setValidation("")
        }else {
            citizenship.setValidation("Выберите из списка")
            isValid = false
        }

        if (genderValue) {
            gender.setValidation("")
        }else {
            gender.setValidation("Выберите из списка")
            isValid = false
        }

        if (emailValidation !== ""
            || passwordValidation !== ""
            || nameValidation !== ""
            || surnameValidation !== ""
            || careerValidation !== ""){
            isValid = false
        }

        if (birthDateToAge(birthDate.value) >= 18) {
            birthDate.setValidation("")
        } else {
            birthDate.setValidation("Вы слишком малы(")
            isValid = false
        }

        if (isValid) {
            props.setFormData({
                email: email.value,
                password: password.value,
                surname: surname.value,
                name: name.value,
                patronymic: patronymic.value,
                country: country.value,
                city: city.value,
                citizenship: citizenshipValue,
                gender: genderValue,
                career: career.value,
                birthDate: birthDate.value,
                INN: INN.value
            })

            props.onNext()
        }
    }

  return (
      <div className={"sign-up-form"}>
          <div className={"form-header"}>
              Регистрация
          </div>
          <div className={"sign-up-form-main"}>
              <div className={"sign-up-form-row"}>
                  <TextField name={"email"} type={"email"} onChange={email.valueHandler}
                             validation={email.validation} value={email.value}
                             placeholder={"Введите свой e-mail"} title={"E-mail"} width={"45%"} />
                  <TextField name={"password"} type={"password"} onChange={password.valueHandler}
                             validation={password.validation} value={password.value}
                             description={"Ваш пароль должен быть от 8 символов, содержать заглавные и прописные буквы, " +
                                 "цифры и специальные знаки"}
                             placeholder={"Введите пароль"} title={"Пароль"} width={"45%"} />
              </div>
              <div className={"sign-up-form-row"}>
                  <TextField name={"surname"} type={"text"} onChange={surname.valueHandler} value={surname.value}
                             placeholder={"Фамилия"} title={"Фамилия"} width={"30%"} validation={surname.validation}/>
                  <TextField name={"name"} type={"text"} onChange={name.valueHandler} value={name.value}
                             placeholder={"Имя"} title={"Имя"} width={"30%"} validation={name.validation}/>
                  <TextField name={"patronymic"} type={"text"} onChange={patronymic.valueHandler} value={patronymic.value}
                             placeholder={"Отчество"} title={"Отчество"} width={"30%"}
                             description={"Если имеется"}/>
              </div>
              <div className={"sign-up-form-row"}>
                  <TextField name={"country"} type={"text"} onChange={country.valueHandler} value={country.value}
                             placeholder={"Страна"} title={"Страна"} width={"45%"} />
                  <TextField name={"city"} type={"text"} onChange={city.valueHandler} value={city.value}
                             placeholder={"Город"} title={"Город"} width={"45%"} />
              </div>
              <div className={"sign-up-form-row"}>
                  <DropDownInputField name={"citizenship"} type={"text"} width={"45%"} title={"Гражданство"}
                                      placeholder={"Выберите"} suggestions={citizenshipSuggestions}
                                      onChange={citizenship.valueHandler} value={citizenship.value}
                                      setValue={citizenship.setValue} maxHeight={"200px"}
                                      validation={citizenship.validation}/>
                  <DropDownInputField name={"gender"} type={"text"} width={"45%"} title={"Пол"}
                                      placeholder={"Выберите"} suggestions={genderOptions}
                                      onChange={gender.valueHandler} value={gender.value}
                                      setValue={gender.setValue} validation={gender.validation}/>
              </div>
              <div className={"sign-up-form-row"}>
                  <DropDownInputField name={"career"} type={"text"} width={"45%"} title={"Род деятельности"}
                                      placeholder={"Выберите"} suggestions={careerOptions}
                                      onChange={career.valueHandler} value={career.value}
                                      setValue={career.setValue} maxHeight={"200px"} validation={career.validation}/>

                  <DateInput title={"Дата рождения"} width={"45%"} validation={birthDate.validation}
                      value={birthDate.value} setValue={birthDate.setValue}/>
              </div>

              <div className={"sign-up-form-row"}>
                  <TextField name={"INN"} type={"text"} onChange={INN.valueHandler} value={INN.value}
                             placeholder={"ИНН"} title={"ИНН"} width={"45%"} />
              </div>
              <div className={"sign-up-form-low"}>
                  <Link to={"/sign-in"}>
                      У меня уже есть аккаунт
                  </Link>
                  <FilledButton text={"Далее"} name={"next"} id={"next-button"} onClick={onNextButtonClick}/>
              </div>
          </div>
      </div>
  )
}

const FamiliaritySignUpForm = (props) => {

    let skills = useSuggestedListInput(props.formData.skills)
    let favoriteThemes = useSuggestedListInput(props.formData.favoriteThemes)

    let [skillsOptionsState, setSkillsOptionsState] = useState(skillsSuggestions)
    let [themesOptionsState, setThemesOptionsState] = useState(themeOptions)

    let [isGetDate, setGetDate] = useState(false)

    const onNextButtonClick = (e) => {
        let skillsValidation = validateEmptyList(skills.value);
        let themesValidation = validateEmptyList(favoriteThemes.value);
        let isValid = true

        skills.setValidation(skillsValidation);
        favoriteThemes.setValidation(themesValidation);

        if (skillsValidation !== "" || themesValidation !== "") {
            isValid = false
        }

        if (isValid) {
            props.setFormData({
                skills: skills.value,
                favoriteThemes: favoriteThemes.value
            })
            props.onNext()
        }

    }

    if (!isGetDate) {
        setGetDate(true)
        axios.get(config.getAllSkills, {
            headers: headers,
            baseURL: config.serverUrl
        }).then( (result) => {
            setSkillsOptionsState(result.data.map((skill) => {
                return { name: skill.name, id: skill.id}
            }
            ))
        }).catch( (error) => {
            console.log(error)
        })

        axios.get(config.getAllThemes, {
            headers: headers,
            baseURL: config.serverUrl
        }).then( (result) => {
            setThemesOptionsState(result.data.map((theme) => {
                    return { name: theme.name, pk: theme.pk}
                }
            ))
        }).catch( (error) => {
            console.log(error)
        })
    }

    const onAddSkill = (e) => {
        let p = skillsOptionsState.find((item, index, array) => item.name == e)
        if (p) {
            skills.addValueHandler({
                name: p.name,
                id: p.id
            })
        } else {
            axios.post(config.postNewSkill,
                {
                    name: e
                },
                {
                    headers: headers,
                    baseURL: config.serverUrl
                }).then((result) => {
                skills.addValueHandler({
                    name: result.data.name,
                    id: result.data.id
                })
            })
        }
    }
    const onPrevButtonClick = (e) => {
        props.onPrev()
    }

    return (
        <div className={"sign-up-form"}>
            <div className={"form-header"}>
                Давайте познакомимся поближе
            </div>
            <div className={"sign-up-form-main"}>
                <div className={"sign-up-form-row"}>
                    <SuggestedList name={"skills"} width={"70%"} title={"Навыки"}
                                   placeholder={"Выберите или напишите"} suggestions={skillsOptionsState}
                                   addValue={onAddSkill} removeValue={skills.removeValueHandler}
                                   value={skills.value} setValue={skills.setValue} validation={skills.validation}/>
                </div>
                <div className={"sign-up-form-row"}>
                    <SuggestedList name={"themes"} width={"70%"} title={"Темы, которые вам интересны"}
                                   placeholder={"Выберите"} suggestions={themesOptionsState}
                                   addValue={favoriteThemes.addValueHandler}
                                   removeValue={favoriteThemes.removeValueHandler}
                                   value={favoriteThemes.value} setValue={favoriteThemes.setValue}
                                   validation={favoriteThemes.validation}/>
                </div>
                <div className={"sign-up-form-low"}>
                    <BlankButton text={"Заполнить позже"} name={"later"} id={"later-button"} onClick={onPrevButtonClick}/>
                    <FilledButton text={"Далее"} name={"next"} id={"next-button"} onClick={onNextButtonClick}/>
                </div>
            </div>
        </div>
    )
}

const CreateIdeaSignUpForm = (props) => {

    const description = useInput(props.formData.description)
    const directions = useSuggestedListInput(props.formData.directions)

    const onPrevButtonClick = (e) => {
        props.onPrev()
    }

    const skip = (e) => {
        props.onSkip()
    }

    const signUp = (e) => {
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
            props.setFormData({
                description: description.value,
                directions: directions.value
            })

            props.onSignUp()
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

                <div className={"sign-up-form-low"}>
                    <div style={{display: "flex", flexDirection: "row",
                        justifyContent: "space-between", width: "300px"} }>
                        <BlankButton text={"Назад"} name={"prev"} id={"prev-button"} onClick={onPrevButtonClick}/>
                        <BlankButton text={"Заполнить позже"} name={"later"} id={"later-button"} onClick={skip}/>
                    </div>

                    <FilledButton text={"Готово!"} name={"sign-up"} id={"sign-up-button"} onClick={signUp}/>
                </div>
            </div>
        </div>
    )
}

// const SuccessfulSignUp = (props) => {
//
//     return (<>
//             {props.active ? <div className={"modal"}>
//                 <div
//             </div> : ""}
//         </>
//     )
// }

const SignUpPage = () => {

    const [formNumber, setFormNumber] = useState(0)

    const [mainForm, setMainForm] = useState({
        email: "",
        password: "",
        surname: "",
        name: "",
        patronymic: "",
        country: "",
        city: "",
        citizenship: "",
        gender: "",
        career: "",
        birthDate: new Date(),
        INN: ""
    })

    const [familiarityForm, setFamiliarityForm] = useState({
        skills: [],
        favoriteThemes: []
    })

    const [ideaForm, setIdeaForm] = useState({
        description: "",
        directions: []
    })

    const [signedUp, setSignedUp] = useState(false)

    const { setLoggedIn } = useContext(Context)

    const { getAllCookies } = useCookies()

    const onNext = () => {
        setFormNumber(formNumber + 1)
        if (formNumber > 0) {
            setSignedUp(true)
        }
    }

    const onPrev = () => {
        setFormNumber(formNumber - 1)
    }

    const onSignUp = () => {

        axios.post(config.signUpPath,
            {
                avatar_link: "https://svaltendorf.de/wp-content/uploads/2018/12/AdobeStock_171253635_Preview.jpg",
                email: mainForm.email,
                password: mainForm.password,
                gender: mainForm.gender,
                name: mainForm.name,
                surname: mainForm.surname,
                patronymic: mainForm.patronymic,
                country: mainForm.country,
                city: mainForm.city,
                birth_date: dateToString(mainForm.birthDate),
                career: mainForm.career,
                itn: mainForm.INN
            },
            { headers : headers, baseURL: config.serverUrl})
            .then( (result) => {
                // browserHistory.push("/sign-in")
                onNext()
                setLoggedIn(true)
                console.log(getAllCookies())
                console.log(result)
            })
            .catch( (error) => {
                console.log(error)
            })
    }

    const createIdea = () => {

    }


    const forms = [
        <MainSignUpForm formData={mainForm} setFormData={setMainForm} onNext={onSignUp}/>,
        <FamiliaritySignUpForm formData={familiarityForm} setFormData={setFamiliarityForm} onPrev={onNext} onNext={onNext}/>,
        // <CreateIdeaSignUpForm formData={ideaForm} setFormData={setIdeaForm}
        //     onPrev={onPrev} onSignUp={createIdea} onSkip={onNext}/>
    ]

    return (
        <>
            {signedUp ? <Navigate to={"/sign-in"} /> : forms[formNumber] }
        </>
    )
}

export { SignUpPage }