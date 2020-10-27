import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './_header-nav.scss';
import AutoCompleteCourseSelect from 'base/components/inputs/AutoCompleteCourseSelect';
import AutoCompleteUserSelect from 'base/components/inputs/AutoCompleteUserSelect';

class HeaderNav extends Component {

  render() {
    return (
      <div className={styles['header-nav']}>
        <NavLink
          to="/figures"
          className={styles['header-nav__link']}
        >
          Resumen
        </NavLink>
        <NavLink
          to="/figures/mau-history"
          className={styles['header-nav__link']}
        >
          Historial UAM
        </NavLink>
        <NavLink
          to="/figures/users"
          className={styles['header-nav__link']}
        >
          Usuarios
        </NavLink>
        <NavLink
          to="/figures/courses"
          className={styles['header-nav__link']}
        >
          Cursos
        </NavLink>
        <NavLink
          to="/figures/learners-progress-overview"
          className={styles['header-nav__link']}
        >
          Resumen Progreso de Estudiantes
        </NavLink>
        {(process.env.ENABLE_CSV_REPORTS === "enabled") && (
          <NavLink
            to="/figures/csv-reports"
            className={styles['header-nav__link']}
          >
            Reportes SCV
          </NavLink>
        )}
        <AutoCompleteCourseSelect
          negativeStyleButton
          buttonText='Ir a un curso'
        />
        <AutoCompleteUserSelect
          negativeStyleButton
          buttonText='Elegir un usuario'
        />
      </div>
    );
  }
}

export default HeaderNav
