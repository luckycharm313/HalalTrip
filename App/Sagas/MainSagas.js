
import { call, put } from 'redux-saga/effects'
import MainActions from '../Redux/MainRedux'
import CategoryActions from '../Redux/CategoryRedux'
import HotelActions from '../Redux/HotelRedux'
import PlaceActions from '../Redux/PlaceRedux'
import ActivityActions from '../Redux/ActivityRedux'
import TrendActions from '../Redux/TrendRedux'
import StartupActions from '../Redux/StartupRedux'
import {AsyncStorage, PermissionsAndroid, Platform} from 'react-native'
// import { MainSelectors } from '../Redux/MainRedux'
import { NavigationActions } from 'react-navigation';
import RNRestart from 'react-native-restart'; 
import I18n from 'react-native-i18n';
import SyncStorage from 'sync-storage';

export function * loadData (api, action) {
  
  yield put(StartupActions.loadBar())
  
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  const lang = JSON.parse(yield AsyncStorage.getItem('lang'))
  let param = new FormData();
  param.append("lang", lang)


  if(Platform.OS == "android"){
    const granted = yield PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'App Storage Read Permission',
          'message': 'App needs access to your storage '
        }
    )
  }
  

  // if (granted === PermissionsAndroid.RESULTS.DENIED) {
  //   alert("Please set storage permission in your app setting")
  // } 
  /** Category part **/
  const responseCategory = yield call(api._getCategory, token)
  
  // success?
  if (responseCategory.ok) {
    const { data, code, message } = responseCategory.data
    
    if(code == 'success'){
      yield put(CategoryActions.categorySuccess(data))
    }
    else{
      yield put(StartupActions.loadBarSuccess("isload"))
      alert(message)
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(StartupActions.loadBarSuccess("isload"))
    // yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    alert("Internet Error")
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }
  
  /*** Hotel part **/
  const responseHotel = yield call(api._getHotel, param, token)
  
  if (responseHotel.ok) {
    const { data, code, message } = responseHotel.data    
    if(code == 'success'){
      yield put(HotelActions.hotelSuccess(data))
    }
    else{
      yield put(StartupActions.loadBarSuccess("isload"))
      alert(message)
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(StartupActions.loadBarSuccess("isload"))
    // yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    alert("Internet Error")
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }
  
  /*** place part **/
  const responsePlace = yield call(api._getPlace, param, token)
  console.log(" responsePlace => ", responsePlace)
  if (responsePlace.ok) {
    const { data, code, message } = responsePlace.data    
    if(code == 'success'){
      yield put(PlaceActions.placeSuccess(data))
    }
    else{
      yield put(StartupActions.loadBarSuccess("isload")) 
      alert(message)
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(StartupActions.loadBarSuccess("isload"))
    // yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    alert("Internet Error")
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }
  
  /*** activity part **/
  const responseActivity = yield call(api._getActivity, param, token)
  console.log(" responseActivity => ", responseActivity)
  if (responseActivity.ok) {
    const { data, code, message } = responseActivity.data    
    if(code == 'success'){
      yield put(ActivityActions.activitySuccess(data))
    }
    else{
      yield put(StartupActions.loadBarSuccess("isload"))
      alert(message)
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(StartupActions.loadBarSuccess("isload"))
    // yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    alert("Internet Error")
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }
  
  /*** trend part **/
  const responseTrend = yield call(api._getTrend, param, token)
  console.log("response Trend ", responseTrend)
  if (responseTrend.ok) {
    const { data, code, message } = responseTrend.data    
    if(code == 'success'){
      yield put(TrendActions.trendSuccess(data))
    }
    else{
      yield put(StartupActions.loadBarSuccess("isload"))
      alert(message)
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(StartupActions.loadBarSuccess("isload"))
    // yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    alert("Internet Error")
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }

  yield put(MainActions.mainSuccess())
  
  yield put(StartupActions.loadBarSuccess("isload"))
}

export function * setLanguage (api, action) {
  const { lang } = action
  // yield SyncStorage.set('language', lang);
  try {
    yield AsyncStorage.setItem('lang', JSON.stringify(lang))   
    // I18n.locale = lang; 
    yield put(MainActions.langSuccess(lang))
    RNRestart.Restart(); 
      
  } catch (error) {
    yield put(MainActions.mainFailure())
  }
} 

export function * preLoad (api, action) {
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  const lang = JSON.parse(yield AsyncStorage.getItem('lang'))
  
  let _lang = lang
  
  if(lang === null){
    _lang = "th"
    try {
      yield AsyncStorage.setItem('lang', JSON.stringify("th"))
      
    } catch (error) {
      yield put(MainActions.mainFailure())
    }
  }

  console.log(' locale set => ', _lang)
  
  // I18n.locale = _lang;

  if(token !== null){
    yield put(NavigationActions.navigate({ routeName: 'HomeScreen'} ));
  }
}

export function * loadLanguage (api, action) {
  const lang = JSON.parse(yield AsyncStorage.getItem('lang'))
  yield put(MainActions.langSuccess(lang))
}