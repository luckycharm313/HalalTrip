import { call, put } from 'redux-saga/effects'
import HotelActions from '../Redux/HotelRedux'
import {AsyncStorage} from 'react-native'
// import { HotelSelectors } from '../Redux/HotelRedux'

export function * loadHotelData (api, action) {
  
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  /*** Hotel part **/
  const responseHotel = yield call(api._getHotel, token)
  
  if (responseHotel.ok) {
    const { data, code, message } = responseHotel.data    
    if(code == 'success'){
      yield put(HotelActions.hotelSuccess(data))

      data.sort(function(a, b) {
          return b.rating - a.rating;
      })
      
      let featuredCategoryId = data[0].id
      let param = new FormData();
      param.append("hotelId", featuredCategoryId)
      const responseHotelDetail = yield call(api._getHotelDetail, param, token)

      if (responseHotelDetail.ok) {
        const { data, code, message } = responseHotelDetail.data 

        if(code == 'success'){
          yield put(HotelActions.hotelDetailSuccess(data))
        }
        else{
          yield put(HotelActions.hotelFailure(message))
          return    
        }
      }
      else{
        yield put(HotelActions.hotelFailure("Internet Error"))
        return    
      }
    }
    else{
      yield put(HotelActions.hotelFailure(message))
      return
    }    
  } else {
    yield put(HotelActions.hotelFailure("Internet Error"))
    return
  }
}

export function * getHotelDetail (api, action) {
  const { hotelId } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  let param = new FormData();
  param.append("hotelId", hotelId)
  const responseHotelDetail = yield call(api._getHotelDetail, param, token)

  if (responseHotelDetail.ok) {
    const { data, code, message } = responseHotelDetail.data 

    if(code == 'success'){
      console.log("hotel detail data =>", data);
      yield put(HotelActions.hotelDetailSuccess(data))
    }
    else{
      yield put(HotelActions.hotelFailure(message))
      return    
    }
  }
  else{
    yield put(HotelActions.hotelFailure("Internet Error"))
    return    
  }
}