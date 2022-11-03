import './ProfilePage.css'
import {ListContainer} from "../../Components/UI/ListContainer/ListContainer";
import {Link} from "react-router-dom";

const ProfileOpenableButton = (props) => {
    return (
        <div onClick={props.onClick} className={"openable-button"} style={props.style}>
            <img src={props.iconUrl}/>
            <div className={"openable-button-text"}>
                {props.title}
            </div>
        </div>
    )
}

const ProfilePage = (props) => {
    const profileImageLink = "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj"
    const profileName = "Фамилия Имя Отчество"
    const profileCareer = "Студент"
    const profileAbout = "Имею опыт работы более 10 лет в производственных компаниях в крупных многопрофильных" +
        " холдингах. Обладаю экспертными знаниями в области бухгалтерского, налогового учета, финансового анализа и" +
        " бюджетирования. Владею методами оценки активов, доходности, рисков. Имею успешный опыт привлечения внешнего" +
        " финансирования, прохождения налоговых и аудиторских проверок. Опыт руководства коллективом от 300 человек."

    const skills = [
        "Большой",
        "Целеустремленный",
        "Spring",
        "MongoDB",
        "Python",
        "Java"
    ]

    const teamsInfo = [
        {
            imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
            name: "Команда А",
            teamUrl: "/teams/po"
        },
        {
            imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
            name: "Крутые бобры",
            teamUrl: "/teams/po"
        },
        {
            imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
            name: "Команда А",
            teamUrl: "/teams/po"
        }
    ]


    return(
        <div className={"profile-page"}>
            <div className={"left-side"}>
                <img src={profileImageLink} className={"profile-image"}/>
                <div className={"profile-name"}>
                    {profileName}
                </div>
                <div className={"profile-career"}>
                    {profileCareer}
                </div>
                <div className={"profile-interaction"}>
                    <ProfileOpenableButton title={"Написать"} iconUrl={require('./images/email-icon.png')} />
                    <ProfileOpenableButton title={"Пригласить в команду"} iconUrl={require('./images/team-icon.png')} />
                </div>
                <ListContainer items={skills} style={{marginTop: "30px", fontsize: 10}}/>
                <ProfileOpenableButton title={"Редактировать профиль"}  iconUrl={require('./images/edit-icon.png')}
                                       style={{backgroundColor: "#13334C"}}/>
            </div>
            <div className={"right-side"}>
                <div className={"profile-about"}>
                    <div className={"profile-title"}>
                        Обо мне
                    </div>
                    <div className={"profile-about-text"}>
                        {profileAbout}
                    </div>
                </div>
                <div className={"profile-teams"}>
                    <div className={"profile-title"}>
                        Мои команды
                    </div>
                    <div className={"profile-teams-list"}>
                        { teamsInfo.map((team) => {
                            return (
                                <Link to={team.teamUrl} className={"profile-team"}>
                                    <img src={team.imageUrl} />
                                    <div className={"profile-team-name"}>
                                        {team.name}
                                    </div>
                                </Link>
                                    ) } )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProfilePage }