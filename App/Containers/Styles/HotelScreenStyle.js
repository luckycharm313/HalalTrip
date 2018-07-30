import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Images } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  header_section :{
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.section,
  },
  label_section :{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  header_txt_title :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
  },
  btnFilter :{
    padding : Metrics.smallMargin
  },
  txtFilter :{
    color: Colors.primary,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },

  search_section : {
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : Metrics.baseMargin,
    backgroundColor : Colors.inputBox,
    borderRadius : 6,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin,
  },
  icon_search :{
    color: Colors.font.textHintColor,
    fontSize   : Fonts.size.regular,
    fontFamily : Fonts.type.base,
  },
  input_area : {
    flex : 1,
    padding : 0,
    marginLeft : Metrics.baseMargin,
    color: Colors.font.dark,
    fontSize   : Fonts.size.medium,
    fontFamily : Fonts.type.base,
  },
  action_section : {
    marginTop : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  filter_actions : {
    flexDirection : 'row',
    alignItems : 'center',
  },
  filter_view : {
    backgroundColor : Colors.primary,
    borderRadius : Metrics.smallMargin,
    marginRight : Metrics.smallMargin,
  },
  filter_label : {
    color: Colors.font.default,
    fontSize   : Fonts.size.small,
    fontFamily : Fonts.type.base,
    marginHorizontal : Metrics.baseMargin,
    marginVertical : Metrics.smallMargin,
  },
  map_location : {
    borderWidth : 1,
    padding : 8,
    borderRadius : 30,
    borderColor : Colors.font.textHintColor
  },
  icon_location : {
    color: Colors.primary,
    fontSize   : Fonts.size.input,
    fontFamily : Fonts.type.base,
  },

  //featured hotel section
  featured_hotel_section : {
    paddingVertical : Metrics.baseMargin,
    paddingLeft : Metrics.paddingHorizontal,
  },
  header_txt_title_md : {
    color: Colors.font.dark,
    fontSize   : Fonts.size.regular,
    fontFamily : Fonts.type.base,
  },
  hotel_img_section : {
    paddingVertical : Metrics.baseMargin,
  },
  img_featured_hotel : {
    width : 80,
    height : 80,
    borderRadius : 10,
    marginRight : Metrics.smallMargin,
  },
  txt_rating : {
    marginTop : Metrics.baseMargin,
    color: Colors.lightGrey,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  txt_title: {
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  txt_location : {
    width: Metrics.width_35,
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  icon_location : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium-1,
    fontFamily      : Fonts.type.base, 
  },
  txt_cost : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  review_section : {
    flexDirection : 'row',
    alignItems : 'center',
    paddingVertical : 2,
  },
  txt_review : {
    backgroundColor : Colors.primary,
    padding : 3,
    color: Colors.font.default,
    fontSize        : Fonts.size.small-2,
    fontFamily      : Fonts.type.base,
    borderRadius : 3,
  },
  txt_md : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
    marginLeft : 5,
  },

  /// all hotel
  hotel_list_section : {
    marginVertical : Metrics.baseMargin,
    paddingHorizontal : Metrics.paddingHorizontal,
  },
  hotel_list_view : {
    marginTop : Metrics.baseMargin
  }
})
