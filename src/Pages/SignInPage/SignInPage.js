import React, {useContext, useState} from "react";

import './SignInPage.css'
import {TextField} from "../../Components/UI/TextField/TextField";
import {Link, Navigate} from "react-router-dom";
import {FilledButton} from "../../Components/UI/FilledButton/FilledButton";
import {validateEmail} from "../../Utils/Validations";
import {config, headers} from "../../config";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Context} from "../../Utils/Context";

const SignInPage = () => {

    const [emailValidation, setEmailValidation] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")

    const [signedIn, setSignedIn] = useState(false)
    const [userId, setUserId] = useState(0)

    const { setLoggedIn } = useContext(Context)

    const emailHandler = (e) => {
        setEmail(e.target.value)

    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const signIn = (e) => {
        setEmailValidation(validateEmail(email))

        axios.post(
            config.serverUrl + config.signInPath,
            {
                email: email,
                password: password
            }, {
                headers : headers
            }
        ).then((response) => {
            setSignedIn(true)
            setLoggedIn(true)
            setUserId(response.data.user_id)
            console.log(response.data)
        }).catch( (error) => {
            setPasswordValidation("Неверные данные")
            console.log(error)
        })
    }

    let emailInput = <TextField name={"email"} type={"email"} onChange={emailHandler}
                                defaultValue={""} validation={emailValidation} value={email}
                                placeholder={"Введите свой e-mail"} title={"E-mail"} width={"80%"} />

    let passwordInput = <TextField name={"password"} type={"password"} value={password}
                                   placeholder={"Введите пароль"} title={"Пароль"} validation={passwordValidation}
                                   width={"80%"} onChange={passwordHandler}/>



  return (
      <div className={"sign-in-form"}>
          {signedIn ? <Navigate to={"/profile/" + userId} /> : ""}
          <div className={"form-header"}>
              Войти
          </div>
          {emailInput}
          {passwordInput}
          <div className={"sign-in-form-low"}>
              <Link to={"/sign-up"}>
                  У меня еще нет аккаунта
              </Link>
              <FilledButton text={"Войти"} name={"sign-in"} id={"sign-in-button"} onClick={signIn}/>
          </div>
      </div>
  )
}

export { SignInPage }