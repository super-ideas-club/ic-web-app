import { Outlet } from "react-router";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import {useContext} from "react";
import {Context} from "../../Utils/Context";

const Layout = (props) => {

    let footer = <Footer email={"lol@mail.ru"} phone={"+793672646281"} telegram={"ronalchue"} vk={"ronald"}/>
    if (props.headerOnly) {
        footer = ""
    }

    const { currentPerson, getPerson, isLoggedIn } = useContext(Context)

    if (isLoggedIn && !currentPerson.isActive) {
        getPerson()
    }

    return (
        <>
            { (props.transparentHeader) ? <Header transparent /> : <Header /> }
            <div className={"main-content"}>
                <Outlet />
            </div>
            {footer}
        </>
    )
}

export { Layout };