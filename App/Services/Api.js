// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser
  }
}


const user = (baseURL = 'http://www.halaltripthailand.com/') => {
  
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000
  })
  
  const _getNonce = () => api.get('api/get_nonce/?controller=user&method=register', {} )
  const _signUp = (param) => api.post('api/user/register/', param )
  const _logIn = (param) => api.post('/api/user/generate_auth_cookie', param )
  const _registerToken = (param) => api.post('halaltrip/api/user/registerToken', param )
  const _fbRegister = (param) => api.post('api/user/fb_connect', param)
  return {
    _signUp,
    _logIn,
    _registerToken,  
    _fbRegister,
    _getNonce  
  }
}

const main = (baseURL = 'http://www.halaltripthailand.com/halaltrip/') => {
  
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'      
    },
    // 10 second timeout...
    timeout: 10000
  })
   
  const _getCategory = (token) => api.get('api/category/all',{}, { headers : {'Authorization': `Bearer ${token}`} })
  const _getHotel = (param, token) => api.post('api/hotel/all',param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getPlace = (param, token) => api.post('api/place/all',param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getHotelByPlace = (param, token) => api.post('api/place/hotel', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getRestaurantByPlace = (param, token) => api.post('api/place/restaurant', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getTouristByPlace = (param, token) => api.post('api/place/tourist', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getHotelDetail = (param, token) => api.post('api/hotel/detail', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getCuisine = (param, token) => api.post('api/restaurant/cuisine', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getRestaurant = (param, token) => api.post('api/restaurant/all', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getRestaurantDetail = (param, token) => api.post('api/restaurant/detail', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _socialRegister = (param) => api.post('api/user/socialRegister', param)
  const _setRate = (param, token) => api.post('api/restaurant/rate', param, { headers : {'Authorization': `Bearer ${token}`} })
  
  const _getActivity = (param, token) => api.post('api/activity/all',param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getActivityDetail = (param, token) => api.post('api/activity/detail',param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getTrend = (param, token) => api.post('api/trend/all',param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getTrendDetail = (param, token) => api.post('api/trend/detail',param, { headers : {'Authorization': `Bearer ${token}`} })

  const _getTourist = (param, token) => api.post('api/tourist/all', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getTouristDetail = (param, token) => api.post('api/tourist/detail', param, { headers : {'Authorization': `Bearer ${token}`} })
  
  const _searchData = (param, token) => api.post('api/search', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getEmergencyNumbers = (token) => api.post('api/emergency', {}, { headers : {'Authorization': `Bearer ${token}`} })
  
  return {
    _getCategory,
    _getHotel,
    _getPlace,
    _getHotelByPlace,
    _getRestaurantByPlace,
    _getHotelDetail,
    _getCuisine,
    _getRestaurant,
    _getRestaurantDetail,
    _getActivity,
    _getActivityDetail,
    _getTrend,
    _getTrendDetail,
    _socialRegister,
    _getTourist,
    _getTouristDetail,
    _getTouristByPlace,
    _setRate,
    _searchData,
    _getEmergencyNumbers
  }
}

const rest = (baseURL = 'https://api.openweathermap.org/data/2.5') => {
  
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000
  })
  
  const _getWeather = (lat, long) => api.get(`/forecast?lat=${lat}&lon=${long}&AppID=5db98f0e720334b2c71ea68bf4944402&units=metric`, {} )
  
  return {
    _getWeather,  
  }
}

// let's return back our create method as the default.
export default {
  create,
  user,
  main,
  rest
}
