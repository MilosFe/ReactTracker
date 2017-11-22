import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import { random } from 'lodash';

import styles from './styles.css';
import Report from './report';
import { reverseForEach } from '../../utils';

const COLORS = [
    styles.darkOrange,
    styles.lightOrange,
    styles.brightBlue
];

class ReportList extends Component {
    constructor(props) {
        super(props);

        this.colors = {};
        this.calculateColors.bind(this)(props.reports);
    }

    render() {
        const { reports, removeWeatherReport, isDesktop } = this.props;

        return (
            <TransitionGroup className={classnames({
                [styles.desktopReportListContainer]: isDesktop,
                [styles.mobileReportListContainer]: !isDesktop
            })}>
                {reports.map((report, index) => {
                    const key = this.generateKey(report);

                    return (
                        <CSSTransition key={key} timeout={500} classNames={{
                             enter: styles.reportEnter,
                             enterActive: styles.reportEnterActive,
                             exit: styles.reportExit,
                             exitActive: styles.reportExitActive
                        }}>
                            <Report
                                report={report}
                                cardSize={isDesktop ? 'sm' : 'lg'}
                                color={this.colors[key]}
                                onRemove={removeWeatherReport}
                            />
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        );
    }

    componentWillReceiveProps({ reports }) {
        this.calculateColors.bind(this)(reports);
    }

    generateKey(report) {
        if (!report) { return; }

        return `${report.location.name}${report.location.country}`;
    }

    calculateColors(reports) {
        reverseForEach(reports, (report, index) => {
            const key = this.generateKey(report);
            const comparisonReportKey = this.generateKey(reports[index + 1]);

            const availableColors = COLORS.filter((color) => {
                return color !== this.colors[comparisonReportKey];
            });

            this.colors[key] = this.colors[key] ||
                availableColors[random(0, availableColors.length - 1)];
        });
    }
}

ReportList.propTypes = {
    isDesktop: PropTypes.bool,
    reports: PropTypes.arrayOf(PropTypes.object),
    removeWeatherReport: PropTypes.func
};

export default ReportList;
