import {Navigate} from "react-router-dom";
import useCookies from "@js-smart/react-cookie-service";
import {useContext} from "react";
import {Context} from "../../Utils/Context";


const ExitPage = () => {

    const { deleteCookie } = useCookies()
    const { setLoggedIn } = useContext(Context)

    deleteCookie("csrftoken")
    setLoggedIn(false)

    return (
        <Navigate to={"/"} />
    )
}


export { ExitPage }