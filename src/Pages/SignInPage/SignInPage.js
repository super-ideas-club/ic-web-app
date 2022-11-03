import React, {useState} from "react";

import './SignInPage.css'
import {TextField} from "../../Components/UI/TextField/TextField";
import {Link} from "react-router-dom";
import {FilledButton} from "../../Components/UI/FilledButton/FilledButton";
import {validateEmail} from "../../Utils/Validations";

const SignInPage = () => {

    const [emailValidation, setEmailValidation] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailHandler = (e) => {
        setEmail(e.target.value)

    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const signIn = (e) => {
        setEmailValidation(validateEmail(email))
    }

    let emailInput = <TextField name={"email"} type={"email"} onChange={emailHandler}
                                defaultValue={""} validation={emailValidation} value={email}
                                placeholder={"Введите свой e-mail"} title={"E-mail"} width={"80%"} />

    let passwordInput = <TextField name={"password"} type={"password"} value={password}
                                   placeholder={"Введите пароль"} title={"Пароль"}
                                   width={"80%"} onChange={passwordHandler}/>



  return (
      <div className={"sign-in-form"}>
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