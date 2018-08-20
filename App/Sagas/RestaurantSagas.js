import {AsyncStorage} from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import RestaurantActions from '../Redux/RestaurantRedux'
import HotelActions from '../Redux/HotelRedux'
import ActivityActions from '../Redux/ActivityRedux'
// import { RestaurantSelectors } from '../Redux/RestaurantRedux'
import {
  insertNewResTotal, 
  querySelectResTotal, 
  deleteResTotal,
  deletePlace,
  queryAllResTotal,

  insertNewResDetail,
  deleteResDetail,
  querySelectResDetail,

  queryAllHotelTotal,
  queryAllActivityTotal,
} from '../../databases/allSchemas'

export function * loadRestaurantData (api, action) {
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  
  const responseCuisine = yield call(api._getCuisine, token)

  console.log(" response cuisine => ", responseCuisine)
  // success?
  if (responseCuisine.ok) {
    const { data, code, message } = responseCuisine.data    
    if(code == 'success'){
      yield put(RestaurantActions.cuisineSuccess(data))
    }
    else{
      yield put(RestaurantActions.restaurantFailure(message))
      return
    }
    
  } else {
    yield put(RestaurantActions.restaurantFailure("Internet Error"))
    return
  }

  const responseRestaurant = yield call(api._getRestaurant, token)
  console.log(" response restaurant => ", responseRestaurant)

  // success?
  if (responseRestaurant.ok) {
    const { data, code, message } = responseRestaurant.data    
    if(code == 'success'){
      yield put(RestaurantActions.restaurantSuccess(data))
    }
    else{
      yield put(RestaurantActions.restaurantFailure(message))
      return
    }
    
  } else {
    yield put(RestaurantActions.restaurantFailure("Internet Error"))
    return
  }
}

export function * getRestaurantDetail (api, action) {

  const {restaurantId } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  const globalState = yield select()
  const restaurantRedux = globalState.restaurant
  const restaurantData = restaurantRedux.restaurantData

  let param = new FormData();
  param.append("restaurantId", restaurantId)
  
  const responseDetail = yield call(api._getRestaurantDetail, param, token)
  console.log("restaurant detail data =>", responseDetail);
  if (responseDetail.ok) {
    const { data, code, message } = responseDetail.data    
    if(code == 'success'){

      const _similarIds = data.similarIds ? data.similarIds:[]
      let temp = []
      restaurantData.forEach(item => {
        _similarIds.forEach(element => {
          element.forEach(_element => {
            if(item.id == _element.object_id){          
              temp.push(item)
            }  
          })
        })
      })
            
      yield put(RestaurantActions.detailSuccess(data, temp))
    }
    else{
      yield put(RestaurantActions.restaurantFailure(message))
      return
    }
    
  } else {
    yield put(RestaurantActions.restaurantFailure("Internet Error"))
    return
  }

}

export function * saveRestaurantTotal (api, action) {

  const {data } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  const { id, img_url, location, placeName, rating, street_lat, street_lng, title } = data
  let _data = {...data,  'rating' : rating == null ? "" : rating}

  const queryResult = yield querySelectResTotal(" id ='"+id+"'")
  
  
  if(queryResult.length == 0){
    let param = new FormData();
    param.append("restaurantId", id)
    
    const responseDetail = yield call(api._getRestaurantDetail, param, token)
    if (responseDetail.ok) {
      const { data, code, message } = responseDetail.data    
      if(code == 'success'){
        const queryDetailResult = yield querySelectResDetail(" id ='"+data.id+"'")

        if(queryDetailResult.length == 0){
          const { rating } = data
          let __data = {...data,  'rating' : rating == null ? "" : rating}
          const savedDetail = yield insertNewResDetail(__data)             
        }
        const savedData = yield insertNewResTotal(_data)              
        
        yield put(RestaurantActions.saveSuccess(savedData.id))
      }
      else{
        yield put(RestaurantActions.restaurantFailure(message))
        return
      }
      
    } else {
      yield put(RestaurantActions.restaurantFailure("Internet Error"))
      return
    }
  }else{
    const deletedPlace = yield deletePlace(id)
    const deletedResult = yield deleteResTotal(id)
    const deletedDetailResult = yield deleteResDetail(id)
    
    yield put(RestaurantActions.deleteSuccess(id))
  }
}

export function * loadSavedData (api, action) {

  const _allResTotal = yield queryAllResTotal()
  const allResTotal = Array.from(_allResTotal)
  console.log(" all Res Total =>", allResTotal)
  yield put(RestaurantActions.loadTotalSuccess(allResTotal))
  
  const _allHotelTotal = yield queryAllHotelTotal()
  const allHotelTotal = Array.from(_allHotelTotal)
  console.log(" all Hotel Total =>", allHotelTotal)
  yield put(HotelActions.loadHotelSuccess(allHotelTotal))

  const _allActivityTotal = yield queryAllActivityTotal()
  const allActivityTotal = Array.from(_allActivityTotal)
  console.log(" all Activity Total =>", allActivityTotal)
  yield put(ActivityActions.loadActivitySuccess(allActivityTotal))
}

export function * getSavedDetail (api, action) {
  const {restaurantId } = action
  const _allResDetail = yield querySelectResDetail(" id ='"+restaurantId+"'")
  const allResDetail = Array.from(_allResDetail)
  if(allResDetail.length > 0){
    console.log(" all Res detail =>", allResDetail[0])
    yield put(RestaurantActions.loadDetailSuccess(allResDetail[0]))
  }
  else{
    yield put(RestaurantActions.restaurantFailure("Data doesn't exist!"))
  }  
}