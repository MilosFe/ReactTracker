import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import Report from './report';

class ReportList extends Component {
    render() {
        const { reports } = this.props;

        return (
            <div className={styles.reportListContainer}>
                {reports.map((report) => {
                    return (
                        <Report
                            key={`${report.location.name}${report.location.country}`}
                            report={report}
                        />
                    );
                })}
            </div>
        );
    }
}

ReportList.propTypes = {
    reports: PropTypes.arrayOf(PropTypes.object)
}

export default ReportList;
