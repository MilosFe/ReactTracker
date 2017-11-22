import '../../enzymeSetup';

import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Report from '../../../src/components/reportList/report';
import styles from '../../../src/components/reportList/styles.css';

describe('Report', () => {
    const createReport = (tempC) => ({
        location: {
            name: 'Montreal',
            country: 'Canada'
        },
        weather: {
            tempC,
            isDay: true,
        }
    });

    const renderReport = (size, tempC) => {
        return shallow(
            <Report
                cardSize={size}
                color="colorClass"
                report={createReport(tempC)}
                onRemove={sinon.stub()}
            />
        );
    };

    it('should round off the temperature on large cards', () => {
        const roundUpWrapper = renderReport('lg', 10.7);
        const roundDownWrapper = renderReport('lg', 8.3);
        const negativeRoundingWrapper = renderReport('lg', -7.4);
        const unalteredWrapper = renderReport('lg', 3);

        expect(roundUpWrapper.text().includes('11')).to.eql(true);
        expect(roundUpWrapper.text().includes('10.7')).to.eql(false);

        expect(roundDownWrapper.text().includes('8')).to.eql(true);
        expect(roundDownWrapper.text().includes('8.3')).to.eql(false);

        expect(negativeRoundingWrapper.text().includes('-7')).to.eql(true);
        expect(negativeRoundingWrapper.text().includes('-7.4')).to.eql(false);

        expect(unalteredWrapper.text().includes('3')).to.eql(true);
    });

    it('should not round off the temperature on small cards', () => {
        const wrapper = renderReport('sm', -4.8);

        expect(wrapper.text().includes('-4.8')).to.eql(true);
    });

    it('should trigger removal function when remove icon is clicked', () => {
        const stub = sinon.stub();
        const report = createReport(10);

        const wrapper = shallow(
            <Report
                cardSize="sm"
                color="colorClass"
                report={report}
                onRemove={stub}
            />
        );

        wrapper.find('img').simulate('click');

        expect(stub.calledWith(report)).to.eql(true);
    });
});
