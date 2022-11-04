import {Link} from "react-router-dom";

import './HaveIdea.css'

const HaveIdea = () => {
    return (
        <Link to={"/create-idea"} className={"have-idea"}>
            У меня есть идея!
        </Link>
    )

}

export { HaveIdea }