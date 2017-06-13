import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../style/Login.css';
import styles from '../style/main.css';

const HOCHeader = ComponentRight => class Header extends Component {
  static propTypes = { haveBoxShadow: PropTypes.bool };
  static defaultProps = { haveBoxShadow: true };
  render() {
    const { haveBoxShadow } = this.props;
    return (
      <header
        className={style.header}
        style={{
          boxShadow: haveBoxShadow
            ? '0 .125rem .125rem -0.125rem rgba(0,0,0,.15)'
            : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '62.5rem',
            margin: '0 auto',
            padding: '0 .5rem',
          }}
        >
          <div className={styles.logo} />
          {ComponentRight}
        </div>
      </header>
    );
  }
};

export default HOCHeader;
