import './DateInput.css'
import DatePicker from 'react-datepicker'

const DateInput = (props) => {

    const onChange = (time) => {
        props.setValue(time)
    }

    const months = [
        "Янаварь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    const renderCustomHeader = ({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={"datepicker-button"}>
                    Назад
                </button>

                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={"datepicker-button"}>
                    Вперед
                </button>
            </div>
            <div className={"react-datepicker__current-month"}>
                {months[date.getMonth()] + " "}{date.getFullYear()}
            </div>
        </div>
    )

    return (
        <div className={"text-field"} style={{width: props.width}}>
            <div className={"upon-text-field"}>
                <div className={"text-field-title"}>
                    {props.title}
                </div>
                <div className={"text-field-validation"}>
                    { props.validation }
                </div>
            </div>
            <DatePicker selected={props.value}
                        onChange={onChange}
                        maxDate={new Date()}
                        renderCustomHeader={renderCustomHeader}
            />
            <div className={"text-field-description"}>
                {props.description}
            </div>
        </div>

    );
}

export { DateInput }