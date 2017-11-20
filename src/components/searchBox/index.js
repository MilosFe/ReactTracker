import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import SearchField from './searchField';

class SearchBox extends Component {
    render() {
        const { isDesktop } = this.props;

        if (isDesktop) {
            return (
                <div className={styles.desktopContainer}>
                    <span className={styles.searchBoxHeader}>
                        {'How\'s the weather in...'}
                    </span>
                    <SearchField shadow/>
                </div>
            );
        }

        return (
            <div className={styles.mobileContainer}>
                <span className={styles.searchBoxHeader}>
                    {'How\'s the weather in...'}
                </span>
                <SearchField/>
            </div>
        );
    }
}

SearchBox.propTypes = {
    isDesktop: PropTypes.bool
};

export default SearchBox;
