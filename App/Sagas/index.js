import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { MainTypes } from '../Redux/MainRedux'
import { PlaceTypes } from '../Redux/PlaceRedux'
import { HotelTypes } from '../Redux/HotelRedux'
import { RestaurantTypes } from '../Redux/RestaurantRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signUp, signUpWithGoogle, logIn } from './UserSagas'
import { loadData } from './MainSagas'
import { getHotelByPlace } from './PlaceSagas'
import { loadHotelData, getHotelDetail, saveHotelTotal, getSavedHotelDetail } from './HotelSagas'
import { loadRestaurantData, getRestaurantDetail, saveRestaurantTotal, loadSavedData, getSavedDetail} from './RestaurantSagas'

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
    
    // hotel saga:
    takeLatest(HotelTypes.GET_HOTEL_DETAIL, getHotelDetail, main_api),
    takeLatest(HotelTypes.LOAD_HOTEL_DATA, loadHotelData, main_api),
    takeLatest(HotelTypes.SAVE_HOTEL_TOTAL, saveHotelTotal, main_api),
    takeLatest(HotelTypes.GET_SAVED_HOTEL_DETAIL, getSavedHotelDetail, main_api),

    // restaurant saga :
    takeLatest(RestaurantTypes.LOAD_RESTAURANT_DATA, loadRestaurantData, main_api),
    takeLatest(RestaurantTypes.GET_RESTAURANT_DETAIL, getRestaurantDetail, main_api),
    takeLatest(RestaurantTypes.SAVE_RESTAURANT_TOTAL, saveRestaurantTotal, main_api),
    takeLatest(RestaurantTypes.LOAD_SAVED_DATA, loadSavedData, main_api),
    takeLatest(RestaurantTypes.GET_SAVED_DETAIL, getSavedDetail, main_api),
    
  ])
}
