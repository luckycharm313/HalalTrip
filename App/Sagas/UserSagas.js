
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

import StartupActions from '../Redux/StartupRedux'

export function * signUp (api, action) {
  
  yield put(StartupActions.loadBar())

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
    console.log("sdfsdf ", response)
    if (response.ok) {
      yield put(UserActions.userRegister())
      yield put(StartupActions.loadBarSuccess("isload"))
    } else {
      const {error} = response.data
      yield put(StartupActions.loadBarSuccess("isload"))
      alert(error)
      yield put(UserActions.userFailure())
      return
    }
  }
  else{
    yield put(StartupActions.loadBarSuccess("isload"))
    alert("Network error")
    yield put(UserActions.userFailure())
  }
}

export function * signUpWithGoogle (api, action) {
  yield put(StartupActions.loadBar())

  try {
    yield GoogleSignin.hasPlayServices();
  } catch (error) {
    yield put(StartupActions.loadBarSuccess("isload"))
    yield put(UserActions.userFailure())
    alert("GoogleSignin error")
    return
  }
  
  try {
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: "410347491994-esl2ihfers241pcr1kuqvmh3ujvldos8.apps.googleusercontent.com",
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
    yield put(StartupActions.loadBarSuccess("isload"))
    alert("GoogleSignin error")
    yield put(UserActions.userFailure())
    return
  }
  try {      
    
    const userData = yield GoogleSignin.signIn();
    console.log("userData", userData)
    const {accessToken, user} = userData
    const {email, name, photo } = user
    console.log("google signin data => ", userData)
    console.log("google signin accessToken => ", accessToken)
    console.log("google signin email => ", email)
    let push_token = ''

    // let param = new FormData();
    // param.append("user_email", email)
    // param.append("user_token", accessToken)
    // param.append("user_push_token", push_token)
    
    // const res = yield call(api._socialRegister, param)

    const resNonce = yield call(api._getNonce)
    const { nonce } = resNonce.data

    let param = new FormData();
    param.append("insecure", "cool")
    param.append("nonce", nonce)
    param.append("email", email)
    param.append("username", email)
    param.append("display_name", name)
    // param.append("user_pass", 'password')

    const res = yield call(api._signUp, param)

    console.log("google signin server register => ", res)
    
    // if (res.ok) {
      // const { data, code, message } = res.data
      
      // if(code == 'success'){
        try {
          yield AsyncStorage.setItem('token', JSON.stringify(accessToken))        
        } catch (error) {
          yield put(UserActions.userFailure())  
        }

        let _temp = {
          email : email,
          displayname : name,
          avatar : photo,
          token : accessToken
        }

        try {
          yield AsyncStorage.setItem('user_profile', JSON.stringify(_temp))        
        } catch (error) {
          yield put(StartupActions.loadBarSuccess("isload"))
          yield put(UserActions.userFailure())  
        }

        yield put(StartupActions.loadBarSuccess("isload"))
        yield put(UserActions.userSuccess(_temp))
        yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
      // }
      // else{
      //   yield put(StartupActions.loadBarSuccess("isload"))
      //   alert("GoogleSignin Error")
      //   yield put(UserActions.userFailure())
      //   return
      // }
    // } else {
    //   yield put(StartupActions.loadBarSuccess("isload"))
    //   alert("GoogleSignin error")
    //   yield put(UserActions.userFailure())
    //   return
    // }

  } catch (error) {
    yield put(StartupActions.loadBarSuccess("isload"))
    alert("Google Sign in Failure")
    yield put(UserActions.userFailure())
    return
  }
}

export function * signUpWithFacebook (api, action) {
  yield put(StartupActions.loadBar())

  let _result = yield LoginManager.logInWithReadPermissions(['public_profile','email'])
  
  if (_result.isCancelled) {
    yield put(StartupActions.loadBarSuccess("isload"))
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
    param.append("access_token", accessToken)
    param.append("insecure", "cool")
    // param.append("user_email", temp.email)
    // param.append("user_token", accessToken)
    // param.append("user_push_token", push_token)
    
    const res = yield call(api._fbRegister, param)
    if (res.ok) {
      const {msg, wp_user_id } = res.data
      
      if(wp_user_id){
        try {
          yield AsyncStorage.setItem('token', JSON.stringify(accessToken))        
        } catch (error) {
          yield put(StartupActions.loadBarSuccess("isload"))
          yield put(UserActions.userFailure())  
        }

        let _temp = {
          email : temp.email,
          displayname : temp.name,
          avatar : url,
          token : accessToken
        }
        console.log("_temp ", _temp)
        try {
          yield AsyncStorage.setItem('user_profile', JSON.stringify(_temp))        
        } catch (error) {
          yield put(StartupActions.loadBarSuccess("isload"))
          yield put(UserActions.userFailure())  
        }

        yield put(StartupActions.loadBarSuccess("isload"))
        yield put(UserActions.userSuccess(_temp))
        yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
      }
      else{
        yield put(StartupActions.loadBarSuccess("isload"))
        alert(msg)
        yield put(UserActions.userFailure())
        return
      }
    } else {
      yield put(StartupActions.loadBarSuccess("isload"))
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
            yield put(StartupActions.loadBarSuccess("isload"))
            alert(error)
            yield put(UserActions.userFailure())
            return
          }

          try {
            yield AsyncStorage.setItem('user_profile', JSON.stringify(temp.user))        
          } catch (error) {
            yield put(StartupActions.loadBarSuccess("isload"))
            yield put(UserActions.userFailure())  
          }

          yield put(StartupActions.loadBarSuccess("isload"))
          yield put(UserActions.userSuccess(temp.user))
          yield put(NavigationActions.navigate({ routeName: 'mainNavigator'} ));
        }
        else{
          yield put(StartupActions.loadBarSuccess("isload"))
          alert("login error")
          yield put(UserActions.userFailure())
          return
        }
      }
      else{
        yield put(StartupActions.loadBarSuccess("isload"))
        alert("Invaild username and password")
        return
      }
    } else {
      yield put(StartupActions.loadBarSuccess("isload"))
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

export function * loadProfile (api, action) {
  const user_profile = JSON.parse(yield AsyncStorage.getItem('user_profile'))
  console.log(" user_profile", user_profile)
  yield put(UserActions.userSuccess(user_profile))
}