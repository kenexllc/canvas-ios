// @flow

import 'react-native'
import React from 'react'
import * as courseTemplate from '../../../../api/canvas-api/__templates__/course'
import explore from '../../../../../test/helpers/explore'
import CourseCard from '../CourseCard'
import renderer from 'react-test-renderer'

jest.mock('TouchableHighlight', () => 'TouchableHighlight')

let defaultProps = {
  onPress: () => {},
  course: courseTemplate.course(),
  color: '#333',
  style: {},
  initialHeight: 100,
  onCoursePreferencesPressed: () => {},
}

it('renders', () => {
  let tree = renderer.create(
    <CourseCard
      {...defaultProps}
    />
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

it('it calls props.onPress when it is selected', () => {
  let onPress = jest.fn()
  let tree = renderer.create(
    <CourseCard {...defaultProps} onPress={onPress} />
  ).toJSON()

  let button: any = explore(tree).selectByID(defaultProps.course.course_code)
  button.props.onPress()

  expect(onPress).toHaveBeenCalledWith(defaultProps.course)
})

it('calls props.onCoursePreferencesPressed when the kabob is selected', () => {
  let onCoursePreferencesPressed = jest.fn()
  let tree = renderer.create(
    <CourseCard {...defaultProps} onCoursePreferencesPressed={onCoursePreferencesPressed} />
  ).toJSON()

  let button = explore(tree).selectByID(`courseCard.kabob_${defaultProps.course.id}`) || {}
  button.props.onPress()

  expect(onCoursePreferencesPressed).toHaveBeenCalledWith(defaultProps.course.id)
})
