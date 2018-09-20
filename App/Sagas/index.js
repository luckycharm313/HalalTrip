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
import { ActivityTypes } from '../Redux/ActivityRedux'
import { TrendTypes } from '../Redux/TrendRedux'
import { TouristTypes } from '../Redux/TouristRedux'
import { SearchTypes } from '../Redux/SearchRedux'

/* ------------- Sagas ------------- */

import { startup, receivedNotification } from './StartupSagas'
import { signUp, signUpWithGoogle, signUpWithFacebook, logIn, logout, loadProfile } from './UserSagas'
import { loadData, setLanguage, preLoad, loadLanguage } from './MainSagas'
import { getHotelByPlace, getRestaurantPlace } from './PlaceSagas'
import { loadHotelData, getHotelDetail, saveHotelTotal, getSavedHotelDetail, setHotelRate } from './HotelSagas'
import { loadRestaurantData, getRestaurantDetail, saveRestaurantTotal, loadSavedData, getSavedDetail, setRestaurantRate} from './RestaurantSagas'
import { getActivityDetail, saveActivityTotal, getSavedActivityDetail } from './ActivitySagas'
import { getTrendDetail } from './TrendSagas'
import { loadTouristData, getTouristDetail, setTouristRate } from './TouristSagas'
import { searchData, getWeather, getEmergencyNumbers } from './SearchSagas'

/* ------------- API ------------- */
const user_api = API.user()
const main_api = API.main()
const rest_api = API.rest()
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.RECEIVED_NOTIFICATION, receivedNotification, main_api),
    // user sagas
    takeLatest(UserTypes.USER_SIGNUP, signUp, user_api),
    takeLatest(UserTypes.USER_LOGIN, logIn, user_api),
    takeLatest(UserTypes.LOG_OUT, logout, user_api),
    takeLatest(UserTypes.USER_GOOGLE_SIGNUP, signUpWithGoogle, user_api),
    takeLatest(UserTypes.USER_FACEBOOK_SIGNUP, signUpWithFacebook, user_api),
    takeLatest(UserTypes.LOAD_PROFILE, loadProfile, main_api),
    
    // main saga : category, hotel, activity, restaurant
    takeLatest(MainTypes.LOAD_DATA, loadData, main_api),    
    takeLatest(MainTypes.SET_LANGUAGE, setLanguage, main_api),    
    takeLatest(MainTypes.PRE_LOAD, preLoad, main_api),    
    takeLatest(MainTypes.LOAD_LANGUAGE, loadLanguage, main_api),    

    // place saga:
    takeLatest(PlaceTypes.GET_HOTEL_BY_PLACE, getHotelByPlace, main_api),
    takeLatest(PlaceTypes.GET_RESTAURANT_PLACE, getRestaurantPlace, main_api),

    // hotel saga:
    takeLatest(HotelTypes.GET_HOTEL_DETAIL, getHotelDetail, main_api),
    takeLatest(HotelTypes.LOAD_HOTEL_DATA, loadHotelData, main_api),
    takeLatest(HotelTypes.SAVE_HOTEL_TOTAL, saveHotelTotal, main_api),
    takeLatest(HotelTypes.GET_SAVED_HOTEL_DETAIL, getSavedHotelDetail, main_api),
    takeLatest(HotelTypes.SET_RATE, setHotelRate, main_api),

    // restaurant saga :
    takeLatest(RestaurantTypes.LOAD_RESTAURANT_DATA, loadRestaurantData, main_api),
    takeLatest(RestaurantTypes.GET_RESTAURANT_DETAIL, getRestaurantDetail, main_api),
    takeLatest(RestaurantTypes.SAVE_RESTAURANT_TOTAL, saveRestaurantTotal, main_api),
    takeLatest(RestaurantTypes.LOAD_SAVED_DATA, loadSavedData, main_api),
    takeLatest(RestaurantTypes.GET_SAVED_DETAIL, getSavedDetail, main_api),
    takeLatest(RestaurantTypes.SET_RATE, setRestaurantRate, main_api),

    // tourist saga :
    takeLatest(TouristTypes.LOAD_TOURIST_DATA, loadTouristData, main_api),
    takeLatest(TouristTypes.GET_TOURIST_DETAIL, getTouristDetail, main_api),
    takeLatest(TouristTypes.SET_TOURIST_RATE, setTouristRate, main_api),

    // activity
    takeLatest(ActivityTypes.GET_ACTIVITY_DETAIL, getActivityDetail, main_api),
    takeLatest(ActivityTypes.SAVE_ACTIVITY_TOTAL, saveActivityTotal, main_api),
    takeLatest(ActivityTypes.GET_SAVED_ACTIVITY_DETAIL, getSavedActivityDetail, main_api),
    
    // trend
    takeLatest(TrendTypes.GET_TREND_DETAIL, getTrendDetail, main_api),

    // search
    takeLatest(SearchTypes.SEARCH_DATA, searchData, main_api),
    takeLatest(SearchTypes.GET_WEATHER, getWeather, rest_api),
    takeLatest(SearchTypes.GET_EMERGENCY_NUMBERS, getEmergencyNumbers, main_api),
    
    
  ])
}
