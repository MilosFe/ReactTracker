import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectScreenSize } from 'react-screen-size';

import styles from './styles.css';
import Logo from '../logo';
import SearchBox from '../searchBox';
import CityList from '../cityList';

class App extends Component {
    render() {
        const { isDesktop } = this.props;

        if (isDesktop) {
            return (
                <div className={styles.desktopContainer}>
                    <Logo className={styles.logo} />
                    <SearchBox />
                    <CityList />
                </div>
            );
        }

        return (
            <div className={styles.mobileContainer}>
                <SearchBox />
                <CityList />
                <Logo className={styles.logo} />
            </div>
        );
    }
}

const mapScreenSizeToProps = (screenSize) => ({
    isDesktop: screenSize['> mobile']
});

export default connectScreenSize(mapScreenSizeToProps)(App);
