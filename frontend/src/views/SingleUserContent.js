import React, { Component } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import classNames from 'classnames/bind';
import styles from './_single-user-content.scss';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentUser from 'base/components/header-views/header-content-user/HeaderContentUser';
import UserCoursesList from 'base/components/user-courses-list/UserCoursesList';
import apiConfig from 'base/apiConfig';

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const educationLevelsDict = {
  "p": "Doctorado",
  "m": "Master o magíster",
  "b": "Pregrado o licenciatura",
  "a": "Técnico profesional",
  "hs": "Enseñanza secundaria",
  "jhs": "Formación media",
  "none": "Ninguna educación formal",
  "o": "Otra educación",
  "n-a": "No disponible",
  "el": "Enseñanza primaria"
}

const genderDict = {
  "m": "Masculino",
  "f": "Femenino",
  "o": "Otro / Prefiere no decir"
}

let cx = classNames.bind(styles);

class SingleUserContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: Immutable.Map()
    };

    this.fetchUserData = this.fetchUserData.bind(this);
  }

  fetchUserData = () => {
    trackPromise(
      fetch((apiConfig.learnersDetailed + this.props.userId + '/'), { credentials: "same-origin" })
        .then(response => response.json())
        .then(json => this.setState({
          userData: Immutable.fromJS(json)
        }))
    )
  }

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    const dateJoined = new Date(this.state.userData.getIn(['date_joined']));

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentUser
            image = {this.state.userData.getIn(['profile_image', 'image_url_large'])}
            name = {this.state.userData.getIn(['name'])}
          />
        </HeaderAreaLayout>
        <div className={cx({ 'container': true, 'base-grid-layout': true, 'user-content': true})}>
          <div className={styles['user-information']}>
            <div className={styles['name']}>
              {this.state.userData['name']}
            </div>
            <ul className={styles['user-details']}>
              <li>
                <span className={styles['label']}>Usuario:</span>
                <span className={styles['value']}>{this.state.userData.getIn(['username'])}</span>
              </li>
              <li>
                <span className={styles['label']}>Año de nacimiento:</span>
                <span className={styles['value']}>{this.state.userData.getIn(['year_of_birth'])}</span>
              </li>
              <li>
                <span className={styles['label']}>Género:</span>
                <span className={styles['value']}>{genderDict[this.state.userData.getIn(['gender'])]}</span>
              </li>
              <li>
                <span className={styles['label']}>Fecha de registro:</span>
                <span className={styles['value']}>{dateJoined.toUTCString()}</span>
              </li>
              <li>
                <span className={styles['label']}>Cuenta activada:</span>
                <span className={styles['value']}>{this.state.userData.getIn(['is_active'], false) ? 'Sí' : 'No'}</span>
              </li>
              <li>
                <span className={styles['label']}>Cursos enrolados:</span>
                <span className={styles['value']}>{this.state.userData.getIn(['courses']) ? this.state.userData.getIn(['courses']).length : ""}</span>
              </li>
              <li>
                <span className={styles['label']}>País:</span>
                <span className={styles['value']}>{this.state.userData.getIn(['country']) ? countries.getName(this.state.userData.getIn(['country']), "en") : "No disponible"}</span>
              </li>
              <li>
                <span className={styles['label']}>Nivel educativo:</span>
                <span className={styles['value']}>{this.state.userData.getIn(['level_of_education']) ? educationLevelsDict[this.state.userData.getIn(['level_of_education'])] : 'No disponible'}</span>
              </li>
              <li>
                <span className={styles['label']}>Correo electrónico:</span>
                <span className={styles['value']}><a href={"mailto:" + this.state.userData.getIn(['email'])}>{this.state.userData.getIn(['email'])}</a></span>
              </li>
            </ul>
          </div>
          <UserCoursesList
            enrolledCoursesData={this.state.userData.getIn(['courses'], [])}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleUserContent)
