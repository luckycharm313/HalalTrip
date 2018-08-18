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
  return {
    _signUp,
    _logIn,
    _registerToken,  
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
  const _getHotel = (token) => api.get('api/hotel/all',{}, { headers : {'Authorization': `Bearer ${token}`} })
  const _getPlace = (token) => api.get('api/place/all',{}, { headers : {'Authorization': `Bearer ${token}`} })
  const _getHotelByPlace = (param, token) => api.post('api/place/hotel', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getHotelDetail = (param, token) => api.post('api/hotel/detail', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _getCuisine = (token) => api.get('api/restaurant/cuisine', {}, { headers : {'Authorization': `Bearer ${token}`} })
  const _getRestaurant = (token) => api.get('api/restaurant/all', {}, { headers : {'Authorization': `Bearer ${token}`} })
  const _getRestaurantDetail = (param, token) => api.post('api/restaurant/detail', param, { headers : {'Authorization': `Bearer ${token}`} })
  const _socialRegister = (param) => api.post('api/user/socialRegister', param)

  return {
    _getCategory,
    _getHotel,
    _getPlace,
    _getHotelByPlace,
    _getHotelDetail,
    _getCuisine,
    _getRestaurant,
    _getRestaurantDetail,
    _socialRegister
  }
}

// let's return back our create method as the default.
export default {
  create,
  user,
  main,
}
