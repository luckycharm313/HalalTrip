
import { call, put } from 'redux-saga/effects'
import MainActions from '../Redux/MainRedux'
import CategoryActions from '../Redux/CategoryRedux'
import HotelActions from '../Redux/HotelRedux'
// import { MainSelectors } from '../Redux/MainRedux'

export function * loadData (api, action) {
  
  /** Category part **/
  const responseCategory = yield call(api._getCategory)
  
  // success?
  if (responseCategory.ok) {
    const { data, code, message } = responseCategory.data
    console.log("responseCategory = > ", responseCategory)
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

  /*** Hotel part **/
  const responseHotel = yield call(api._getHotel)
  
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
  //const responseHotel = yield call(api._getCategory)
  yield put(MainActions.mainSuccess())
}
