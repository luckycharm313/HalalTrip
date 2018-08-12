import Realm from 'realm'
import { RestaurantTotalSchema, PlaceSchema, RESTAURANT_TOTAL_SCHEMA, PLACEL_SCHEMA } from './restaurantTotalSchema'
import { RestaurantDetailSchema, RESTAURANT_DETAIL_SCHEMA } from './restaurantDetailSchema'
import { HotelTotalSchema, HOTEL_TOTAL_SCHEMA } from './hotelTotalSchema'
import { HotelDetailSchema, HOTEL_DETAIL_SCHEMA } from './hotelDetailSchema'

const databaseOptions = {
    path : 'halaltrip.realm',
    schema : [RestaurantTotalSchema, PlaceSchema, RestaurantDetailSchema, HotelTotalSchema, HotelDetailSchema ],
    schemaVersion : 0
}
/*** restaurant Total ***/
export const insertNewResTotal = newData => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(RESTAURANT_TOTAL_SCHEMA, newData)
            resolve(newData)
        })
    }).catch((error)=>reject(error))
})
export const deleteResTotal = resTotalId => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let deletingResTotal = realm.objectForPrimaryKey(RESTAURANT_TOTAL_SCHEMA, resTotalId)
            realm.delete(deletingResTotal)
            resolve()
        })
    }).catch((error)=>reject(error))
})

export const deletePlace = resPlaceId => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let deletingPlace = realm.objectForPrimaryKey(PLACEL_SCHEMA, resPlaceId)
            realm.delete(deletingPlace)
            resolve()
        })
    }).catch((error)=>reject(error))
})
export const queryAllResTotal = () => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let allResTotal = realm.objects(RESTAURANT_TOTAL_SCHEMA)
            resolve(allResTotal)
        })
    }).catch((error)=>reject(error))
})

export const querySelectResTotal = query => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let temp = realm.objects(RESTAURANT_TOTAL_SCHEMA).filtered(query)
            resolve(temp)
        })
    }).catch((error)=>reject(error))
})
export const updateResTotal = data => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let temp = realm.objectForPrimaryKey(RESTAURANT_TOTAL_SCHEMA, data.id)            
            temp.title = data.title
            temp.location = data.location
            temp.rating = data.rating
            temp.img_url = data.img_url
            temp.placeName = data.placeName
            temp.street_lat = data.street_lat
            temp.street_lng = data.street_lng
            resolve()
        })
    }).catch((error)=>reject(error))
})

/*** End restaurant Total ***/


/*** restaurant Detail ***/
export const insertNewResDetail = newData => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(RESTAURANT_DETAIL_SCHEMA, newData)
            resolve(newData)
        })
    }).catch((error)=>reject(error))
})
export const deleteResDetail = resDetailId => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let deletingResDetail = realm.objectForPrimaryKey(RESTAURANT_DETAIL_SCHEMA, resDetailId)
            realm.delete(deletingResDetail)
            resolve()
        })
    }).catch((error)=>reject(error))
})

export const queryAllResDetail = () => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let allResDetail = realm.objects(RESTAURANT_DETAIL_SCHEMA)
            resolve(allResDetail)
        })
    }).catch((error)=>reject(error))
})

export const querySelectResDetail = query => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let temp = realm.objects(RESTAURANT_DETAIL_SCHEMA).filtered(query)
            resolve(temp)
        })
    }).catch((error)=>reject(error))
})

/*** End restaurant Detail ***/


/*** Hotel Total ***/
export const insertNewHotelTotal = newData => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(HOTEL_TOTAL_SCHEMA, newData)
            resolve(newData)
        })
    }).catch((error)=>reject(error))
})
export const deleteHotelTotal = HotelTotalId => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let deletingHotelTotal = realm.objectForPrimaryKey(HOTEL_TOTAL_SCHEMA, HotelTotalId)
            realm.delete(deletingHotelTotal)
            resolve()
        })
    }).catch((error)=>reject(error))
})

export const queryAllHotelTotal = () => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let allHotelTotal = realm.objects(HOTEL_TOTAL_SCHEMA)
            resolve(allHotelTotal)
        })
    }).catch((error)=>reject(error))
})

export const querySelectHotelTotal = query => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let temp = realm.objects(HOTEL_TOTAL_SCHEMA).filtered(query)
            resolve(temp)
        })
    }).catch((error)=>reject(error))
})

/*** End Hotel Total ***/


/*** hotel Detail ***/
export const insertNewHotelDetail = newData => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(HOTEL_DETAIL_SCHEMA, newData)
            resolve(newData)
        })
    }).catch((error)=>reject(error))
})
export const deleteHotelDetail = hotelDetailId => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let deletingHotelDetail = realm.objectForPrimaryKey(HOTEL_DETAIL_SCHEMA, hotelDetailId)
            realm.delete(deletingHotelDetail)
            resolve()
        })
    }).catch((error)=>reject(error))
})

export const querySelectHotelDetail = query => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            let temp = realm.objects(HOTEL_DETAIL_SCHEMA).filtered(query)
            resolve(temp)
        })
    }).catch((error)=>reject(error))
})

/*** End hotel Detail ***/
export default new Realm(databaseOptions)