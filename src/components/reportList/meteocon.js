import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { find } from 'lodash';

import styles from './styles.css';

const day = ({ isDay }) => isDay;
const night = ({ isDay }) => !isDay;
const snowTemp = ({ tempC }) => tempC < 0;
const lightWind = ({ windKph }) => windKph >= 5 && windKph < 30;
const heavyWind = ({ windKph }) => windKph >= 30;
const lightRain = ({ precipitation }) => precipitation >= 0.2 && precipitation < 2;
const heavyRain = ({ precipitation }) => precipitation >= 2;
const lightClouds = ({ cloudPc }) => cloudPc >= 10 && cloudPc < 30;
const mediumClouds = ({ cloudPc }) => cloudPc >= 30 && cloudPc < 80;
const heavyClouds = ({ cloudPc }) => cloudPc >= 80;

// Computes in order of icon desirability
const iconCalculationSettings = [
    ['windy', [heavyWind]],
    ['lightSnow', [lightRain, snowTemp]],
    ['heavySnow', [heavyRain, snowTemp]],
    ['windRainClouds', [[lightRain, heavyRain], lightWind]],
    ['lightRain', [lightRain]],
    ['heavyRain', [heavyRain]],
    ['windAndClouds', [[lightClouds, mediumClouds, heavyClouds], lightWind]],
    ['heavyClouds', [heavyClouds]],
    ['overcast', [mediumClouds]],
    ['partlyCloudyDay', [day, lightClouds]],
    ['partlyCloudyNight', [night, lightClouds]],
    ['sunny', [day]],
    ['night', [night]]
];

const computeIconFromWeather = (weather) => {
    return find(iconCalculationSettings, ([iconName, conditions]) => {
        return conditions.every((cond) => {
            if (Array.isArray(cond)) {
                return cond.some((specificCond) => specificCond(weather));
            }

            return cond(weather);
        });
    })[0];
};

const Meteocon = ({ className, weather }) => {
    const iconName = computeIconFromWeather(weather);

    return (
        <img
            className={classnames(styles.meteocon, className)}
            src={`/public/${iconName}.svg`}
        />
    );
};

Meteocon.propTypes = {
    className: PropTypes.string,
    weather: PropTypes.shape({
        tempC: PropTypes.number.isRequired,
        isDay: PropTypes.bool.isRequired,
        windKph: PropTypes.number,
        cloudPc: PropTypes.number,
        precipitation: PropTypes.number
    })
};

export default Meteocon;
