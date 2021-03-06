import { StyleSheet , Platform} from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  navbar :{
    // width: '100%',
    position : 'absolute',
    // top : Platform.OS=='ios' ? 20: 0,
    zIndex : 1000,    
  },
  icon_heart : {
    color: Colors.primary,
    fontSize        : Fonts.size.h4,
    fontFamily      : Fonts.type.base,
    marginTop : 25,
  },
  icon_heart_save : {
    color: Colors.primary,
    fontSize        : Fonts.size.h4,
    fontFamily      : Fonts.type.base,
    marginTop : 25,
  },

  view_photo : {
    height : Metrics.height_map,
    // justifyContent : 'flex-end',
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingBottom : Metrics.baseMargin,
    alignItems : 'flex-end'
  },
  photo_action : { 
    alignItems : 'flex-start', 
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

  restaurant_header_section : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
  },
  txt_country : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_restaurant_label : {
    marginTop : Metrics.smallMargin,
    color: Colors.font.dark,
    fontSize        : Fonts.size.h5,
    fontFamily      : Fonts.type.base,
  },
  rating_view : {
    marginTop : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center',
  },
  txt_rating : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    marginLeft : Metrics.baseMargin,
  },
  price_view : {
    marginTop : Metrics.baseMargin,
    // flexDirection : 'row',
    // alignItems : 'center',
  },
  icon_money : {
    width : 30,
    height : 20,
  },
  price_detail_view : {
    marginLeft : Metrics.baseMargin,
  },
  txt_price_detail_label : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_price_detail : {
    marginTop : Metrics.smallMargin,
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },
  order_section : {
    paddingVertical : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  order_view : {

  },
  txt_order : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  btn_view : {
    borderColor : Colors.font.textHintColor,
    borderWidth : 1,
    borderRadius : 20,
    paddingHorizontal : Metrics.baseMargin,
    paddingVertical : Metrics.smallMargin,
  },
  change_btn_txt : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },

  room_view : {
    paddingVertical : Metrics.baseMargin,
    paddingLeft : Metrics.paddingHorizontal,
  },
  room_section : {
    backgroundColor : Colors.primary,
    borderRadius : 10,
    paddingHorizontal : Metrics.section,
    paddingVertical: Metrics.baseMargin,
    marginRight : Metrics.baseMargin,
    alignItems : 'center',
  },
  txt_room : {
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },

  //// description detail
  description_section : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin
  },
  txt_description_label : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.bold,
    marginTop : Metrics.baseMargin
  },
  txt_description_detail : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  action_view :{
    paddingVertical : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  txt_action : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    flex : 1,
  },
  btn_action : {
    padding : Metrics.baseMargin,
    borderColor : Colors.font.textHintColor,
    borderRadius : 30,
    borderWidth : 1,
  },
  icon_action : {
    color: Colors.primary,
    fontSize        : Fonts.size.h5,
    fontFamily      : Fonts.type.base,
  },

  section : {
    marginTop : Metrics.section,
    marginLeft : Metrics.paddingHorizontal,
  },
  txtSectionTitle : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.bold,
    marginBottom : Metrics.baseMargin,
  },

  reservation_section : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    borderTopWidth : 1,
    borderColor : Colors.font.textHintColor,
    marginVertical : 20,

  },
  reservation_rating : {
    flex : 1,
    marginRight : Metrics.doubleBaseMargin,
  },
  txt_reservation_label : {
    marginTop : Metrics.smallMargin,
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  btn_reservation : {
    paddingHorizontal : Metrics.middleMargin,
    paddingVertical : Metrics.marginVertical,
    borderRadius : 10,
    backgroundColor : Colors.primary,
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
