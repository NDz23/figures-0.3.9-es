import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiConfig from 'base/apiConfig';
import { trackPromise } from 'react-promise-tracker';
import styles from './_courses-list-content.scss';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentStatic from 'base/components/header-views/header-content-static/HeaderContentStatic';
import Paginator from 'base/components/layout/Paginator';
import ListSearch from 'base/components/inputs/ListSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

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


class CoursesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesList: [],
      perPage: 20,
      count: 0,
      pages: 0,
      currentPage: 1,
      searchQuery: '',
      ordering: 'display_name',
    };

    this.getCourses = this.getCourses.bind(this);
    this.setPerPage = this.setPerPage.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setOrdering = this.setOrdering.bind(this);
    this.constructApiUrl = this.constructApiUrl.bind(this);
  }

  constructApiUrl(rootUrl, searchQuery, orderingType, perPageLimit, resultsOffset) {
    let requestUrl = rootUrl;
    // add search term
    requestUrl += '?search=' + searchQuery;
    // add ordering
    requestUrl += '&ordering=' + orderingType;
    // add results per page limit
    requestUrl += '&limit=' + perPageLimit;
    // add results offset
    requestUrl += '&offset=' + resultsOffset;
    // return
    return requestUrl;
  }

  getCourses(page = 1) {
    const offset = (page-1) * this.state.perPage;
    const requestUrl = this.constructApiUrl(apiConfig.coursesGeneral, this.state.searchQuery, this.state.ordering, this.state.perPage, offset);
    trackPromise(
      fetch((requestUrl), { credentials: "same-origin" })
        .then(response => response.json())
        .then(json => this.setState({
          coursesList: json['results'],
          count: json['count'],
          pages: Math.ceil(json['count'] / this.state.perPage),
          currentPage: page,
        })
      )
    )
  }

  setCurrentPage(newValue) {
    this.setState({
      currentPage: newValue,
    })
  }

  setPerPage(newValue) {
    this.setState({
      perPage: newValue
    }, () => {
      this.getCourses();
    })
  }

  setSearchQuery(newValue) {
    this.setState({
      searchQuery: newValue
    }, () => {
      this.getCourses();
    })
  }

  setOrdering(newValue) {
    this.setState({
      ordering: newValue
    }, () => {
      this.getCourses();
    })
  }

  componentDidMount() {
    this.getCourses();
  }

  render() {

    const listItems = this.state.coursesList.map((course, index) => {
      return (
        <li key={course['id']} className={styles['course-list-item']}>
          <div className={styles['course-name']}>
            <div className={styles['in-cell-label-value']}>
              <div className={styles['mobile-label']}>
                Nombre del curso:
              </div>
              <div className={styles['mobile-value']}>
                <Link
                  className={styles['course-name-link']}
                  to={'/figures/course/' + course['course_id']}
                >
                  {course['course_name']}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles['course-id']}>
            <div className={styles['in-cell-label-value']}>
              <div className={styles['mobile-label']}>
                ID del curso:
              </div>
              <div className={styles['mobile-value']}>
                {course['course_id']}
              </div>
            </div>
          </div>
          <div className={styles['start-date']}>
            <div className={styles['in-cell-label-value']}>
              <div className={styles['mobile-label']}>
                Inicio:
              </div>
              <div className={styles['mobile-value']}>
                {parseCourseDate(course['start_date'])}
              </div>
            </div>
          </div>
          <div className={styles['self-paced']}>
            <div className={styles['in-cell-label-value']}>
              <div className={styles['mobile-label']}>
                Ritmo propio:
              </div>
              <div className={styles['mobile-value']}>
                {course['self_paced'] ? <FontAwesomeIcon icon={faCheck} className={styles['checkmark-icon']} /> : '-'}
              </div>
            </div>
          </div>
          <div className={styles['enrolments']}>
            <div className={styles['in-cell-label-value']}>
              <div className={styles['mobile-label']}>
                Enrolamientos:
              </div>
              <div className={styles['mobile-value']}>
                {course['metrics']['enrollment_count']}
              </div>
            </div>
          </div>
          <div className={styles['completions']}>
            <div className={styles['in-cell-label-value']}>
              <div className={styles['mobile-label']}>
                Completados:
              </div>
              <div className={styles['mobile-value']}>
                {course['metrics']['num_learners_completed']}
              </div>
            </div>
          </div>
          <div className={styles['action-container']}>
            <Link
              className={styles['course-action']}
              to={'/figures/course/' + course['course_id']}
            >
              Detalles
            </Link>
          </div>
        </li>
      )
    })

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentStatic
            title='Lista de cursos'
            subtitle={'Aqu&iacute; puedes ver todos los cursos de tu plataforma. Cantidad de resultados: ' + this.state.count + '.'}
          />
        </HeaderAreaLayout>
        <div className={cx({ 'container': true, 'courses-content': true})}>
          <ListSearch
            valueChangeFunction={this.setSearchQuery}
            inputPlaceholder='Buscar curso por nombre, c&oacute;digo o ID...'
          />
          {this.state.pages ? (
            <Paginator
              pageSwitchFunction={this.getCourses}
              currentPage={this.state.currentPage}
              perPage={this.state.perPage}
              pages={this.state.pages}
              changePerPageFunction={this.setPerPage}
            />
          ) : ''}
          <ul className={styles['courses-list']}>
            <li key='list-header' className={cx(styles['course-list-item'], styles['list-header'])}>
              <div className={styles['course-name']}>
                <button
                  className={styles['sorting-header-button']}
                  onClick={() => (this.state.ordering !== 'display_name') ? this.setOrdering('display_name') : this.setOrdering('-display_name')}
                >
                  <span>
                    Nombre del curso
                  </span>
                  {(this.state.ordering === 'display_name') ? (
                    <FontAwesomeIcon icon={faAngleDoubleUp} />
                  ) : (this.state.ordering === '-display_name') ? (
                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                  ) : ''}
                </button>
              </div>
              <div className={styles['course-id']}>
                ID del curso:
              </div>
              <div className={styles['start-date']}>
                Inicio:
              </div>
              <div className={styles['self-paced']}>
                <button
                  className={styles['sorting-header-button']}
                  onClick={() => (this.state.ordering !== 'self_paced') ? this.setOrdering('self_paced') : this.setOrdering('-self_paced')}
                >
                  <span>
                    Ritmo propio
                  </span>
                  {(this.state.ordering === 'self_paced') ? (
                    <FontAwesomeIcon icon={faAngleDoubleUp} />
                  ) : (this.state.ordering === '-self_paced') ? (
                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                  ) : ''}
                </button>
              </div>
              <div className={styles['enrolments']}>
                Enrolamientos:
              </div>
              <div className={styles['completions']}>
                Completados:
              </div>
              <div className={styles['action-container']}>

              </div>
            </li>
            {listItems}
          </ul>
          {this.state.pages ? (
            <Paginator
              pageSwitchFunction={this.getCourses}
              currentPage={this.state.currentPage}
              perPage={this.state.perPage}
              pages={this.state.pages}
              changePerPageFunction={this.setPerPage}
            />
          ) : ''}
        </div>
      </div>
    );
  }
}

export default CoursesList
