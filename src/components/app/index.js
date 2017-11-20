import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectScreenSize } from 'react-screen-size';

import styles from './styles.css';
import Logo from '../logo';
import SearchBox from '../searchBox';
import ReportList from '../reportList';
import { fetchWeatherReport } from '../../redux/weatherReports';

const ReportListContainer = connect((state) => {
    reports: state.reports
}, {
    fetchWeatherReport
})(ReportList);

class App extends Component {
    render() {
        const { isDesktop } = this.props;

        if (isDesktop) {
            return (
                <div className={styles.desktopContainer}>
                    <Logo className={styles.logo} />
                    <SearchBox isDesktop={isDesktop} />
                    <ReportListContainer />
                </div>
            );
        }

        return (
            <div className={styles.mobileContainer}>
                <SearchBox isDesktop={isDesktop} />
                <ReportListContainer />
                <Logo className={styles.logo} />
            </div>
        );
    }
}

App.propTypes = {
    isDesktop: PropTypes.bool.isRequired,
    reports: PropTypes.arrayOf(PropTypes.shape({
        location: PropTypes.shape({
            name: PropTypes.string,
            country: PropTypes.string
        }),
        weather: PropTypes.shape({
            tempC: PropTypes.number,
            tempF: PropTypes.number,
            isDay: PropTypes.bool,
            condition: PropTypes.string,
            windKph: PropTypes.number,
            cloud: PropTypes.bool
        })
    }))
};

const mapScreenSizeToProps = (screenSize) => ({
    isDesktop: screenSize['> mobile']
});

export default connectScreenSize(mapScreenSizeToProps)(App);
