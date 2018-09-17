import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hotelRequest: null,
  getHotelDetail : ['hotelId'],
  hotelSuccess: ['payload'],
  loadHotelData : null,
  hotelDetailSuccess : ['payload'],
  hotelFailure: ['errorMsg'],
  saveHotelTotal: ['data'],
  saveSuccess: ['payload'],
  deleteSuccess: ['payload'],
  loadHotelSuccess : ['payload'],
  getSavedHotelDetail : ['hotelId'],
  loadDetailSuccess : ['payload'],
  setRate :['id', 'rate'],
  rateHotelSuccess :['id', 'rate'],
})

export const HotelTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  hotelTotalData: null,
  error: null,
  errorMsg : null,
  hotelDetailData : null,
  CF : 1,
  savedIds : [],
  savedHotelData : null,
  hotelSavedDetailData : null,
})

/* ------------- Selectors ------------- */

export const HotelSelectors = {
  getData: state => state.hotelTotalData
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, error: null, errorMsg: null, hotelDetailData : null })

export const _request = (state, { data }) =>
  state.merge({ fetching: true, data})

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, hotelTotalData : payload, errorMsg : null, hotelDetailData: null, CF : cf })
}
export const hotelDetailSuccess = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, hotelDetailData : payload, errorMsg : null, CF : cf })
}

export const saveSuccess = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  let savedIDs = []
  Array.prototype.forEach.call(state.savedIds, element => {
    savedIDs.push(element)
  });
  savedIDs.push(payload)
  return state.merge({ fetching: false, error: null, savedIds: savedIDs, errorMsg: null, CF : cf })
}

export const deleteSuccess = (state, action) => {
  const { payload } = action
  let cf = state.CF * (-1)
  let savedIDs = []
  Array.prototype.forEach.call(state.savedIds, element => {
    if(element != payload)
      savedIDs.push(element)
  });
  
  return state.merge({ fetching: false, error: null, savedIds: savedIDs, errorMsg: null, CF : cf })
}

export const loadTotalSuccess = (state, action) => {
  const { payload} = action
  console.log(' hotel redux total success => ', payload)
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, savedHotelData: payload, errorMsg: null, CF : cf })
}

export const loadDetailSuccess = (state, action) => {
  const { payload} = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, hotelSavedDetailData: payload, errorMsg: null, CF : cf })
}

export const rateSuccess = (state, action) => {
  const { rate, id } = action
  
  let temp={}
  Object.keys(state.hotelDetailData).map(function(key, index) {
    if(key== 'rating'){
      temp[key] = rate
    }
    else{
      temp[key] = state.hotelDetailData[key]
    }
  });
  
  let _temp = []
  Array.prototype.forEach.call(state.hotelTotalData, element => {
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
  return state.merge({ fetching: false, error: null, hotelDetailData: temp,hotelTotalData: _temp, errorMsg: null, CF : cf })
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
  [Types.HOTEL_FAILURE]: failure,
  [Types.SAVE_HOTEL_TOTAL]: request,
  [Types.SAVE_SUCCESS]: saveSuccess,
  [Types.DELETE_SUCCESS]: deleteSuccess,
  [Types.LOAD_HOTEL_SUCCESS]: loadTotalSuccess,
  [Types.GET_SAVED_HOTEL_DETAIL]: request,
  [Types.LOAD_DETAIL_SUCCESS]: loadDetailSuccess,
  [Types.SET_RATE]: _request,
  [Types.RATE_HOTEL_SUCCESS]: rateSuccess,
})
