import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hotelRequest: null,
  getHotelDetail : ['hotelId'],
  hotelSuccess: ['payload'],
  loadHotelData : null,
  hotelDetailSuccess : ['payload'],
  hotelFailure: ['errorMsg']
})

export const HotelTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  hotelTotalData: null,
  error: null,
  errorMsg : null,
  hotelDetailData : null
})

/* ------------- Selectors ------------- */

export const HotelSelectors = {
  getData: state => state.hotelTotalData
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, error: null, errorMsg: null, hotelDetailData : null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, hotelTotalData : payload, errorMsg : null, hotelDetailData: null })
}
export const hotelDetailSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, hotelDetailData : payload, errorMsg : null })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { errorMsg } = action
  return state.merge({ fetching: false, error: true, errorMsg })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HOTEL_REQUEST]: request,
  [Types.GET_HOTEL_DETAIL]: request,
  [Types.HOTEL_SUCCESS]: success,
  [Types.HOTEL_DETAIL_SUCCESS]: hotelDetailSuccess,
  [Types.LOAD_HOTEL_DATA]: request,
  [Types.HOTEL_FAILURE]: failure
})
