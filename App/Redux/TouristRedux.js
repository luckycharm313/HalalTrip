import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  touristRequest: ['data'],
  touristSuccess: ['payload'],
  loadTouristData: null,
  touristFailure: null,
  getTouristDetail : ['touristId'],
  detailSuccess : ['payload', 'temp'],
  setTouristRate :['id', 'rate'],
  rateTouristSuccess :['id', 'rate'],
})

export const TouristTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  touristTotalData: null,
  fetching: null,
  payload: null,
  error: null,
  CF : 1,
  touristDetailData : null,
  subTouristData: null,
  savedIds : [],
})

/* ------------- Selectors ------------- */

export const TouristSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })
export const _request = (state, { data }) =>
  state.merge({ fetching: true, data})
// successful api lookup
export const success = (state, action) => {
  const { payload} = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, touristTotalData:payload, CF : cf })
}

export const detailSuccess = (state, action) => {
  const { payload, temp } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, touristDetailData: payload, subTouristData: temp, CF : cf })
}
export const rateSuccess = (state, action) => {
  const { rate, id } = action
  let temp={}
  Object.keys(state.touristDetailData).map(function(key, index) {
    if(key== 'rating'){
      temp[key] = rate
    }
    else{
      temp[key] = state.touristDetailData[key]
    }
  });
  let _temp = []
  Array.prototype.forEach.call(state.touristTotalData, element => {
    let _t ={}
    Object.keys(element).map(function(key, index) {
      if(key== 'rating' && element['id'] == id){
        _t[key] = rate
      }
      else{
        _t[key] = element[key]
      }
    });
    _temp.push(_t)
  });
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, touristDetailData: temp,touristTotalData: _temp, errorMsg: null, CF : cf })
}
// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOURIST_REQUEST]: request,
  [Types.TOURIST_SUCCESS]: success,
  [Types.TOURIST_FAILURE]: failure,

  [Types.LOAD_TOURIST_DATA]: request,
  [Types.GET_TOURIST_DETAIL]: request,
  [Types.DETAIL_SUCCESS]: detailSuccess,
  [Types.SET_TOURIST_RATE]: _request,
  [Types.RATE_TOURIST_SUCCESS]: rateSuccess,
})
