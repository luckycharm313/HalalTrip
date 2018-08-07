
import { call, put } from 'redux-saga/effects'
import {AsyncStorage} from 'react-native'
import PlaceActions from '../Redux/PlaceRedux'
// import { PlaceSelectors } from '../Redux/PlaceRedux'

export function * getHotelByPlace (api, action) {
  const { placeId } = action
  
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  let param = new FormData();
  param.append("placeId", placeId)
  const response = yield call(api._getHotelByPlace, param, token)

  console.log("place response => ", response)
  if (response.ok) {
    const { data, code, message } = response.data    
    if(code == 'success'){
      
      yield put(PlaceActions.placeCategorySuccess(data))
    }
    else{
      yield put(PlaceActions.placeFailure(message))
      return
    }
    
  } else {
    yield put(PlaceActions.placeFailure("Network Error"))
    return
  }
}
