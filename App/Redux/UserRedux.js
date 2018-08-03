import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userLogin: ['email', 'password'],
  userSignup: ['username', 'email', 'password'],
  userGoogleSignup : null,
  userSuccess: ['payload'],
  userRegister: null,
  userFailure: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userData: null,
  error: null,
  isRegistered : null
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
export const request = (state, action) => state.merge({error : null, isRegistered : null})

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ error: null, userData : payload, isRegistered : null })
}

export const register = (state, action) => {
  return state.merge({ error: null, isRegistered : true })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ error: true, isRegistered: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGIN]: request,
  [Types.USER_SIGNUP]: request,
  [Types.USER_GOOGLE_SIGNUP]: request,
  [Types.USER_REGISTER]: register,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
})
