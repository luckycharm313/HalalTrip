import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  receivedNotification:['notification'],
  startupSuccess: ['payload'],
  startupFailure: ['errorMsg'],
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  payload : null,
  error: null,
  fetching : null,
  errorMsg : null,
  notifications : null,
})

/* ------------- Selectors ------------- */

export const MainSelectors = {
  getData: state => state.payload
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => state.merge({error : null, fetching : true, errorMsg : null})

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ notifications: payload, error: null, errorMsg: null })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { errorMsg } = action
  return state.merge({ fetching: false, error: true, errorMsg })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECEIVED_NOTIFICATION]: request,
  [Types.STARTUP_SUCCESS]: success,
  [Types.STARTUP_FAILURE]: failure,
})