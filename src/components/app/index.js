import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectScreenSize } from 'react-screen-size';

import styles from './styles.css';
import Logo from '../logo';
import SearchBox from '../searchBox';
import ReportList from '../reportList';
import { fetchWeatherReport, removeWeatherReport } from '../../redux/weatherReports';

const ReportListContainer = connect((state) => ({
    reports: state.reports
}), {
    removeWeatherReport
})(ReportList);

const SearchBoxContainer = connect((state) => ({}), {
    fetchWeatherReport
})(SearchBox);

class App extends Component {
    render() {
        const { isDesktop } = this.props;

        if (isDesktop) {
            return (
                <div className={styles.desktopContainer}>
                    <Logo className={styles.logo} />
                    <SearchBoxContainer isDesktop={isDesktop} />
                    <ReportListContainer isDesktop={isDesktop} />
                </div>
            );
        }

        return (
            <div className={styles.mobileContainer}>
                <SearchBoxContainer isDesktop={isDesktop} />
                <ReportListContainer isDesktop={isDesktop} />
                <Logo className={styles.logo} />
            </div>
        );
    }
}

App.propTypes = {
    isDesktop: PropTypes.bool.isRequired
};

const mapScreenSizeToProps = (screenSize) => ({
    isDesktop: screenSize['> mobile']
});

export default connectScreenSize(mapScreenSizeToProps)(App);
