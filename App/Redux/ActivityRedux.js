import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  activityRequest: ['data'],
  getActivityDetail: ['activityId'],
  activitySuccess: ['payload'],
  detailSuccess: ['payload'],
  activityFailure: null
})

export const ActivityTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  activityTotalData: null,
  activityDetailData: null,
  data: null,
  fetching: null,
  payload: null,
  error: null,
  errorMsg: null,
  CF : 1,
})

/* ------------- Selectors ------------- */

export const ActivitySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, activityTotalData: payload, errorMsg: null, CF : cf  })
}

export const detailSuccess = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  console.log('payload', payload)
  return state.merge({ fetching: false, error: null, activityDetailData: payload, errorMsg: null, CF : cf  })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ACTIVITY_DETAIL]: request,
  [Types.ACTIVITY_REQUEST]: request,
  [Types.ACTIVITY_SUCCESS]: success,
  [Types.DETAIL_SUCCESS]: detailSuccess,
  [Types.ACTIVITY_FAILURE]: failure
})
