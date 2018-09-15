import { call, put } from 'redux-saga/effects'
import TouristActions from '../Redux/TouristRedux'
// import { TouristSelectors } from '../Redux/TouristRedux'
import {AsyncStorage, PermissionsAndroid, Platform} from 'react-native'
import { NavigationActions } from 'react-navigation';

export function * getTourist (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(TouristSelectors.getData)
  // make the call to the api
  const response = yield call(api.gettourist, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(TouristActions.touristSuccess(response.data))
  } else {
    yield put(TouristActions.touristFailure())
  }
}

export function * loadTouristData (api, action) {
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  
  const response = yield call(api._getTourist, token)

  console.log(" response Tourist => ", response)
  // success?
  if (response.ok) {
    const { data, code, message } = response.data    
    if(code == 'success'){
      yield put(TouristActions.touristSuccess(data))
    }
    else{
      alert(message)
      yield put(TouristActions.touristFailure(message))
      return
    }
    
  } else {
    yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
  }
}

export function * getTouristDetail (api, action) {
  if(Platform.OS == "android"){
    const granted = yield PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'App Location Permission',
          'message': 'App needs access to your location '
        }
    )

    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      alert("Please set location permission in your app setting")
      return
    } 
    
    const grantedPhone = yield PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          'title': 'App Phone Call Permission',
          'message': 'App needs access to your phone call '
        }
    )

    if (grantedPhone === PermissionsAndroid.RESULTS.DENIED) {
      alert("Please set phone call permission in your app setting")
      return
    } 
  }

  const {touristId } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  
  let touristData = []
  const response = yield call(api._getTourist, token)
  if (response.ok) {
    const { data, code, message } = response.data    
    if(code == 'success'){
      touristData = data;
    }
    else{
      alert(message)
      yield put(TouristActions.touristFailure(message))
      return
    }
    
  } else {
    yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
  }

  let param = new FormData();
  param.append("touristId", touristId)
  
  const responseDetail = yield call(api._getTouristDetail, param, token)
  console.log("restaurant detail data =>", responseDetail);
  if (responseDetail.ok) {
    const { data, code, message } = responseDetail.data    
    if(code == 'success'){

      const _similarIds = data.similarIds ? data.similarIds:[]
      let temp = []
      touristData.forEach(item => {
        _similarIds.forEach(element => {
          element.forEach(_element => {
            if(item.id == _element.object_id){          
              temp.push(item)
            }  
          })
        })
      })
            
      yield put(TouristActions.detailSuccess(data, temp))
    }
    else{
      alert(message)
      yield put(TouristActions.touristFailure(message))
      return
    }
    
  } else {
    yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
  }

}