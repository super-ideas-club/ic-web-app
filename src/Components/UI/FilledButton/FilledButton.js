import './FilledButton.css'

const FilledButton = (props) => {

    return (
        <button className={"filled-button"} name={props.name} id={props.id} onClick={props.onClick}>
            {props.text}</button>
    )
}

export { FilledButton }