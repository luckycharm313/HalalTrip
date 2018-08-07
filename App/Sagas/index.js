import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { MainTypes } from '../Redux/MainRedux'
import { PlaceTypes } from '../Redux/PlaceRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signUp, signUpWithGoogle, logIn } from './UserSagas'
import { loadData } from './MainSagas'
import { getHotelByPlace } from './PlaceSagas'

/* ------------- API ------------- */
const user_api = API.user()
const main_api = API.main()
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // user sagas
    takeLatest(UserTypes.USER_SIGNUP, signUp, user_api),
    takeLatest(UserTypes.USER_GOOGLE_SIGNUP, signUpWithGoogle, user_api),
    takeLatest(UserTypes.USER_LOGIN, logIn, user_api),

    // main saga : category, hotel, activity, restaurant
    takeLatest(MainTypes.LOAD_DATA, loadData, main_api),

    // place saga:
    takeLatest(PlaceTypes.GET_HOTEL_BY_PLACE, getHotelByPlace, main_api),
  ])
}
