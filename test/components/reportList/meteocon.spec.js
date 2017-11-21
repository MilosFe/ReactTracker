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

    it('computes an appropriate icon if condition is not found', () => {
        const weather = {
            condition: 'Apocalypse',
            tempC: 100
        };

        const wrapper = shallow(
            <Meteocon weather={weather} />
        );

        expectSvgName(wrapper, 'src', 'apocalypse');
        expectSvgName(wrapper, 'fallbackImage', 'sunny');
    });
});
