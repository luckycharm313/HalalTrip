export const RESTAURANT_TOTAL_SCHEMA = 'RestaurantTotal'
export const PLACEL_SCHEMA = 'place'

export const PlaceSchema ={
    name : PLACEL_SCHEMA,
    primaryKey : 'object_id',
    properties : {
        object_id : {type : 'string'},
        id : {type : 'string'},
        place : {type : 'string'},
    }
}

export const RestaurantTotalSchema = {
    name : RESTAURANT_TOTAL_SCHEMA,
    primaryKey : 'id',
    properties : {
        id : {type : 'string'},
        title : {type : 'string'},
        location : {type : 'string'},
        rating : {type : 'string'},
        img_url : {type : 'string'},
        placeName : {type : 'list', objectType: PLACEL_SCHEMA},
        street_lat : {type : 'string'},
        street_lng : {type : 'string'},
    }
}