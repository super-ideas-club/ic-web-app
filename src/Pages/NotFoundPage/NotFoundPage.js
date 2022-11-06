import './NotFoundPage.css'
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Link className={"not-found"} to={"/"}>
            Sorry! Page not found.
        </Link>
    )
}

export { NotFoundPage }