import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  placeRequest: null,
  placeSuccess: ['payload'],
  placeCategorySuccess: ['payload'],
  placeFailure: ['errorMsg'],
  getHotelByPlace : ['placeId'],
})

export const PlaceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  placeTotalData: null,
  error: null,
  errorMsg : null,
  placeCategoryData : null,
})

/* ------------- Selectors ------------- */

export const PlaceSelectors = {
  getData: state => state.placeTotalData
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, error: null, errorMsg: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, placeTotalData :payload, errorMsg: null })
}

export const categorySuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, placeCategoryData :payload, errorMsg: null })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { errorMsg } = action
  return state.merge({ fetching: false, errorMsg })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PLACE_REQUEST]: request,
  [Types.PLACE_SUCCESS]: success,
  [Types.PLACE_CATEGORY_SUCCESS]: categorySuccess,
  [Types.PLACE_FAILURE]: failure,
  [Types.GET_HOTEL_BY_PLACE]: request,
})
