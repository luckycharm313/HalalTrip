
import { call, put } from 'redux-saga/effects'
import {AsyncStorage} from 'react-native'
import PlaceActions from '../Redux/PlaceRedux'
// import { PlaceSelectors } from '../Redux/PlaceRedux'
import { NavigationActions } from 'react-navigation';

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
      
      const res = yield call(api._getRestaurantByPlace, param, token)
      console.log("place restaurant response => ", res)
      if(res.ok){
        const { data, code, message } = res.data
        if(code == 'success'){
          const resTourist = yield call(api._getTouristByPlace, param, token)
          console.log("place tourist response => ", resTourist)
          if(resTourist.ok){
            const { data, code, message } = resTourist.data
            
            if(code == 'success'){
                yield put(PlaceActions.placeCategorySuccess(response.data.data, res.data.data, data))
            }
            else{
              alert(message)
              yield put(PlaceActions.placeFailure(message))
              return   
            }
          }
          else{
            yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
          }          
        }
        else{
          alert(message)
          yield put(PlaceActions.placeFailure(message))
          return    
        }
      }
      else{
        yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
        // alert("Network Error")
        // yield put(PlaceActions.placeFailure("Network Error"))
        // return    
      }
    }
    else{
      alert(message)
      yield put(PlaceActions.placeFailure(message))
      return
    }
    
  } else {
    yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    // yield put(PlaceActions.placeFailure("Network Error"))
    // return
  }
}
export function * getRestaurantPlace (api, action) {
  const {placeId } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  let param = new FormData();
  param.append("placeId", placeId)
  
  const response = yield call(api._getRestaurantByPlace, param, token)

  console.log("get restaurant place response=>", response)
  if(response.ok){
    const { data, code, message } = response.data
    if(code == 'success'){
      yield put(PlaceActions.placeRestaurantSuccess(data))
    }
    else{
      alert(message)
      yield put(PlaceActions.placeFailure(message))
      return    
    }
  }
  else{
    yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    // alert("Network Error")
    // yield put(PlaceActions.placeFailure("Network Error"))
    // return    
  }
}