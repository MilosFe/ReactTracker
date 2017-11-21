import '../../enzymeSetup';

import React from 'react';
import { shallow } from 'enzyme';
import ReactImageFallback from 'react-image-fallback';

import Meteocon from '../../../src/components/reportList/meteocon';

describe('Meteocon', () => {
    const expectSvgName = (wrapper, prop, name) => {
        expect(wrapper.find(ReactImageFallback).prop(prop)).to.equal(`/public/${name}.svg`);
    };

    it('renders the appropriate weather icon if available', () => {
        const wrapper = shallow(
            <Meteocon weather={{condition: 'sunny'}} />
        );

        expectSvgName(wrapper, 'src', 'sunny');
    });

    it('renders the appropriate weather icon regardless of case', () => {
        const wrapper = shallow(
            <Meteocon weather={{condition: 'Sunny'}} />
        );

        expectSvgName(wrapper, 'src', 'sunny');
    });

    describe('fallback icons', () => {
        it('should render the sunny image when it is day', () => {
            const weather = {
                condition: 'Sun should not be that big',
                isDay: true
            };

            const wrapper = shallow(
                <Meteocon weather={weather} />
            );

            expectSvgName(wrapper, 'src', 'sunShouldNotBeThatBig');
            expectSvgName(wrapper, 'fallbackImage', 'sunny');
        });

        it('should render the night image when it is night', () => {
            const weather = {
                condition: 'Sun seems to be missing',
                isDay: false
            };

            const wrapper = shallow(
                <Meteocon weather={weather} />
            );

            expectSvgName(wrapper, 'src', 'sunSeemsToBeMissing');
            expectSvgName(wrapper, 'fallbackImage', 'night');
        });
    });
});
