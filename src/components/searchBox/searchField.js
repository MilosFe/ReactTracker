import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';

import theme from './autosuggestTheme.css';
import styles from './styles.css';
import { fetchSuggestions } from '../../api';

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => {
    return (
        <div>
            {suggestion}
        </div>
    );
};

class SearchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        };
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            value,
            onChange: this.onChange.bind(this)
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={this.renderInputComponent.bind(this)}
                inputProps={inputProps}
                theme={theme}
            />
        );
    }

    renderInputComponent(inputProps) {
        const { shadow } = this.props;

        return (
            <div className={classnames({
                [styles.inputContainer]: true,
                [styles.inputLongShadow]: shadow
            })}>
                <input {...inputProps} />
                <span className={styles.inputPrompt}>Location: </span>
            </div>
        );
    }

    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested({ value }) {
        fetchSuggestions(value)
            .then((suggestions) => {
                this.setState({ suggestions });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };
}

export default SearchField;
