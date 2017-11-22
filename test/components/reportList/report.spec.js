import '../../enzymeSetup';

import React from 'react';
import { shallow } from 'enzyme';

import Report from '../../../src/components/reportList/report';
import styles from '../../../src/components/reportList/styles.css';

describe('Report', () => {
    const createReport = (tempC) => ({
        location: {
            name: 'Montreal',
            country: 'Canada'
        },
        weather: { tempC }
    });

    it('should round off the temperature on large cards', () => {
        const roundUpWrapper = shallow(
            <Report cardSize="lg" color="colorClass" report={createReport(10.7)} />
        );

        const roundDownWrapper = shallow(
            <Report cardSize="lg" color="colorClass" report={createReport(8.3)} />
        );

        const negativeRoundingWrapper = shallow(
            <Report cardSize="lg" color="colorClass" report={createReport(-7.4)} />
        );

        const unalteredWrapper = shallow(
            <Report cardSize="lg" color="colorClass" report={createReport(3)} />
        );

        expect(roundUpWrapper.text().includes('11')).to.eql(true);
        expect(roundUpWrapper.text().includes('10.7')).to.eql(false);

        expect(roundDownWrapper.text().includes('8')).to.eql(true);
        expect(roundDownWrapper.text().includes('8.3')).to.eql(false);

        expect(negativeRoundingWrapper.text().includes('-7')).to.eql(true);
        expect(negativeRoundingWrapper.text().includes('-7.4')).to.eql(false);

        expect(unalteredWrapper.text().includes('3')).to.eql(true);
    });

    it('should not round off the temperature on small cards', () => {
        const wrapper = shallow(
            <Report cardSize="sm" color="colorClass" report={createReport(-4.8)} />
        );

        expect(wrapper.text().includes('-4.8')).to.eql(true);
    });
});
