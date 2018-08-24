import { call, put } from 'redux-saga/effects'
import ActivityActions from '../Redux/ActivityRedux'
import {AsyncStorage} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

import {
  insertNewActivityTotal,
  deleteActivityTotal,
  queryAllActivityTotal,
  querySelectActivityTotal,

  insertNewActivityDetail,
  deleteActivityDetail,
  querySelectActivityDetail,
} from '../../databases/allSchemas'

import StartupActions from '../Redux/StartupRedux'

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

export function * saveActivityTotal (api, action) {
  yield put(StartupActions.loadBar())

  const {data } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  const { id, rating, location, street_lat, street_lng, img_url } = data
  let imgPath = ""
  if(img_url != "" && img_url != null ){ 
    const resPath = yield RNFetchBlob.config({
      fileCache : true,
      appendExt : 'png'
    })
    .fetch('GET', img_url, {
      Authorization : `Bearer ${token}`,
    })

    imgPath = resPath.path()
  }

  let _data = {
    ...data,  
    'rating' : rating == null ? "" : rating,
    'location' : location == null ? "" : location, 
    'street_lat' : street_lat == null ? "" : street_lat, 
    'street_lng' : street_lng == null ? "" : street_lng, 
    'img_url' : imgPath
  }

  const queryResult = yield querySelectActivityTotal(" id ='"+id+"'")
  
  
  if(queryResult.length == 0){
    let param = new FormData();
    param.append("activityId", id)
    
    const responseDetail = yield call(api._getActivityDetail, param, token)
    if (responseDetail.ok) {
      const { data, code, message } = responseDetail.data    
      if(code == 'success'){
        console.log(" datail data =>", data)
        const queryDetailResult = yield querySelectActivityDetail(" id ='"+data.id+"'")

        if(queryDetailResult.length == 0){
          const { rating, detailImages, location, street_lat, street_lng, img_url } = data
          
          let mainImgPath = ""
          if(img_url != "" && img_url != null ){ 
            const _mainImgPath = yield RNFetchBlob.config({
              fileCache : true,
              appendExt : 'png'
            })
            .fetch('GET', img_url, {
              Authorization : `Bearer ${token}`,
            })
          
            mainImgPath = _mainImgPath.path()
          }          

          let _detailImages = []
          for(let i=0 ; i < detailImages.length ; i++)
          {
            if(detailImages[i] != "" && detailImages[i] != null ){              
              const res_Path = yield RNFetchBlob.config({
                fileCache : true,
                appendExt : 'png'
              })
              .fetch('GET', detailImages[i], {
                Authorization : `Bearer ${token}`,
              })
              _detailImages.push(res_Path.path())
            }
          }

          let __data = {
            ...data,  
            'rating' : rating == null ? "" : rating, 
            'location' : location == null ? "" : location, 
            'street_lat' : street_lat == null ? "" : street_lat, 
            'street_lng' : street_lng == null ? "" : street_lng, 
            'detailImages': JSON.stringify(_detailImages),
            'img_url' : mainImgPath
          }
          const savedDetail = yield insertNewActivityDetail(__data)             
          console.log(" savedDetail data =>",savedDetail)
        }
        const savedData = yield insertNewActivityTotal(_data)              
        
        yield put(ActivityActions.saveSuccess(savedData.id))
        yield put(StartupActions.loadBarSuccess("isload"))
      }
      else{
        yield put(StartupActions.loadBarSuccess("isload"))
        alert(message)
        yield put(ActivityActions.activityFailure(message))
        return
      }
      
    } else {
      yield put(StartupActions.loadBarSuccess("isload"))
      alert("Internet Error")
      yield put(ActivityActions.activityFailure("Internet Error"))
      return
    }
  }else{
    const deletedResult = yield deleteActivityTotal(id)    
    yield put(ActivityActions.deleteSuccess(id))
    yield put(StartupActions.loadBarSuccess("isload"))
  }
}

export function * getSavedActivityDetail (api, action) {
  const { activityId } = action
  const _allActivityDetail = yield querySelectActivityDetail(" id ='"+activityId+"'")
  const allActivityDetail = Array.from(_allActivityDetail)
  if(allActivityDetail.length > 0){
    console.log(" all allactivityDetail =>", allActivityDetail[0])
    yield put(ActivityActions.loadDetailSuccess(allActivityDetail[0]))
  }
  else{
    yield put(ActivityActions.activityFailure("Data doesn't exist!"))
  }
}