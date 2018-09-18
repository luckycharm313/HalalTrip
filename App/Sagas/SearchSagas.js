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

export function * getWeather (api, action) {
  const {lat, long} = action
  const response = yield call(api._getWeather, lat, long)
  console.log(" weather response => ", response)
  var date = new Date()
  let m = parseInt(date.getMonth())+1
  if(m < 10)
    m = "0"+m
  
  let d =  date.getDate()
  let d1 = parseInt(date.getDate())+1 
  let d2 = parseInt(date.getDate())+2

  if(d < 10)
    d = "0"+d
  if(d1 < 10)
    d1 = "0"+d1
  if(d2 < 10)
    d2 = "0"+d2
  
  var mToday= date.getFullYear()+"-"+m+"-"+d
  var mTomorrow = date.getFullYear()+"-"+m+"-"+d1
  var mTwo = date.getFullYear()+"-"+m+"-"+d2

  console.log(mToday)
  console.log(mTomorrow)
  console.log(mTwo)
  if (response.ok) {
    const { list } = response.data
  
    let arrData=[]
    let temp1 ={}
    let temp2 ={}
    let temp3 ={}
    list.forEach(element => {
      const {dt, dt_txt, main, weather } = element           
      
      if(dt_txt.indexOf(mToday) >= 0){
        temp1["date"] = "Today"
        temp1["temp"] = main.temp
        temp1["description"] = weather[0].description
        temp1["weather"] = weather[0].main
        temp1["weather_icon"] = "http://openweathermap.org/img/w/"+weather[0].icon+".png"
      }  
      else if(dt_txt.indexOf(mTomorrow) >= 0){
        temp2["date"] = "Tomorrow"
        temp2["temp"] = main.temp
        temp2["description"] = weather[0].description
        temp2["weather"] = weather[0].main
        temp2["weather_icon"] = "http://openweathermap.org/img/w/"+weather[0].icon+".png"
      }
      else if(dt_txt.indexOf(mTwo) >= 0){
        temp3["date"] = mTwo
        temp3["temp"] = main.temp
        temp3["description"] = weather[0].description
        temp3["weather"] = weather[0].main
        temp3["weather_icon"] = "http://openweathermap.org/img/w/"+weather[0].icon+".png"
      }
    });
    
    arrData.push(temp1)
    arrData.push(temp2)
    arrData.push(temp3)
    console.log("arrData =>", arrData)
    yield put(SearchActions.weatherSuccess(arrData))
  }
  else{
    alert("Network Error")
    yield put(SearchActions.searchFailure())
  }
}