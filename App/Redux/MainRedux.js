import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import I18n from 'react-native-i18n';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  mainSuccess: null,
  loadData: null,
  mainFailure: ['errorMsg'],
  setLanguage: ['lang'],
  preLoad: null,
  loadLanguage: null,
  langSuccess: ['data'],
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload : null,
  error: null,
  fetching : null,
  errorMsg : null,
  lang : 0
})

/* ------------- Selectors ------------- */

export const MainSelectors = {
  getData: state => state.payload
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
 return state.merge({error : null, fetching : true, errorMsg : null})
}

// successful api lookup
export const success = (state, action) => {
  return state.merge({ fetching: false, error: null, errorMsg: null})
}

export const langSuccess = (state, action) => {
  const {data} = action
  let index = 0;
  switch(data){
    case "th":
      index= 0
      break;
    case "en":
      index= 1  
      break;
    case "ms":
      index= 2
      break;
  }

  return state.merge({ fetching: false, error: null, errorMsg: null, lang: index})
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { errorMsg } = action
  return state.merge({ fetching: false, error: true, errorMsg })
}
  

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MAIN_SUCCESS]: success,
  [Types.MAIN_FAILURE]: failure,
  [Types.LOAD_DATA]: request,
  [Types.SET_LANGUAGE]: request,
  [Types.PRE_LOAD]: request,
  [Types.LOAD_LANGUAGE]: request,
  [Types.LANG_SUCCESS]: langSuccess,
})
