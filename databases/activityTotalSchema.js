export const ACTIVITY_TOTAL_SCHEMA = 'ActivityTotal'

export const ActivityTotalSchema = {
    name : ACTIVITY_TOTAL_SCHEMA,
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