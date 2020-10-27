
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './_header-content-reports-list.scss';

let cx = classNames.bind(styles);

class HeaderContentReportsList extends Component {
  render() {

    return (
      <section className={cx({ 'header-content-reports-list': true, 'container': true})}>
        <div className={styles['title-container']}>
          <div className={styles['title-text']}>Lista de reportes</div>
          <span className={styles['title-decoration']} />
        </div>
        <div className={styles['options-container']}>
          <button className={styles['header-option-button']}>Crear un nuevo reporte</button>
        </div>
      </section>
    );
  }
}

HeaderContentReportsList.defaultProps = {

}

export default HeaderContentReportsList;
