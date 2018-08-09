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
  const _api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuaGFsYWx0cmlwdGhhaWxhbmQuY29tIiwiaWF0IjoxNTMyOTgyNzcwLCJuYmYiOjE1MzI5ODI3NzAsImV4cCI6MTUzMzU4NzU3MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNCJ9fX0.JSmCeYj-lI_a9V6PZWrxHIdpfpbmWG-IMNIfHmsaugs'
    },
    // 10 second timeout...
    timeout: 10000
  })
  
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
  
  const _signUp = (username, email, password) => _api.post('wp-json/wp/v2/users', {username: username, email: email, password : password} )
  const _logIn = (email, password) => api.post('wp-json/jwt-auth/v1/token ', {username: email, password : password} )
  const _registerToken = (param) => api.post('halaltrip/api/user/registerToken', param )
  return {
    _signUp,
    _logIn,
    _registerToken,
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

  return {
    _getCategory,
    _getHotel,
    _getPlace,
    _getHotelByPlace,
    _getHotelDetail,
    _getCuisine,
    _getRestaurant,
    _getRestaurantDetail
  }
}

// let's return back our create method as the default.
export default {
  create,
  user,
  main,
}
