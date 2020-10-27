import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './_header-content-static.scss';

let cx = classNames.bind(styles);

class HeaderContentStatic extends Component {
  render() {

    return (
      <section className={cx({ 'header-content-static': true, 'container': true})}>
        <h1 className={styles['title']}>{this.props.title}</h1>
        <p className={styles['subtitle']}>{this.props.subtitle}</p>
      </section>
    );
  }
}

HeaderContentStatic.defaultProps = {
  title: 'Encabezado de la p&aacute;gina est&aacute;tica',
  subtitle: 'Subt&iacute;tulo del encabezado de la p&aacute;gina est&aacute;tica.'
}

HeaderContentStatic.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default HeaderContentStatic
