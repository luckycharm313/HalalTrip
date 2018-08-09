import {AsyncStorage} from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import RestaurantActions from '../Redux/RestaurantRedux'
// import { RestaurantSelectors } from '../Redux/RestaurantRedux'

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
