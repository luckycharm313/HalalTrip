
import { call, put } from 'redux-saga/effects'
import TrendActions from '../Redux/TrendRedux'
import {AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation';

export function * getTrendDetail (api, action) {
  const { trendId } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))

  let param = new FormData();
  param.append("trendId", trendId)

  const response = yield call(api._getTrendDetail, param, token)

  console.log(" trend detail response=>", response)
  
  // success?
  if (response.ok) {
    const { data, code, message } = response.data 

    if(code == 'success'){
      yield put(TrendActions.detailSuccess(data))
    }
    else{
      alert(message)
      yield put(TrendActions.trendFailure(message))
      return    
    }
    
  } else {
    yield put(NavigationActions.navigate({ routeName: 'ReloadScreen'} ));
    // alert("Internet Error")
    // yield put(TrendActions.trendFailure())
  }
}
