import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import classnames from 'classnames';
import { camelCase } from 'lodash';

import styles from './styles.css';

const Meteocon = ({ className, weather }) => {
    const fileNameFromCondition = camelCase(weather.condition);
    const fallbackImage = weather.isDay ? 'sunny' : 'night';

    return (
        <ReactImageFallback
            className={classnames(styles.meteocon, className)}
            src={`/public/${fileNameFromCondition}.svg`}
            fallbackImage={`/public/${fallbackImage}.svg`}
        />
    );
};

export default Meteocon;
