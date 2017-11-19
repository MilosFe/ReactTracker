import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import theme from './autosuggestTheme.css';
import { fetchSuggestions } from '../../api';
import Suggestion from './suggestion';

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => {
    return (
        <Suggestion suggestion={suggestion} />
    );
};

class SearchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        }
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
                inputProps={inputProps}
                theme={theme}
            />
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

SearchField.propTypes = {
};

export default SearchField;
