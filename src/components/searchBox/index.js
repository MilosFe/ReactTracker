import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';
import SearchField from './searchField';

class SearchBox extends Component {
    render() {
        const { isDesktop } = this.props;

        return (
            <div className={classnames({
                [styles.desktopContainer]: isDesktop,
                [styles.mobileContainer]: !isDesktop
            })}>
                <span className={styles.searchBoxHeader}>
                    {'How\'s the weather in...'}
                </span>
                <SearchField isDesktop={isDesktop} />
            </div>
        );
    }
}

SearchBox.propTypes = {
    isDesktop: PropTypes.bool
};

export default SearchBox;
