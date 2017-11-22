import '../../enzymeSetup';

import React from 'react';
import { shallow } from 'enzyme';
import ReactImageFallback from 'react-image-fallback';

import Meteocon from '../../../src/components/reportList/meteocon';

describe('Meteocon icons', () => {
    const expectSvgName = (wrapper, name) => {
        expect(wrapper.find('img').prop('src')).to.equal(`/public/${name}.svg`);
    };

    const expectMeteoconHasIcon = (weather, expectedIcon) => {
        const wrapper = shallow(
            <Meteocon weather={weather} />
        );

        expectSvgName(wrapper, expectedIcon);
    }

    it('sunny', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: 20,
            windKph: 4,
            precipitation: 0,
            cloudPc: 2
        }, 'sunny');
    });

    it('night', () => {
        expectMeteoconHasIcon({
            isDay: false,
            tempC: 20,
            windKph: 4,
            precipitation: 0,
            cloudPc: 2
        }, 'night');
    });

    it('windy', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: 20,
            windKph: 30,
            precipitation: 0,
            cloudPc: 2
        }, 'windy');

        expectMeteoconHasIcon({
            isDay: false,
            tempC: 20,
            windKph: 30,
            precipitation: 0,
            cloudPc: 2
        }, 'windy');
    });

    it('partlyCloudyDay', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: 20,
            windKph: 4,
            precipitation: 0,
            cloudPc: 20
        }, 'partlyCloudyDay');
    });

    it('partlyCloudyNight', () => {
        expectMeteoconHasIcon({
            isDay: false,
            tempC: 20,
            windKph: 4,
            precipitation: 0,
            cloudPc: 20
        }, 'partlyCloudyNight');
    });

    it('overcast', () => {
        expectMeteoconHasIcon({
            isDay: false,
            tempC: 20,
            windKph: 4,
            precipitation: 0,
            cloudPc: 50
        }, 'overcast');
    });

    it('heavyClouds', () => {
        expectMeteoconHasIcon({
            isDay: false,
            tempC: 20,
            windKph: 4,
            precipitation: 0,
            cloudPc: 90
        }, 'heavyClouds');
    });

    it('lightRain', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: 20,
            windKph: 4,
            precipitation: 0.8,
            cloudPc: 70
        }, 'lightRain');
    });

    it('heavyRain', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: 20,
            windKph: 4,
            precipitation: 5,
            cloudPc: 90
        }, 'heavyRain');
    });

    it('lightSnow', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: -5,
            windKph: 4,
            precipitation: 0.7,
            cloudPc: 70
        }, 'lightSnow');
    });

    it('heavySnow', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: -10,
            windKph: 4,
            precipitation: 4,
            cloudPc: 90
        }, 'heavySnow');
    });

    it('windAndClouds', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: -10,
            windKph: 10,
            precipitation: 0.1,
            cloudPc: 20
        }, 'windAndClouds');

        expectMeteoconHasIcon({
            isDay: true,
            tempC: -10,
            windKph: 10,
            precipitation: 0.1,
            cloudPc: 50
        }, 'windAndClouds');

        expectMeteoconHasIcon({
            isDay: true,
            tempC: -10,
            windKph: 10,
            precipitation: 0.1,
            cloudPc: 90
        }, 'windAndClouds');
    });

    it('windRainClouds', () => {
        expectMeteoconHasIcon({
            isDay: true,
            tempC: 10,
            windKph: 10,
            precipitation: 1,
            cloudPc: 50
        }, 'windRainClouds');

        expectMeteoconHasIcon({
            isDay: true,
            tempC: 10,
            windKph: 10,
            precipitation: 4,
            cloudPc: 90
        }, 'windRainClouds');
    });
});
