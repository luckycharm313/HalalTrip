import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'
import {AsyncStorage} from 'react-native'
import StartupActions from '../Redux/StartupRedux'
// exported to make available for tests
//export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // // straight-up string logging
    // console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // // logging an object for better clarity
    // console.tron.log({
    //   message: 'pass objects for better logging',
    //   someGeneratorFunction: selectAvatar
    // })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    // console.tron.display({
    //   name: '🔥 IGNITE 🔥',
    //   preview: 'You should totally expand this',
    //   value: {
    //     '💃': 'Welcome to the future!',
    //     subObject,
    //     someInlineFunction: () => true,
    //     someGeneratorFunction: startup,
    //     someNormalFunction: selectAvatar
    //   }
    // })
  }
  // const avatar = yield select(selectAvatar)
  // // only get if we don't have it yet
  // if (!is(String, avatar)) {
  //   yield put(GithubActions.userRequest('GantMan'))
  // }
}

export function * receivedNotification (api, action) {
  const { notification } = action
  const _notification = JSON.parse(yield AsyncStorage.getItem('notifications'))
  console.log("_notification", _notification)
  if(_notification){
    let _temp = [];
    _notification.forEach(element => {
      _temp.push(element)
    });
    _temp.push(notification)
    yield AsyncStorage.setItem('notifications', JSON.stringify(_temp))
    yield put(StartupActions.startupSuccess(_temp))
  }
  else{
    let temp=[]
    temp.push(notification)
    yield AsyncStorage.setItem('notifications', JSON.stringify(temp))
    yield put(StartupActions.startupSuccess(temp))
  }
}