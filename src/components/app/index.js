import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import Logo from '../logo';
import SearchBox from '../searchBox';
import CityList from '../cityList';

class App extends Component {
    render() {
        return (
            <div className={styles.desktopContainer}>
                <Logo />
                <SearchBox />
                <CityList />
            </div>
        );
    }
}

export default App;
