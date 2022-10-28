import { Outlet } from "react-router";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

const Layout = (props) => {

    let footer = <Footer email={"lol@mail.ru"} phone={"+793672646281"} telegram={"ronalchue"} vk={"ronald"}/>
    if (props.headerOnly) {
        footer = ""
    }
    return (
        <>
            <Header />
            <div className={"main-content"}>
                <Outlet />
            </div>
            {footer}
        </>
    )
}

export { Layout };