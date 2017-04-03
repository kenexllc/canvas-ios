// @flow

import { FavoritesActions } from '../../edit-favorites/actions'
import { CoursesActions } from '../../actions'
import { favoriteCourses, defaultState } from '../favorite-courses-reducer'
import { apiResponse, apiError } from '../../../../../test/helpers/apiMock'
import { testAsyncReducer } from '../../../../../test/helpers/async'

const template = {
  ...require('../../../../api/canvas-api/__templates__/course'),
}

describe('toggleFavorite', () => {
  it('favorites a course', async () => {
    const courseID = '4123'
    const action = FavoritesActions({ favoriteCourse: apiResponse() }).toggleFavorite(courseID, true)
    const initialState = {
      ...defaultState,
      courseRefs: [],
    }
    const states = await testAsyncReducer(favoriteCourses, action, initialState)
    const courseRefs = [courseID]
    expect(states).toEqual([
      { pending: 1, courseRefs },
      { pending: 0, courseRefs },
    ])
  })

  it('unfavorites a course', async () => {
    const courseID = '3322'
    const action = FavoritesActions({ unfavoriteCourse: apiResponse() }).toggleFavorite(courseID, false)
    const initialState = {
      ...defaultState,
      courseRefs: [courseID],
    }
    const states = await testAsyncReducer(favoriteCourses, action, initialState)
    const courseRefs = []
    expect(states).toEqual([
      { pending: 1, courseRefs },
      { pending: 0, courseRefs },
    ])
  })

  it('keeps favorite if favorited again', async () => {
    const courseID = '4123'
    const action = FavoritesActions({ favoriteCourse: apiResponse() }).toggleFavorite(courseID, true)
    const initialState = {
      ...defaultState,
      courseRefs: [courseID],
    }
    const states = await testAsyncReducer(favoriteCourses, action, initialState)
    const courseRefs = [courseID]
    expect(states).toEqual([
      { pending: 1, courseRefs },
      { pending: 0, courseRefs },
    ])
  })

  it('reverts favorite on error', async () => {
    const courseID = '588'
    const action = FavoritesActions({ favoriteCourse: apiError({ message: 'error' }) }).toggleFavorite(courseID, true)
    const initialState: FavoriteCoursesState = {
      ...defaultState,
      courseRefs: [],
    }
    const state = await testAsyncReducer(favoriteCourses, action, initialState)
    expect(state).toEqual([
      { pending: 1, courseRefs: [courseID] },
      { pending: 0, courseRefs: [], error: 'error' },
    ])
  })
})

describe('refreshCourses', () => {
  it('gets favorites', async () => {
    const yes = template.course({ id: '1', is_favorite: true })
    const no = template.course({ id: '2', is_favorite: false })
    const api = {
      getCourses: apiResponse([yes, no]),
      getCustomColors: apiResponse(),
    }
    const action = CoursesActions(api).refreshCourses()

    const state = await testAsyncReducer(favoriteCourses, action)

    expect(state).toEqual([
      { pending: 1, courseRefs: [] },
      { pending: 0, courseRefs: ['1'] },
    ])
  })

  it('removes favorites', async () => {
    const fresh = template.course({ id: '2', is_favorite: true })
    const api = {
      getCourses: apiResponse([fresh]),
      getCustomColors: apiResponse(),
    }
    const action = CoursesActions(api).refreshCourses()

    const initialState = {
      ...defaultState,
      courseRefs: ['1'],
    }

    const state = await testAsyncReducer(favoriteCourses, action, initialState)

    expect(state).toEqual([
      { pending: 1, courseRefs: ['1'] },
      { pending: 0, courseRefs: ['2'] },
    ])
  })

  it('handles errors', async () => {
    const api = {
      getCourses: apiError({ message: 'error' }),
      getCustomColors: apiResponse(),
    }
    const action = CoursesActions(api).refreshCourses()

    const state = await testAsyncReducer(favoriteCourses, action)

    expect(state).toEqual([
      { pending: 1, courseRefs: [] },
      { pending: 0, courseRefs: [], error: 'error' },
    ])
  })
})
