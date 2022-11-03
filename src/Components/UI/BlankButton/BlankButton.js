import './BlankButton.css'

const BlankButton = (props) => {

    return (
        <button className={"blank-button"} name={props.name} id={props.id} onClick={props.onClick}>
            {props.text}</button>
    )
}

export { BlankButton }