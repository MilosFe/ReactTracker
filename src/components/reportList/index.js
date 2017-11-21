import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { random, range } from 'lodash';

import styles from './styles.css';
import Report from './report';

const COLORS = [
    styles.darkOrange,
    styles.lightOrange,
    styles.brightBlue
];

class ReportList extends Component {
    render() {
        const { reports, isDesktop } = this.props;

        const colors = this.generateRandomColors(reports);

        return (
            <div className={classnames({
                [styles.desktopReportListContainer]: isDesktop
            })}>
                {reports.map((report, index) => {
                    return (
                        <Report
                            key={`${report.location.name}${report.location.country}`}
                            report={report}
                            cardSize={isDesktop ? 'sm' : 'lg'}
                            color={COLORS[colors[index]]}
                        />
                    );
                })}
            </div>
        );
    }

    generateRandomColors(reports) {
        const colorsByNum = [];

        reports.forEach((_report, index) => {
            const allowedValues = range(0, COLORS.length)
                .filter((val) => val !== colorsByNum[index - 1]);

            colorsByNum[index] = allowedValues[random(0, allowedValues.length - 1)];
        });

        return colorsByNum;
    }
}

ReportList.propTypes = {
    isDesktop: PropTypes.bool,
    reports: PropTypes.arrayOf(PropTypes.object)
}

export default ReportList;
