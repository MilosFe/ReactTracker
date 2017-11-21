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
    constructor(props) {
        super(props);

        this.colors = {};
    }

    render() {
        const { reports, isDesktop } = this.props;

        const reverseOrderMap = (collection, iteratee) => {
            let map = [];

            let  length = collection.length;
            for (let i = length - 1; i >= 0; i--) {
                map[i] = iteratee(collection[i], i);
            }

            return map;
        };

        // Elements must be mapped in reverse iteration order
        // to ensure that colors are randomized and memoized correctly.

        const reportElements = reverseOrderMap(reports, (report, index) => {
            return (
                <Report
                    key={this.generateKey.bind(this)(report)}
                    report={report}
                    cardSize={isDesktop ? 'sm' : 'lg'}
                    color={this.getColor.bind(this)(reports, report, index)}
                />
            );
        });

        return (
            <div className={classnames({
                [styles.desktopReportListContainer]: isDesktop
            })}>
                {reportElements.reverse()}
            </div>
        );
    }

    generateKey(report) {
        if (!report) { return; }

        return `${report.location.name}${report.location.country}`;
    }

    getColor(reports, report, index) {
        const key = this.generateKey(report);
        const comparisonReportKey = this.generateKey(reports[index + 1]);

        const availableColors = COLORS.filter((color) => {
            return color !== this.colors[comparisonReportKey]
        });

        this.colors[key] = this.colors[key] ||
            availableColors[random(0, availableColors.length - 1)];

        return this.colors[key];
    }
}

ReportList.propTypes = {
    isDesktop: PropTypes.bool,
    reports: PropTypes.arrayOf(PropTypes.object),
    savedColorSequence: PropTypes.arrayOf(PropTypes.string)
}

export default ReportList;
