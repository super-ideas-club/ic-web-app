import '../TextField/TextField.css'
import './DropDownInputField.css'

import React from 'react';
import Autosuggest from 'react-autosuggest';
import { ScrollView} from "react-native";

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div className={"drop-down-element"}>
        {suggestion.name}
    </div>
);

class DropDownInputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: []
        };
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        let suggestionsList = this.props.suggestions.filter(suggestion =>
            suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
        );

        if (this.props.maxSuggestionsCount){

            if (suggestionsList.length > this.props.maxSuggestionsCount){
                suggestionsList = suggestionsList.slice(0, this.props.maxSuggestionsCount)
            }
        }
        return suggestionsList
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.props.setValue(suggestionValue)
    }

    shouldRenderSuggestions = (value, reason) => {
        return value.trim().length >= 0;
    }

    renderSuggestionsContainer = ({ containerProps, children, query }) => {
        return (
            <div {...containerProps} style={{width: this.props.width, maxHeight: this.props.maxHeight}} >
                {children}
            </div>
        );
    }


    render() {
        const { suggestions } = this.state;
        const value = this.props.value
        const onChange = this.props.onChange

        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange
        };

        const autosuggest = <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            alwaysRenderSuggestions={true}
            inputProps={inputProps}
        />

        if (this.props.autosuggestOnly){
            return autosuggest
        }

        return (
            <div className={"text-field"} style={{width: this.props.width}}>
                <div className={"upon-text-field"}>
                    <div className={"text-field-title"}>
                        { this.props.title }
                    </div>
                    <div className={"text-field-validation"}>
                        { this.props.validation }
                    </div>
                </div>
                {autosuggest}
            </div>
        );
    }
}


export { DropDownInputField }