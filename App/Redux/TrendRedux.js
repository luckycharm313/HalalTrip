import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  trendRequest: ['data'],
  trendSuccess: ['payload'],
  detailSuccess: ['payload'],
  getTrendDetail: ['trendId'],
  trendFailure: null
})

export const TrendTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  trendTotalData: null,
  trendDetailData : null,
  fetching: null,
  CF : 1,
  errorMsg : null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const TrendSelectors = {
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
  return state.merge({ fetching: false, error: null, trendTotalData : payload, CF : cf })
}

export const detailSuccess = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, trendDetailData : payload, CF : cf })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TREND_REQUEST]: request,
  [Types.GET_TREND_DETAIL]: request,
  [Types.TREND_SUCCESS]: success,
  [Types.DETAIL_SUCCESS]: detailSuccess,
  [Types.TREND_FAILURE]: failure
})
