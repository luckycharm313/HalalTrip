
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
  const resNonce = yield call(api._getNonce)
  console.log("resNonce => ", resNonce)
  if(resNonce.ok){
    const { nonce } = resNonce.data

    let param = new FormData();
    param.append("insecure", "cool")
    param.append("nonce", nonce)
    param.append("email", email)
    param.append("username", username)
    param.append("display_name", username)
    param.append("user_pass", password)

    const response = yield call(api._signUp, param)
  
    if (response.ok) {
      yield put(UserActions.userRegister())
    } else {
      alert("sign up error")
      yield put(UserActions.userFailure())
    }
  }
  else{
    alert("sign up error")
    yield put(UserActions.userFailure())
  }
}

export function * signUpWithGoogle (api, action) {

  try {
    yield GoogleSignin.hasPlayServices();
  } catch (error) {
    yield put(UserActions.userFailure())
    alert("GoogleSignin error")
    return
  }
  
  try {
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: "410347491994-njmd69f4l7v5kcmhmqu57pv18rj13sn8.apps.googleusercontent.com",
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
    alert("GoogleSignin error")
    yield put(UserActions.userFailure())
    return
  }
  try {      
    
    const userData = yield GoogleSignin.signIn();
    
    const {accessToken, user} = userData
    const {email, name } = user
    console.log("google signin data => ", userData)
    console.log("google signin accessToken => ", accessToken)
    console.log("google signin email => ", email)
    let push_token = ''

    let param = new FormData();
    param.append("user_email", email)
    param.append("user_token", accessToken)
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
      alert("GoogleSignin error")
      yield put(UserActions.userFailure())
      return
    }

  } catch (error) {
    console.log("error", error)
    alert(error)
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
    const { id } = temp
    let photourl =  yield fetch(`https://graph.facebook.com/${id}/picture?width=150&height=150`)
    const { url } = photourl
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
          email : temp.email,
          displayname : temp.name,
          avatar : url,
          token : accessToken
        }
        console.log("_temp ", _temp)
        yield put(UserActions.userSuccess(_temp))
        yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
      }
      else{
        alert("Facebook error")
        yield put(UserActions.userFailure())
        return
      }
    } else {
      alert("Facebook error")
      yield put(UserActions.userFailure())
      return
    }
  }
}

export function * logIn (api, action) {
  const { email, password } = action
  const resNonce = yield call(api._getNonce)
  console.log("resNonce => ", resNonce)
  if(resNonce.ok){
    const { nonce } = resNonce.data
    let param = new FormData();
    param.append("insecure", "cool")
    param.append("nonce", nonce)
    param.append("username", email)
    param.append("password", password)


    const response = yield call(api._logIn, param)
    console.log("res login ", response)
    // success?
    if (response.ok) {
      const temp = path(['data'], response)
      
      const {cookie, status} = temp

      if(status == "ok"){
        /*** store token in server */
        let push_token = ''
                  
        let param = new FormData();
        param.append("user_email", email)
        param.append("user_token", cookie)
        param.append("user_push_token", push_token)
        
        const res = yield call(api._registerToken, param)
        /** end store token in server **/ 
        console.log(" login response ", res)
        if (res.ok) {
          try {
            yield AsyncStorage.setItem('token', JSON.stringify(cookie))        
          } catch (error) {
            alert(error)
            yield put(UserActions.userFailure())
            return
          }
          yield put(UserActions.userSuccess(temp.user))
          yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
        }
        else{
          alert("login error")
          yield put(UserActions.userFailure())
          return
        }
      }
      else{
        alert("Invaild username and password")
        return
      }
    } else {
      alert("login error")
      yield put(UserActions.userFailure())
      return
    }

  }
  else{
    alert("login error")
    yield put(UserActions.userFailure())
    return
  }
}

export function * logout (api, action) {
  const token = yield AsyncStorage.clear()
  yield put(NavigationActions.navigate({ routeName: 'LaunchScreen'} ));
}