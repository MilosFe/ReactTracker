import '../../enzymeSetup';

import React from 'react';
import { shallow } from 'enzyme';

import ReportList from '../../../src/components/reportList';
import Report from '../../../src/components/reportList/report';

describe('ReportList', () => {
    const generateReports = (num) => Array(num).fill({
        location: {
            name: 'fake',
            country: 'place'
        }
    });

    it('renders a list of reports', () => {
        const reports = generateReports(5);

        const wrapper = shallow(
            <ReportList reports={reports} />
        );

        expect(wrapper.find(Report).length).to.equal(5);
    });

    it('renders each report with a different color than the last', () => {
        const reports = generateReports(1000);

        const wrapper = shallow(
            <ReportList reports={reports} />
        );

        const colors = wrapper.find(Report).map((reportEle) => reportEle.prop('color'))

        // Statistically unlikely to pass unless the algorithm is correct
        expect(colors.every((color, index) => {
            if (index === 0) { return true; }

            return color !== colors[index - 1];
        })).to.equal(true);
    });
});
