export const HOTEL_TOTAL_SCHEMA = 'HotelTotal'

export const HotelTotalSchema = {
    name : HOTEL_TOTAL_SCHEMA,
    primaryKey : 'id',
    properties : {
        id : {type : 'string'},
        title : {type : 'string'},
        location : {type : 'string'},
        rating : {type : 'string'},
        img_url : {type : 'string'},
        street_lat : {type : 'string'},
        street_lng : {type : 'string'},
    }
}