
import { call, put } from 'redux-saga/effects'
import MainActions from '../Redux/MainRedux'
import CategoryActions from '../Redux/CategoryRedux'
import HotelActions from '../Redux/HotelRedux'
import PlaceActions from '../Redux/PlaceRedux'
import {AsyncStorage} from 'react-native'
// import { MainSelectors } from '../Redux/MainRedux'

export function * loadData (api, action) {
  
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  /** Category part **/
  const responseCategory = yield call(api._getCategory, token)
  
  // success?
  if (responseCategory.ok) {
    const { data, code, message } = responseCategory.data
    
    if(code == 'success'){
      yield put(CategoryActions.categorySuccess(data))
    }
    else{
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }
  console.log(" responseCategory => ", responseCategory)
  /*** Hotel part **/
  const responseHotel = yield call(api._getHotel, token)
  
  if (responseHotel.ok) {
    const { data, code, message } = responseHotel.data    
    if(code == 'success'){
      yield put(HotelActions.hotelSuccess(data))
    }
    else{
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }
  
  /*** place part **/
  const responsePlace = yield call(api._getPlace, token)
  
  if (responsePlace.ok) {
    const { data, code, message } = responsePlace.data    
    if(code == 'success'){
      yield put(PlaceActions.placeSuccess(data))
    }
    else{
      yield put(MainActions.mainFailure(message))
      return
    }
    
  } else {
    yield put(MainActions.mainFailure("Internet Error"))
    return
  }

  yield put(MainActions.mainSuccess())
}
