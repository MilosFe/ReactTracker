import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Meteocon = ({ className, name }) => {
    return (
        <img
            className={classnames(styles.meteocon, className)}
            src={`/public/${name}.svg`}
        />
    );
};

class Report extends Component {
    render() {
        const { cardSize, color, report: { location, weather } } = this.props;

        return (
            <div className={classnames(styles.reportContainer, color)}>
                <Meteocon name="2" className={styles.smallIcon} />
                <div className={styles.detailsContainer}>
                    <div className={styles.degreesContainer}>
                        <span className={styles.degrees}>{weather.tempC}</span>
                        <span className={styles.degreesMarker}>°C</span>
                    </div>
                    <span className={styles.cityName}>
                        {`${location.name}, ${location.country}`}
                    </span>
                </div>
            </div>
        );

    }
}

Report.propTypes = {
    cardSize: PropTypes.oneOf(['sm', 'lg']),
    color: PropTypes.string,
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
