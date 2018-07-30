import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  navbar :{
    width: '100%',
    position : 'absolute',
    // top : Platform.OS=='ios' ? 20: 0,
    zIndex : 1000,
  },
  view_photo : {
    height : Metrics.height_map,
    justifyContent : 'flex-end',
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingBottom : Metrics.baseMargin,
  },
  photo_action : {
    flexDirection : 'row',
    justifyContent : 'space-between',   
    alignItems : 'flex-end', 
  },
  photo_number : {
    backgroundColor : Colors.font.dark,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin,
    borderRadius : 15,
  },
  txt_number :{
    color: Colors.font.default,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },  
  photo_btn : {   
    flexDirection : 'row',
    backgroundColor : Colors.font.default,
    alignItems : 'center', 
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    borderRadius : 10,
  },
  icon_all : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
    marginRight : Metrics.baseMargin,
  },
  txt_btn : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
  },
/// title and location section
  title_location_section : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.doubleBaseMargin,
  },
  hotel_review_view : {
    flexDirection : 'row',
    alignItems : 'center',
  },
  txt_review : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    marginRight : Metrics.baseMargin,
  },
  hotel_title_view : {
    paddingVertical : Metrics.smallMargin,
  },
  txt_hotel_title : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.h4,
    fontFamily      : Fonts.type.base,
  },
  hotel_location_view : {
    flexDirection : 'row',
    alignItems : 'center',
    paddingVertical : Metrics.paddingHorizontal,
  },
  hotel_location_section : {
    marginRight : Metrics.baseMargin,
    flex : 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txt_location_label : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_location_detail : {
    marginTop : Metrics.smallMargin,
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium+1,
    fontFamily      : Fonts.type.base,
  },
  btn_nearby : {
    marginTop : Metrics.baseMargin,
    backgroundColor : Colors.primary,
    borderRadius : 15,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical : Metrics.smallMargin,
  },
  txt_nearby : {
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  hotel_location_map : {
    borderWidth : 1,    
    borderColor : '#efefef',
    padding : 4,
    borderRadius : 45,
  },
  img_map :{
    height : 80,
    width : 80,
    borderRadius : 40,
    alignItems : 'center',
    justifyContent : 'center',
    
  },
  icon_map :{
    color: Colors.primary,
    fontSize        : Fonts.size.h3,
    fontFamily      : Fonts.type.base,
  },

  // rating section
  rating_section :{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin,
  },
  rating_view :{
    flexDirection : 'row',
    alignItems : 'center',
  },
  txt_rating : {
    backgroundColor : Colors.primary,
    padding : Metrics.smallMargin,
    borderRadius : Metrics.smallMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
  comment_section :{
    marginLeft : Metrics.baseMargin,
  },
  txt_comment :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_count_review :{
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },
  txt_review_rating :{
    color: Colors.primary,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },

  /// Description
  detail_section_part : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin,
  },
  description_view : {
    marginTop : Metrics.baseMargin,
  },
  txt_description_label : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_description_detail : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },
  img_amenity : {
    width : 25,
    height : 20,
    marginRight : Metrics.middleMargin
  },

  /// filter section
  filter_section : {
    paddingLeft : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin,
  },
  txt_filter : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
    backgroundColor : Colors.lightBlack,
    paddingHorizontal : Metrics.baseMargin,
    paddingVertical : Metrics.smallMargin,
    borderRadius : Metrics.doubleBaseMargin,
    marginRight : Metrics.baseMargin,
  },
  filter_image_section : {
    marginTop : Metrics.section,
  },
  img_filter : {
    width : 80,
    height : 80,
    borderRadius : 10,
    marginRight : Metrics.baseMargin
  },
  description_filter_view:{
    marginTop : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center',
  },
  txt_filter:{
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    marginRight : Metrics.baseMargin,
  },
  img_shape:{
    width : 40,
    height : 40,
  },
  img_square_meters:{
    width : 50,
    height : 50,
  },
  room_section : {
    marginTop : Metrics.baseMargin,
    paddingVertical : Metrics.smallMargin,
  },
  room_title : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  room_spec_view : {
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : Metrics.baseMargin,
  },
  txt_room : {
    justifyContent : 'flex-start',
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    width : '45%',
  },
  img_room_icon : {
    width : 80,
    height : 60,
  },
  booking_section : {
    paddingVertical : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingRight : Metrics.paddingHorizontal,
  },
  cost_view : {
    
  },
  txt_cost : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_cost_label : {
    marginTop : 3,
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium-1,
    fontFamily      : Fonts.type.base,
  },
  btn_booking : {
    backgroundColor : Colors.primary,
    borderRadius : 5,
    paddingHorizontal : Metrics.doubleBaseMargin,
    paddingVertical : Metrics.baseMargin
  },
  txt_booking : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
  more_compoent_btn : {
    marginTop : Metrics.paddingHorizontal,
    marginBottom :Metrics.paddingHorizontal,
    alignItems : 'center',
  },
  view_more_component : {
    alignItems : 'center',
    borderWidth : 1,
    borderColor : Colors.primary,
    borderRadius : 15,
    paddingHorizontal : Metrics.baseMargin,
    paddingVertical : Metrics.smallMargin,
  },
  txt_more_component : {
    color: Colors.primary,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },

  //// review section
  reviews_section : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
  },
  reviews_view : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start',
    marginTop : Metrics.baseMargin,
  },
  img_review : {
    width : 50,
    height : 50,
    borderRadius : 30,    
  },
  reviews_user : {
    marginLeft : Metrics.doubleBaseMargin,
  },
  txt_review_label : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_review_date : {
    marginTop : Metrics.smallMargin,
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  reviews_detail : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },

  /// more options
  option_view : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  txt_more_option : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  icon_arrow_sm: {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
})
