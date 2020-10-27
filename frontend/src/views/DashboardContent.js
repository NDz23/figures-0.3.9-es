import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import styles from './_dashboard-content.scss';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentMaus from 'base/components/header-views/header-content-maus/HeaderContentMaus';
import BaseStatCard from 'base/components/stat-cards/BaseStatCard';

let cx = classNames.bind(styles);


class DashboardContent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentMaus
            showHistoryButton
          />
        </HeaderAreaLayout>
        <div className={cx({ 'container': true, 'base-grid-layout': true, 'dashboard-content': true})}>
          <BaseStatCard
            mainValue={this.props.generalData.getIn(['registeredUsers', 'current_month'], 0)}
            valueHistory={this.props.generalData.getIn(['registeredUsers', 'history'], [])}
            cardTitle='Estudiantes registrados'
          />
          <BaseStatCard
            mainValue={this.props.generalData.getIn(['newUsers', 'current_month'], 0)}
            valueHistory={this.props.generalData.getIn(['newUsers', 'history'], [])}
            cardTitle='Estudiantes nuevos'
          />
          <BaseStatCard
            mainValue={this.props.generalData.getIn(['courseEnrollments', 'current_month'], 0)}
            valueHistory={this.props.generalData.getIn(['courseEnrollments', 'history'], [])}
            cardTitle='Enrolamientos a cursos'
          />
          <BaseStatCard
            mainValue={this.props.generalData.getIn(['courseCompletions', 'current_month'], 0)}
            valueHistory={this.props.generalData.getIn(['courseCompletions', 'history'], [])}
            cardTitle='Cursos completados'
          />
        </div>
        <div className={cx({ 'container': true, 'functionality-callout': true})}>
          <h3>Acceda rápidamente a los datos de un curso específico utilizando el botó;n <strong>"Ir a curso"</strong> en la parte superior, o <strong>"Navegar cursos"</strong> a continuación:</h3>
          <NavLink
            to="/figures/courses"
            className={styles['functionality-callout-cta']}
          >
            Navegar cursos
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  generalData: Immutable.fromJS(state.generalData),
})

export default connect(
  mapStateToProps,
)(DashboardContent)
