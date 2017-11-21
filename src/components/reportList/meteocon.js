import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import classnames from 'classnames';
import { camelCase } from 'lodash';

import styles from './styles.css';

const computeIconFromWeather = (weather) => {
    return 'sunny';
};

const Meteocon = ({ className, weather }) => {
    const fileNameFromCondition = camelCase(weather.condition);
    const fallbackImage = computeIconFromWeather(weather);

    return (
        <ReactImageFallback
            className={classnames(styles.meteocon, className)}
            src={`/public/${fileNameFromCondition}.svg`}
            fallbackImage={`/public/${fallbackImage}.svg`}
        />
    );
};

export default Meteocon;
