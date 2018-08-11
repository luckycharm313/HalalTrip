export const RESTAURANT_DETAIL_SCHEMA = 'RestaurantDetail'



export const RestaurantDetailSchema = {
    name : RESTAURANT_DETAIL_SCHEMA,
    primaryKey : 'id',
    properties : {
        id : {type : 'string'},
        title : {type : 'string'},
        description : {type : 'string'},
        phone : {type : 'string'},
        rating : {type : 'string'},
        location : {type : 'string'},
        img_url : {type : 'string'},
        street_lat : {type : 'string'},
        street_lng : {type : 'string'},
    }
}