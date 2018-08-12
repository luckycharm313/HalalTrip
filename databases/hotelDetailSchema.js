export const HOTEL_DETAIL_SCHEMA = 'HotelDetail'

export const HotelDetailSchema = {
    name : HOTEL_DETAIL_SCHEMA,
    primaryKey : 'id',
    properties : {
        id : {type : 'string'},
        title : {type : 'string'},
        location : {type : 'string'},
        rating : {type : 'string'},
        img_url : {type : 'string'},
        street_lat : {type : 'string'},
        street_lng : {type : 'string'},
        description : {type : 'string'},
        detailImages : {type : 'string'},
        amenity : {type : 'string'},
    }
}