import {useContext} from "react";
import {Context} from "../../Utils/Context";
import {Outlet} from "react-router";
import {Navigate} from "react-router-dom";

const LoggedInOnly = () => {

    const { isLoggedIn } = useContext(Context)

    return (isLoggedIn) ? <Outlet /> : <Navigate to={"/"} />
}

export { LoggedInOnly }