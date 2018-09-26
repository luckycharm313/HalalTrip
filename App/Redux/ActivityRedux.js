import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  activityRequest: ['data'],
  getActivityDetail: ['activityId'],
  activitySuccess: ['payload'],
  detailSuccess: ['payload'],
  activityFailure: null,
  saveActivityTotal : ['data'],
  saveSuccess : ['payload'],
  deleteSuccess : ['payload'],
  loadActivitySuccess : ['payload'],
  getSavedActivityDetail : ['activityId'],
  loadDetailSuccess : ['payload'],
  setActivityRate : ['id', 'rate'],
  rateActivitySuccess :['id', 'rate'],
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
  savedIds : [],
  savedActivityData : null,
  savedActivityDetailData : null,
})

/* ------------- Selectors ------------- */

export const ActivitySelectors = {
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
  let cf = state.CF * (-1)
  console.log(" activity saved payload", payload)
  return state.merge({ fetching: false, error: null, savedActivityData: payload, errorMsg: null, CF : cf })
}

export const loadDetailSuccess = (state, action) => {
  const { payload} = action
  let cf = state.CF * (-1)
  return state.merge({ fetching: false, error: null, savedActivityDetailData: payload, errorMsg: null, CF : cf })
}


export const rateActivitySuccess = (state, action) => {
  const { rate, id } = action
  
  let temp={}
  Object.keys(state.activityDetailData).map(function(key, index) {
    if(key== 'rating'){
      temp[key] = rate
    }
    else{
      temp[key] = state.activityDetailData[key]
    }
  });
  
  let _temp = []
  Array.prototype.forEach.call(state.activityTotalData, element => {
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
  return state.merge({ fetching: false, error: null, activityDetailData: temp,activityTotalData: _temp, errorMsg: null, CF : cf })
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
  [Types.ACTIVITY_FAILURE]: failure,
  [Types.SAVE_ACTIVITY_TOTAL]: request,
  [Types.SAVE_SUCCESS]: saveSuccess,
  [Types.DELETE_SUCCESS]: deleteSuccess,
  [Types.LOAD_ACTIVITY_SUCCESS]: loadTotalSuccess,
  [Types.GET_SAVED_ACTIVITY_DETAIL]: request,
  [Types.LOAD_DETAIL_SUCCESS]: loadDetailSuccess,
  [Types.SET_ACTIVITY_RATE]: _request,
  [Types.RATE_ACTIVITY_SUCCESS]: rateActivitySuccess,
})
