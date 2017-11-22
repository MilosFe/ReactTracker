import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';
import Meteocon from './meteocon';

class Report extends Component {
    render() {
        const { cardSize, color, report: { location, weather } } = this.props;

        // Desktop reports
        if (cardSize === 'sm') {
            return (
                <div className={classnames(styles.smallReportContainer, color)}>
                    <Meteocon weather={weather} className={styles.smallIcon} />
                    <div className={styles.detailsContainer}>
                        <div className={classnames(styles.degreesContainer, styles.degreesContainerSmall)}>
                            <span className={styles.degreesSmall}>{weather.tempC}</span>
                            <span className={styles.degreesMarkerSmall}>°C</span>
                        </div>
                        <span className={classnames(
                            styles.cityName,
                            styles.smallCityName,
                            styles.ellipsis
                        )}>
                            {`${location.name}, ${location.country}`}
                        </span>
                    </div>
                </div>
            );
        }

        // Mobile reports
        return (
            <div className={classnames(styles.largeReportContainer, color)}>
                <div className={styles.largeIconAndNameContainer}>
                    <Meteocon weather={weather} className={styles.largeIcon} />
                        <span className={classnames(
                            styles.cityName,
                            styles.largeCityName,
                            styles.ellipsis
                        )}>
                            {`${location.name}, ${location.country}`}
                        </span>
                </div>
                <div className={classnames(styles.degreesContainer, styles.degreesContainerLarge)}>
                    <span className={styles.degreesLarge}>{Math.round(weather.tempC)}</span>
                    <span className={styles.degreesMarkerLarge}>°C</span>
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
            windKph: PropTypes.number
        })
    })
}

export default Report;
