import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import { get, random } from 'lodash';

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
                    return (
                        <CSSTransition key={report.id} timeout={500} classNames={{
                             enter: styles.reportEnter,
                             enterActive: styles.reportEnterActive,
                             exit: styles.reportExit,
                             exitActive: styles.reportExitActive
                        }}>
                            <Report
                                report={report}
                                cardSize={isDesktop ? 'sm' : 'lg'}
                                color={this.colors[report.id]}
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

    calculateColors(reports) {
        reverseForEach(reports, (report, index) => {
            const reportId = report.id;
            const comparisonReportId = get(reports[index + 1], 'id');

            const availableColors = COLORS.filter((color) => {
                return color !== this.colors[comparisonReportId];
            });

            this.colors[reportId] = this.colors[reportId] ||
                availableColors[random(0, availableColors.length - 1)];
        });
    }
}

ReportList.propTypes = {
    isDesktop: PropTypes.bool.isRequired,
    reports: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeWeatherReport: PropTypes.func.isRequired
};

export default ReportList;
