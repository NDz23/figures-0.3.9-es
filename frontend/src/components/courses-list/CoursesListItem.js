import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './_courses-list-item.scss';

const parseCourseDate = (fetchedDate) => {
  if (fetchedDate === null) {
    return "-";
  } else if (Date.parse(fetchedDate)) {
    const tempDate = new Date(fetchedDate);
    return tempDate.toUTCString();
  } else {
    return fetchedDate;
  }
}

class CoursesListItem extends Component {

  render() {
    const courseStaff = this.props.courseStaff.map((item, index) => {
      return (
        <span key={index} className={styles['value']}>{item.get('fullname')}</span>
      )
    });

    return (
      <Link to={'/figures/course/' + this.props.courseId} className={styles['course-list-item']} key={this.props.courseId}>
        <div className={styles['general-info-section']}>
          <span className={styles['course-id']}>{this.props.courseCode}</span>
          <span className={styles['course-name']}>{this.props.courseName}</span>
          {this.props.courseIsSelfPaced ? (
            <div className={styles['label-value']}>
              <span className={styles['label']}>Fechas del curso:</span>
              <span className={styles['value']}>Este curso es a ritmo propio</span>
            </div>
          ) : [
            <div key='startDate' className={styles['label-value']}>
              <span className={styles['label']}>Fecha inicio:</span>
              <span className={styles['value']}>{parseCourseDate(this.props.startDate)}</span>
            </div>,
            <div key='endDate' className={styles['label-value']}>
              <span className={styles['label']}>Fecha final:</span>
              <span className={styles['value']}>{parseCourseDate(this.props.startDate)}</span>
            </div>
          ]}
          <div className={styles['label-value']}>
            <span className={styles['label']}>Equipo del curso:</span>
            {courseStaff}
          </div>
        </div>
        <span className={styles['sections-separator']} />
        <div className={styles['stats-section']}>
          <div className={styles['stats-section-inner']}>
            <div className={styles['single-stat']}>
              <span className={styles['stat-label']}>
                Estudiantes enrolados:
              </span>
              <span className={styles['stat-value']}>
                {this.props.learnersEnrolled}
              </span>
            </div>
            <div className={styles['single-stat']}>
              <span className={styles['stat-label']}>
                Progreso promedio:
              </span>
              <span className={styles['stat-value']}>
                {(this.props.averageProgress*100).toFixed(2)}%
              </span>
            </div>
            <div className={styles['single-stat']}>
              <span className={styles['stat-label']}>
                D&iacute;as promedio para completar:
              </span>
              <span className={styles['stat-value']}>
                {this.props.averageCompletionTime ? this.props.averageCompletionTime : 'n/a'}
              </span>
            </div>
            <div className={styles['single-stat']}>
              <span className={styles['stat-label']}>
                Estudiantes que han completado:
              </span>
              <span className={styles['stat-value']}>
                {this.props.numberLearnersCompleted}
              </span>
            </div>
          </div>
        </div>
        <span className={styles['sections-separator']} />
        <div className={styles['button-section']}>
          <Link to={'/figures/course/' + this.props.courseId} className={styles['course-button']}>Detalles del curso</Link>
        </div>
      </Link>
    )
  }
}

CoursesListItem.defaultProps = {

}

CoursesListItem.propTypes = {
  courseStaff: PropTypes.array,
  courseId: PropTypes.string,
  courseName: PropTypes.string,
  courseIsSelfPaced: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  learnersEnrolled: PropTypes.number,
  averageProgress: PropTypes.number,
  averageCompletionTime: PropTypes.number,
  numberLearnersCompleted: PropTypes.number,
};

export default CoursesListItem;
