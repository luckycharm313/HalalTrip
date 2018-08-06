import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hotelRequest: ['data'],
  hotelSuccess: ['payload'],
  hotelFailure: null
})

export const HotelTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  hotelTotalData: null,
  error: null
})

/* ------------- Selectors ------------- */

export const HotelSelectors = {
  getData: state => state.hotelTotalData
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, error: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, hotelTotalData : payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HOTEL_REQUEST]: request,
  [Types.HOTEL_SUCCESS]: success,
  [Types.HOTEL_FAILURE]: failure
})
