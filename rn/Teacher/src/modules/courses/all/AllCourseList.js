// @flow

import React, { Component, PropTypes } from 'react'
import { Dimensions } from 'react-native'
import i18n from 'format-message'
import mapStateToProps from './map-state-to-props'
import { connect } from 'react-redux'
import CourseList from '../components/CourseList'
import type { CourseProps } from '../course-prop-types'
import { route } from '../../../routing/'
import CoursesActions from '../actions'
import refresh from '../../../utils/refresh'

const { width: deviceWidth } = Dimensions.get('window')

type Props = {
  navigator: ReactNavigator,
  courses: Array<CourseProps>,
  error?: string,
  pending?: number,
  refreshCourses: () => void,
}

export class AllCourseList extends Component {
  props: Props

  constructor (props: Props) {
    super(props)

    props.navigator.setTitle({
      title: i18n({
        default: 'All Courses',
        description: `The title of the screen showing all of a teacher's courses`,
      }),
    })
  }

  selectCourse = (course: Course) => {
    let destination = route(`/courses/${course.id}`)
    this.props.navigator.push(destination)
  }

  openUserPreferences = (courseId: string) => {
    let destination = route(`/courses/${courseId}/user_preferences`)
    this.props.navigator.showModal({
      ...destination,
      animationType: 'slide-up',
    })
  }

  selectCourse = (course: Course) => {
    this.props.navigator.push(route(`/courses/${course.id}`))
  }

  render (): React.Element<*> {
    return (
      <CourseList
        {...this.props}
        selectCourse={this.selectCourse}
        width={deviceWidth}
        onCoursePreferencesPressed={this.openUserPreferences}
      />
    )
  }
}

const coursePropsShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  course_code: PropTypes.string.isRequired,
  short_name: PropTypes.string,
  color: PropTypes.string,
  image_download_url: PropTypes.string,
})

AllCourseList.propTypes = {
  courses: PropTypes.arrayOf(coursePropsShape).isRequired,
  pending: PropTypes.number,
  error: PropTypes.string,
}

let Refreshed = refresh(
  props => props.refreshCourses(),
  props => props.courses.length === 0
)(AllCourseList)
let Connected = connect(mapStateToProps, CoursesActions)(Refreshed)
export default (Connected: Component<any, Props, any>)
