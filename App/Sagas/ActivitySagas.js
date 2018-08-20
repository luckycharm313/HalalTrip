import { call, put } from 'redux-saga/effects'
import ActivityActions from '../Redux/ActivityRedux'
import {AsyncStorage} from 'react-native'

export function * getActivityDetail (api, action) {
  const { activityId } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  
  let param = new FormData();
  param.append("activityId", activityId)

  const response = yield call(api._getActivityDetail, param, token)

  console.log(" activity response=>", response)
  
  // success?
  if (response.ok) {
    const { data, code, message } = response.data 

    if(code == 'success'){
      yield put(ActivityActions.detailSuccess(data))
    }
    else{
      alert(message)
      yield put(ActivityActions.activityFailure(message))
      return    
    }
    
  } else {
    alert("Internet Error")
    yield put(ActivityActions.activityFailure())
  }
}
