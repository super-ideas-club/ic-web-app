
const validateEmail = (email) => {
    const isValid = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (isValid) {
        return ""
    }else{
        return "Неправильный e-mail"
    }
}

const validatePassword = (password) => {
    const reg = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/

    if (reg.test(password)) {
        return ""
    }else{
        return "Некоректный пароль"
    }
}

const validateEmpty = (string) => {
    if (string) {
        if (string.length >= 0) {
            return ""
        }else{
            return "Заполните"
        }
    } else {
        return "Заполните";
    }
}

const valueSelection = (string, options) => {
    let value = options.find( (item, index, array) => { return item.name === string})
    if (value) {
        return value.value
    }
}

const validateEmptyList = (list) => {
    if (list){
        if (list.length === 0){
            return "Что-то тут нужно"
        }else {
            return ""
        }
    } else {
        return "Что-то тут нужно"
    }
}

export { validateEmail,
    validatePassword,
    validateEmpty,
    valueSelection,
    validateEmptyList}