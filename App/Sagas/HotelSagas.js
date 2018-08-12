import { call, put } from 'redux-saga/effects'
import HotelActions from '../Redux/HotelRedux'
import {AsyncStorage} from 'react-native'
// import { HotelSelectors } from '../Redux/HotelRedux'
import {
  insertNewHotelTotal,
  deleteHotelTotal,
  queryAllHotelTotal,
  querySelectHotelTotal,

  insertNewHotelDetail,
  deleteHotelDetail,
  querySelectHotelDetail,
} from '../../databases/allSchemas'

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

export function * saveHotelTotal (api, action) {

  const {data } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  const { id, rating } = data
  let _data = {...data,  'rating' : rating == null ? "" : rating}

  const queryResult = yield querySelectHotelTotal(" id ='"+id+"'")
  
  
  if(queryResult.length == 0){
    let param = new FormData();
    param.append("hotelId", id)
    
    const responseDetail = yield call(api._getHotelDetail, param, token)
    if (responseDetail.ok) {
      const { data, code, message } = responseDetail.data    
      if(code == 'success'){
        console.log(" datail data =>", data)
        const queryDetailResult = yield querySelectHotelDetail(" id ='"+data.id+"'")

        if(queryDetailResult.length == 0){
          const { rating, amenity, detailImages } = data
          let __data = {...data,  'rating' : rating == null ? "" : rating, 'amenity' : JSON.stringify(amenity), 'detailImages': JSON.stringify(detailImages)}
          const savedDetail = yield insertNewHotelDetail(__data)             
          console.log(" savedDetail data =>",savedDetail)
        }
        const savedData = yield insertNewHotelTotal(_data)              
        
        yield put(HotelActions.saveSuccess(savedData.id))
      }
      else{
        yield put(HotelActions.hotelFailure(message))
        return
      }
      
    } else {
      yield put(HotelActions.hotelFailure("Internet Error"))
      return
    }
  }else{
    const deletedResult = yield deleteHotelTotal(id)    
    yield put(HotelActions.deleteSuccess(id))
  }

}

export function * getSavedHotelDetail (api, action) {
  const { hotelId } = action
  const _allHotelDetail = yield querySelectHotelDetail(" id ='"+hotelId+"'")
  const allHotelDetail = Array.from(_allHotelDetail)
  if(allHotelDetail.length > 0){
    console.log(" all allHotelDetail =>", allHotelDetail[0])
    yield put(HotelActions.loadDetailSuccess(allHotelDetail[0]))
  }
  else{
    yield put(HotelActions.restaurantFailure("Data doesn't exist!"))
  }
}