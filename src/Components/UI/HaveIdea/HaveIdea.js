import {Link} from "react-router-dom";

import './HaveIdea.css'

const HaveIdea = () => {
    return (
        <Link to={"/have-idea"} className={"have-idea"}>
            У меня есть идея!
        </Link>
    )

}

export { HaveIdea }