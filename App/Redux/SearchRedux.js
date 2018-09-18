import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchRequest: ['data'],
  searchSuccess: ['payload'],
  searchFailure: null,
  searchData: ['searchKey'],
  getWeather: ['lat', 'long'],
  weatherSuccess: ['data'],
  getEmergencyNumbers: null,
  emergencySuccess: ['data'],
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  searchResult:null,
  weatherData: null,
  emergencyNumbers : null,
})

/* ------------- Selectors ------------- */

export const SearchSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null, weatherData: null, searchResult:null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, searchResult: payload })
}

export const weatherSuccess = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, weatherData: data })
}

export const emergencySuccess = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, emergencyNumbers: data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: request,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure,
  [Types.SEARCH_DATA]: request,
  [Types.GET_WEATHER]: request,
  [Types.WEATHER_SUCCESS]: weatherSuccess,
  [Types.GET_EMERGENCY_NUMBERS]: request,
  [Types.EMERGENCY_SUCCESS]: emergencySuccess
})
