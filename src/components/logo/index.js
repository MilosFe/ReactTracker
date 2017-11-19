import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logo extends Component {
    render() {
        const { className } = this.props;

        return (
            <div className={className}>
                <img src="public/doctrin_logo.png" />
            </div>
        );
    }
}

export default Logo;
