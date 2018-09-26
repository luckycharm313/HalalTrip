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
    width : '100%',
    height : Metrics.height_map,
    backgroundColor : Colors.lightBlack
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
  
  /// filter section
  filter_section : {
    paddingLeft : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin,
  },
  filter_image_section : {
    marginTop : Metrics.baseMargin,
  },
  img_filter : {
    width : 80,
    height : 80,
    borderRadius : 10,
    marginRight : Metrics.baseMargin
  },
  modal :{
    flex: 1,
    alignItems:"center",
    justifyContent :'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin : 0,
  },
  modalView :{
    height : "auto",
    width: 250,
    backgroundColor: Colors.font.default,
    borderRadius : 5,
    paddingHorizontal : 15,
    paddingVertical : 20,
  },
  modal_section:{
    paddingVertical : 10,
  },
  modal_title_text : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    textAlign : 'center'
  },
  modal_section_btn:{
    flexDirection: "row",
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingVertical : 10,
    // paddingHorizontal : 10,
  },
  modal_btn_cancel:{
    width: 100,
    paddingVertical : 5,
    paddingHorizontal : 10,
    backgroundColor : Colors.grey,
    borderRadius : 5,
  },
  modal_btn_txt:{
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    textAlign : 'center',
  },
  modal_btn_ok:{
    width: 100,
    paddingVertical : 5,
    paddingHorizontal : 10,
    backgroundColor : Colors.primary,
    borderRadius : 5,
  },
})
