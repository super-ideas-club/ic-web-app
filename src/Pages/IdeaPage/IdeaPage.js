import './IdeaPage.css'
import {IdeaStatus} from "../../Models/IdeaStatus";
import {useState} from "react";
import axios from "axios";
import {config, headers} from "../../config";
import {useParams} from "react-router-dom";

const IdeaPage = (props) => {
    const [ideaName, setIdeaName] = useState("")
    const [ideaCondition, setIdeaCondition] = useState(IdeaStatus.created)
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const [team, setTeam] = useState({})
    const [teamMembers, setTeamMembers] = useState([])

    const [getData, setGetData] = useState(false)

    const { id } = useParams()

    // const team = {
    //     imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
    //     name: "Название команды",
    //     description: "Йоу сука бля бля бля сука бля пиво пьем пиво пьем косяки бля продаем кто продает мы продаем покупаем продаем",
    //     members: [
    //         {
    //             imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
    //             name: "Вова пупок"
    //         },
    //         {
    //             imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
    //             name: "Артем Дерижопов"
    //         }
    //     ]
    // }

    if (!getData) {
        axios.get(config.getIdea + id,
            {
                headers: headers,
                baseURL: config.serverUrl
            }).then( (result) => {
                setIdeaName(result.data.short_name)

                let ideaState = IdeaStatus.created
                if (result.data.state === 1) ideaState = IdeaStatus.teamSearching
                if (result.data.state === 2) ideaState = IdeaStatus.inProcess
                if (result.data.state === 3) ideaState = IdeaStatus.ready

                setIdeaCondition(ideaState)
                setDescription(result.data.description)
                setTags(result.data.themes.map((theme) => theme.name))
        }).catch( (error) => {
            console.log(error)
        })
        setGetData(true)
    }
    return (
        <div className={"idea-page"}>
            <div className={"idea-page-header"}>
                <div className={"idea-page-title"}>
                    {ideaName}
                </div>
                <div className={"idea-page-condition"} style={{backgroundColor: ideaCondition.color}}>
                    {ideaCondition.title}
                </div>
            </div>
            <div className={"idea-page-tags"}>
                {tags.map((tag) => {
                    return <div className={"idea-page-tag"}>
                        {"#" + tag}
                    </div>
                })}
            </div>
            <div className={"idea-page-description"}>
                { description }
            </div>

            {/*<div className={"idea-page-team"}>*/}
            {/*    <div className={"idea-page-team-header"}>*/}
            {/*        <div className={"idea-page-team-image"}>*/}
            {/*            <img src={team.imageUrl} />*/}
            {/*            <div className={"idea-page-team-name"}>*/}
            {/*                {team.name}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={"idea-page-team-description"}>*/}
            {/*            {team.description}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={"idea-page-team-title"}>*/}
            {/*        Состав команды*/}
            {/*    </div>*/}
            {/*    <div className={"idea-page-team-members"}>*/}
            {/*        {teamMembers.map( (member) => {*/}
            {/*            return <div className={"idea-page-team-member"}>*/}
            {/*                <img src={member.imageUrl}/>*/}
            {/*                <div className={"idea-page-team-member-name"}>*/}
            {/*                    {member.name}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        })}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export { IdeaPage }