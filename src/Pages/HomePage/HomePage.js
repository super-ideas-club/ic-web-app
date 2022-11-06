import './HomePage.css'

const HomePage = () => {
    return (
        <div className={"home-page"}>
            <img src={require("./images/moskow.jpg")} className={"home-page-bg"}/>
            <div className={"home-page-title"}>
                Ideas<br />Club
            </div>
            <div className={"home-page-description"}>
                Никогда не поздно<br />найти себе единомышленников
            </div>
        </div>
    )
}

export {HomePage}