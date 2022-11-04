import './IdeaPage.css'
import {IdeaStatus} from "../../Models/IdeaStatus";

const IdeaPage = (props) => {
    const ideaName = "Название"
    const ideaCondition = IdeaStatus.inProcess

    const tags = [
        "Урбанизация", "Сочуствие", "Помощь"
    ]

    const team = {
        imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
        name: "Название команды",
        description: "Йоу сука бля бля бля сука бля пиво пьем пиво пьем косяки бля продаем кто продает мы продаем покупаем продаем",
        members: [
            {
                imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
                name: "Вова пупок"
            },
            {
                imageUrl: "https://yt3.ggpht.com/ytc/AKedOLS_D2-3MpPoeNxq6AELEAJsSPGS2Mbf0koGLRcn=s900-c-k-c0x00ffffff-no-rj",
                name: "Артем Дерижопов"
            }
        ]

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
                Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание идеи Максимально длинное описание идеи максимально длинное описание иде
            </div>

            <div className={"idea-page-team"}>
                <div className={"idea-page-team-header"}>
                    <div className={"idea-page-team-image"}>
                        <img src={team.imageUrl} />
                        <div className={"idea-page-team-name"}>
                            {team.name}
                        </div>
                    </div>
                    <div className={"idea-page-team-description"}>
                        {team.description}
                    </div>
                </div>
                <div className={"idea-page-team-title"}>
                    Состав команды
                </div>
                <div className={"idea-page-team-members"}>
                    {team.members.map( (member) => {
                        return <div className={"idea-page-team-member"}>
                            <img src={member.imageUrl}/>
                            <div className={"idea-page-team-member-name"}>
                                {member.name}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export { IdeaPage }