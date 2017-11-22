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
                    <img
                        className={styles.removeIcon}
                        src="/public/removeIcon16.png"
                        onClick={this.handleRemoveClick.bind(this)}
                    />
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
                <img
                    className={styles.removeIcon}
                    src="/public/removeIcon20.png"
                    onClick={this.handleRemoveClick.bind(this)}
                />
            </div>
        );
    }

    handleRemoveClick() {
        const { report, onRemove } = this.props;

        onRemove(report);
    }
}

Report.propTypes = {
    cardSize: PropTypes.oneOf(['sm', 'lg']),
    color: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    report: PropTypes.shape({
        location: PropTypes.shape({
            name: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired
        }),
        weather: PropTypes.shape({
            tempC: PropTypes.number.isRequired,
            isDay: PropTypes.bool,
            windKph: PropTypes.number,
            cloudPc: PropTypes.number,
            precipitation: PropTypes.number
        })
    })
}

export default Report;
