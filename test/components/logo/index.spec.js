import '../../enzymeSetup';

import React from 'react';
import { shallow } from 'enzyme';

import Logo from '../../../src/components/logo';

describe('Logo', () => {
    it('renders a logo', () => {
        const wrapper = shallow(
            <Logo />
        );

        expect(wrapper.find('img').length).to.equal(1);
        expect(wrapper.find('img').prop('src')).to.equal('public/doctrin_logo.png');
    });
});
