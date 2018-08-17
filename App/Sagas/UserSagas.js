
import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { path } from 'ramda'
import {AsyncStorage, Platform} from 'react-native'
import { NavigationActions } from 'react-navigation';
import { GoogleSignin } from 'react-native-google-signin';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} = FBSDK;

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
    yield GoogleSignin.hasPlayServices();
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
    const userData = yield GoogleSignin.signIn();
    const {idToken, user} = userData
    const {email, name } = user
    console.log("google signin data => ", userData)
    console.log("google signin idToken => ", idToken)
    console.log("google signin email => ", email)
    let push_token = ''

    let param = new FormData();
    param.append("user_email", email)
    param.append("user_token", idToken)
    param.append("user_push_token", push_token)
    
    const res = yield call(api._socialRegister, param)

    console.log("google signin server register => ", res)
    
    if (res.ok) {
      const { data, code, message } = res.data
      
      if(code == 'success'){
        try {
          yield AsyncStorage.setItem('token', JSON.stringify(accessToken))        
        } catch (error) {
          yield put(UserActions.userFailure())  
        }

        let _temp = {
          user_email : email,
          user_display_name : name,
          token : idToken
        }
        yield put(UserActions.userSuccess(_temp))
        yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
      }
      else{
        yield put(UserActions.userFailure())
        return
      }
    } else {
      yield put(UserActions.userFailure())
      return
    }

  } catch (error) {
    yield put(UserActions.userFailure())
    return
  }
}

export function * signUpWithFacebook (api, action) {

  let _result = yield LoginManager.logInWithReadPermissions(['public_profile','email'])
  
  if (_result.isCancelled) {
    alert('Login was cancelled');
  } else {
    const data = yield AccessToken.getCurrentAccessToken()
    let accessToken = data.accessToken
    console.log("data ", data)

    let result = yield fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
    let temp = yield result.json()

    console.log("result ", temp)
    
    let push_token = ''
    let param = new FormData();
    param.append("user_email", temp.email)
    param.append("user_token", accessToken)
    param.append("user_push_token", push_token)
    
    const res = yield call(api._socialRegister, param)
    if (res.ok) {
      const { data, code, message } = res.data
      
      if(code == 'success'){
        try {
          yield AsyncStorage.setItem('token', JSON.stringify(accessToken))        
        } catch (error) {
          yield put(UserActions.userFailure())  
        }

        let _temp = {
          user_email : temp.email,
          user_display_name : temp.name,
          token : accessToken
        }
        yield put(UserActions.userSuccess(_temp))
        yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
      }
      else{
        yield put(UserActions.userFailure())
        return
      }
    } else {
      yield put(UserActions.userFailure())
      return
    }
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