import {createContext, useState} from "react";
import axios from "axios";
import {config, headers} from "../config";

const Person = () => {
    let userInfo = {
        avatar_link: "/default",
        email: "",
        password: "",
        gender: "",
        name: "",
        surname: "",
        patronymic: "",
        country: "",
        city: "",
        birth_date: new Date(),
        career: "",
        itn: ""
    }

    let isActive = false

    return {userInfo, isActive}
}


export { Person }