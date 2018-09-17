import { call, put, select } from 'redux-saga/effects'
import SearchActions from '../Redux/SearchRedux'
import {AsyncStorage, PermissionsAndroid, Platform} from 'react-native'
import { NavigationActions } from 'react-navigation';
import StartupActions from '../Redux/StartupRedux'
export function * getSearch (api, action) {

  const { data } = action
  // get current data from Store
  // const currentData = yield select(SearchSelectors.getData)
  // make the call to the api
  const response = yield call(api.getsearch, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(SearchActions.searchSuccess(response.data))
  } else {
    yield put(SearchActions.searchFailure())
  }
}


export function * searchData (api, action) {
  yield put(StartupActions.loadBar())

  const {searchKey} = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  let param = new FormData();
  param.append("searchKey", searchKey)

  const response = yield call(api._searchData, param, token)
  console.log("search Result => ", response)
  
  // success?
  if (response.ok) {
    const { data, code, message } = response.data
    if(code == 'success'){
      yield put(SearchActions.searchSuccess(data))
      
      yield put(StartupActions.loadBarSuccess("isload"))

      yield put(NavigationActions.navigate({ routeName: 'SearchResultScreen'} ));
    }
    else{
      yield put(StartupActions.loadBarSuccess("isload"))
      alert(message)
      yield put(SearchActions.searchFailure())
    }
    
  } else {
    yield put(StartupActions.loadBarSuccess("isload"))
    alert("Network Error")
    yield put(SearchActions.searchFailure())
  }
}