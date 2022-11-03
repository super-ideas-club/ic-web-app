import './ListContainer.css'

const ListContainer = (props) => {
    return (
        <div className={"list-container"} style={props.style}>
            { props.items.map((item) => {
                return (
                    <div className={"list-container-element"}>
                        { item }
                    </div>
                )
            }) }
        </div>
    )
}

export { ListContainer }