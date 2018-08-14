
import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { path } from 'ramda'
import {AsyncStorage, Platform} from 'react-native'
import { NavigationActions } from 'react-navigation';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export function * signUp (api, action) {
  const { username, email, password } = action
  const response = yield call(api._signUp, username, email, password)
  
  if (response.ok) {
    yield put(UserActions.userRegister())
  } else {
    yield put(UserActions.userFailure())
  }
}

export function * signUpWithGoogle (api, action) {

  try {
    yield GoogleSignin.hasPlayServices({ autoResolve: true });  
  } catch (error) {
    yield put(UserActions.userFailure())
    return
  }
  
  try {
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: "738581788549-32gb3hbo5atr0o8nqppbu1ej5amc3b9p.apps.googleusercontent.com",
        },
        android: {},
      }),
    }

    yield GoogleSignin.configure({
      ...configPlatform,
      // webClientId: config.webClientId,
      offlineAccess: false,
    })  
  } catch (error) {
    yield put(UserActions.userFailure())
    return
  }
  
  try {      
    const user = yield GoogleSignin.signIn();
    const {email, name, accessToken} = user
    console.log("google signin data => ", user)
    console.log("google signin email => ", email)
  } catch (error) {
    yield put(UserActions.userFailure())
    return
  }
}

export function * logIn (api, action) {
  const { email, password } = action
  const response = yield call(api._logIn, email, password)
  
  console.log('signin response => ', response)
  
  // success?
  if (response.ok) {
    const temp = path(['data'], response)
    
    const {token} = temp
    /*** store token in server */
    let push_token = ''
        
    let param = new FormData();
    param.append("user_email", email)
    param.append("user_token", token)
    param.append("user_push_token", push_token)
    
    const res = yield call(api._registerToken, param)
    /** end store token in server **/ 

    if (res.ok) {
      try {
        yield AsyncStorage.setItem('token', JSON.stringify(token))        
      } catch (error) {
        yield put(UserActions.userFailure())  
      }
  
      yield put(UserActions.userSuccess(temp))
      yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
    }
    else{
      yield put(UserActions.userFailure())
    }
    
  } else {
    yield put(UserActions.userFailure())
  }
}

export function * logout (api, action) {
  const token = yield AsyncStorage.clear()
  yield put(NavigationActions.navigate({ routeName: 'LaunchScreen'} ));
}