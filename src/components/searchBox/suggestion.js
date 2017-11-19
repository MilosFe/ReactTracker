import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Suggestion = ({ suggestion }) => {
    return (
        <div>
            {suggestion}
        </div>
    );
};

Suggestion.propTypes = {
    suggestion: PropTypes.string.isRequired
};

export default Suggestion;
