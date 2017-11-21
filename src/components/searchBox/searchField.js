import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';

import theme from './autosuggestTheme.css';
import styles from './styles.css';
import { fetchSuggestions } from '../../api';

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => {
    return (
        <div>{suggestion}</div>
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
        const { isDesktop } = this.props;

        const inputProps = {
            value,
            onChange: this.onChange.bind(this)
        };

        const modifiedTheme = Object.assign({}, theme, {
            suggestionsContainerOpen: classnames({
                [theme.suggestionsContainerOpen]: true,
                [theme.suggestionsContainerOpenLarge]: !isDesktop,
                [theme.suggestionsContainerOpenSmall]: isDesktop
            })
        });

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={this.renderInputComponent.bind(this)}
                inputProps={inputProps}
                theme={modifiedTheme}
            />
        );
    }

    renderInputComponent(inputProps) {
        const { isDesktop } = this.props;

        const plusIconSize = isDesktop ? 16 : 24;

        return (
            <div className={classnames({
                [styles.inputLongShadow]: isDesktop,
                [styles.smallInputContainer]: isDesktop,
                [styles.largeInputContainer]: !isDesktop
            })}>
                <input {...inputProps} />
                <span className={classnames({
                    [styles.smallInputPrompt]: isDesktop,
                    [styles.largeInputPrompt]: !isDesktop
                })}>Location: </span>
                <button onClick={this.handleAddReportClick.bind(this)}>
                    <img className={classnames({
                        [styles.smallInputIcon]: isDesktop,
                        [styles.largeInputIcon]: !isDesktop
                    })} src={`/public/plus-${plusIconSize}.png`} />
                </button>
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

    handleAddReportClick() {
        const { fetchWeatherReport } = this.props;
        const { value } = this.state;

        fetchWeatherReport(value);
    }
}

SearchField.propTypes = {
    isDesktop: PropTypes.bool,
    fetchWeatherReport: PropTypes.func
};

export default SearchField;
