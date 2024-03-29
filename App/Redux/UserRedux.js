import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userLogin: ['email', 'password'],
  userSignup: ['username', 'email', 'password'],
  userGoogleSignup : null,
  userFacebookSignup : null,
  userSuccess: ['payload'],
  userRegister: null,
  userFailure: null,
  logOut : null,
  loadProfile : null,
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userData: null,
  error: null,
  isRegistered : null,
  fetching : null,
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getData: state => state.userData
}

/* ------------- Reducers ------------- */
export const request = (state, action) => state.merge({error : null, isRegistered : null, fetching: true,})

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ error: null, userData : payload, isRegistered : null, fetching: false, })
}

export const register = (state, action) => {
  return state.merge({ error: null, isRegistered : true, fetching: false, })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ error: true, isRegistered: null, fetching: false, })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGIN]: request,
  [Types.USER_SIGNUP]: request,
  [Types.USER_GOOGLE_SIGNUP]: request,
  [Types.USER_FACEBOOK_SIGNUP]: request,
  [Types.USER_REGISTER]: register,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.LOG_OUT]: request,
  [Types.LOAD_PROFILE]: request,
})
