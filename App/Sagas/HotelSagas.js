import { call, put } from 'redux-saga/effects'
import HotelActions from '../Redux/HotelRedux'
import {AsyncStorage} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import StartupActions from '../Redux/StartupRedux'

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

      if (data.length > 0){
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
  
  yield put(StartupActions.loadBar())
  
  const {data } = action
  const token = JSON.parse(yield AsyncStorage.getItem('token'))
  const { id, rating, img_url } = data  

  const queryResult = yield querySelectHotelTotal(" id ='"+id+"'")
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
  
  let _data = {...data,  'rating' : rating == null ? "" : rating, 'img_url' : imgPath}
  
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
          const { rating, amenity, detailImages, img_url } = data
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

          console.log("detail images=> ", _detailImages)
          let __data = {...data,  'rating' : rating == null ? "" : rating, 'amenity' : JSON.stringify(amenity), 'detailImages': JSON.stringify(_detailImages), 'img_url' : mainImgPath}
          const savedDetail = yield insertNewHotelDetail(__data)             
          console.log(" savedDetail data =>",savedDetail)
        }
       const savedData = yield insertNewHotelTotal(_data)              
        
        yield put(HotelActions.saveSuccess(savedData.id))
        yield put(StartupActions.loadBarSuccess("isload"))
      }
      else{
        yield put(StartupActions.loadBarSuccess("isload"))
        alert(message)
        yield put(HotelActions.hotelFailure(message))
        return
      }
      
    } else {
      yield put(StartupActions.loadBarSuccess("isload"))
      alert("Internet Error")
      yield put(HotelActions.hotelFailure("Internet Error"))
      return
    }
  }else{
    const deletedResult = yield deleteHotelTotal(id)    
    yield put(HotelActions.deleteSuccess(id))
    yield put(StartupActions.loadBarSuccess("isload"))
  }

}

export function * getSavedHotelDetail (api, action) {
  yield put(StartupActions.loadBar())
  
  const { hotelId } = action
  const _allHotelDetail = yield querySelectHotelDetail(" id ='"+hotelId+"'")
  const allHotelDetail = Array.from(_allHotelDetail)
  if(allHotelDetail.length > 0){
    console.log(" all allHotelDetail =>", allHotelDetail[0])
    yield put(HotelActions.loadDetailSuccess(allHotelDetail[0]))
    yield put(StartupActions.loadBarSuccess("isload"))
  }
  else{
    yield put(StartupActions.loadBarSuccess("isload"))
    alert("Data doesn't exist!")
    yield put(HotelActions.hotelFailure("Data doesn't exist!"))
  }
}