import './ProfilePage.css'
import {ListContainer} from "../../Components/UI/ListContainer/ListContainer";
import {Link, useParams} from "react-router-dom";
import {IdeaStatus} from "../../Models/IdeaStatus";
import {useContext, useState} from "react";
import {Context} from "../../Utils/Context";
import useCookies  from '@js-smart/react-cookie-service';
import axios from "axios";
import {config, headers} from "../../config";
import {Person} from "../../Models/Person";

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


    const profileAbout = "Имею опыт работы более 10 лет в производственных компаниях в крупных многопрофильных" +
        " холдингах. Обладаю экспертными знаниями в области бухгалтерского, налогового учета, финансового анализа и" +
        " бюджетирования. Владею методами оценки активов, доходности, рисков. Имею успешный опыт привлечения внешнего" +
        " финансирования, прохождения налоговых и аудиторских проверок. Опыт руководства коллективом от 300 человек."

    // const skills = [
    //     "Большой",
    //     "Целеустремленный",
    //     "Spring",
    //     "MongoDB",
    //     "Python",
    //     "Java"
    // ]

    const { id } = useParams()
    const [currentPerson, setCurrentPerson] = useState(Person())

    const [skills, setSkills] = useState([])
    const [teamsInfo, setTeamsInfo] = useState([])
    const [ideasInfo, setIdeasInfo] = useState([])

    const [getData, setGetData] = useState(false)


    // const teamsInfo = [
    //     {
    //         imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
    //         name: "Команда А",
    //         teamUrl: "/teams/po"
    //     },
    //     {
    //         imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
    //         name: "Крутые бобры",
    //         teamUrl: "/teams/po"
    //     },
    //     {
    //         imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
    //         name: "Команда А",
    //         teamUrl: "/teams/po"
    //     }
    // ]


    console.log("asas", skills)
    if (!getData) {

        axios.get(config.userInfo + id,
            {
                headers: headers,
                baseURL: config.serverUrl
            }).then( (result) => {
            setCurrentPerson({
                userInfo: result.data
            })
        }).catch( (error) => {
            console.log(error)
        })
        axios.get(config.getUserSkills + id,
            {
                headers: headers,
                baseURL: config.serverUrl
            }).then( (result) => {
            setSkills( result.data.map( (skill) => skill.name))
        }).catch( (error) => {
            console.log(error)
        })

        axios.get(config.getUserTeams + id,
            {
                headers : headers,
                baseURL: config.serverUrl
            }).then( (result) => {
            console.log(result.data)
            setTeamsInfo(result.data.map( (team) => {
                return { name: team.name, teamUrl: "/team/" + team.id}
            }))

            console.log("aaaa", teamsInfo)
        }).catch( (error) => {
            console.log(error)
        })

        axios.get(config.getUserIdeas + id,
            {
                headers: headers,
                baseURL: config.serverUrl
            }).then( (result) => {
            console.log(result.data)
            setIdeasInfo(result.data.map( (idea) => {
                let ideaCondition = IdeaStatus.created
                if (idea.state === 1) ideaCondition = IdeaStatus.teamSearching
                if (idea.state === 2) ideaCondition = IdeaStatus.inProcess
                if (idea.state === 3) ideaCondition = IdeaStatus.ready
                return { name: idea.short_name,
                    ideaUrl: "/idea/" + idea.pk,
                    description: idea.description,
                    condition: ideaCondition
                }
            }))
        }).catch( (error) => {
            console.log(error)
        })

        setGetData(true)

    }
    // const ideasInfo = [
    //     {
    //         name: "AXAXAXAXAX",
    //         description: "Описание чувак блин йоу дэмн дэмн",
    //         condition: IdeaStatus.inProcess,
    //         ideaUrl: "/asdasd"
    //     },
    //     {
    //         name: "AXAXAXAXAX",
    //         description: "Описание чувак блин йоу дэмн дэмн",
    //         condition: IdeaStatus.ready,
    //         ideaUrl: "/pos"
    //     }
    // ]

    const onEdit = (e) => {

    }

    return(
        <div className={"profile-page"}>
            <div className={"left-side"}>
                <img src={currentPerson.userInfo.avatar_link} className={"profile-image"}/>
                <div className={"profile-name"}>
                    {currentPerson.userInfo.name + " " + currentPerson.userInfo.surname}
                </div>
                <div className={"profile-career"}>
                    {currentPerson.userInfo.career}
                </div>
                <div className={"profile-interaction"}>
                    <ProfileOpenableButton title={"Написать"} iconUrl={require('./images/email-icon.png')} />
                    <ProfileOpenableButton title={"Пригласить в команду"} iconUrl={require('./images/team-icon.png')} />
                </div>
                <ListContainer items={skills} style={{marginTop: "30px", fontsize: 10}}/>
                <ProfileOpenableButton title={"Редактировать профиль"}  iconUrl={require('./images/edit-icon.png')}
                                       style={{backgroundColor: "#13334C"}} onClick={onEdit}/>
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
                        { (getData) ? teamsInfo.map((team) => {
                            return (
                                <Link to={team.teamUrl} className={"profile-team"}>
                                    <img src={require('./images/team-image.png')} />
                                    <div className={"profile-team-name"}>
                                        {team.name}
                                    </div>
                                </Link>
                                    ) } ) : ""
                        }
                    </div>
                    <div className={"profile-ideas"}>
                        <div className={"profile-title"}>
                            Мои идеи
                        </div>
                        <div className={"profile-ideas-list"}>
                            { ideasInfo.map((idea) =>{

                                return <Link to={idea.ideaUrl} className={"profile-idea"}>
                                    <div className={"profile-idea-header"}>
                                        <div className={"profile-idea-name"}>
                                            {idea.name}
                                        </div>
                                        <div className={"profile-idea-condition"} style={{
                                            backgroundColor: idea.condition.color
                                        }}>
                                            {idea.condition.title}
                                        </div>
                                    </div>
                                    <div className={"profile-idea-description"}>
                                        {idea.description}
                                    </div>
                                </Link>
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProfilePage }