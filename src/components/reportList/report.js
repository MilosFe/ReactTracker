import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class Report extends Component {
    render() {
        const { report } = this.props;

        return (
            <div className={styles.reportContainer}>

            </div>
        );

    }
}

Report.propTypes = {
    report: PropTypes.shape({
        location: PropTypes.shape({
            name: PropTypes.string,
            country: PropTypes.string
        }),
        weather: PropTypes.shape({
            tempC: PropTypes.number,
            tempF: PropTypes.number,
            isDay: PropTypes.bool,
            condition: PropTypes.string,
            windKph: PropTypes.number,
            cloud: PropTypes.bool
        })
    })
}

export default Report;
