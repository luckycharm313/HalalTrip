import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  restaurantRequest: ['data'],
  restaurantSuccess: ['payload'],
  loadRestaurantData : null,
  restaurantFailure: ['errorMsg'],
  cuisineSuccess : ['payload'],
  detailSuccess : ['payload', 'temp'],
  getRestaurantDetail : ['restaurantId']
})

export const RestaurantTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  restaurantData: null,
  fetching: null,
  payload: null,
  error: null,
  errorMsg : null,
  cuisineData : null,
  restaurantDetailData : null,
  subRestaurantData: null,
  CF : 1,
})

/* ------------- Selectors ------------- */

export const RestaurantSelectors = {
  getData: state => state.restaurantData
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, restaurantDetailData: null, errorMsg: null, subRestaurantData: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, restaurantData: payload, errorMsg: null, CF : cf })
}

export const cuisineSuccess = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, cuisineData: payload, errorMsg: null, CF : cf })
}

export const detailSuccess = (state, action) => {
  const { payload, temp } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, restaurantDetailData: payload, subRestaurantData: temp, errorMsg: null, CF : cf })
}

// Something went wrong somewhere.
export const failure = (state, action) =>{
  const { errorMsg } = action
  return state.merge({ fetching: false, error: true, errorMsg })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESTAURANT_REQUEST]: request,
  [Types.LOAD_RESTAURANT_DATA]: request,
  [Types.GET_RESTAURANT_DETAIL]: request,
  [Types.RESTAURANT_SUCCESS]: success,
  [Types.CUISINE_SUCCESS]: cuisineSuccess,
  [Types.DETAIL_SUCCESS]: detailSuccess,
  [Types.RESTAURANT_FAILURE]: failure
})
