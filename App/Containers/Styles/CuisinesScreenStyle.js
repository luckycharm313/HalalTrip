import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Images } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    backgroundColor : Colors.font.default,
  },
  navbar :{
    // width: '100%',
    // position : 'absolute',
    top : Platform.OS=='ios' ? 20: 0,
    //zIndex : 1000,
  },
  header_section :{
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
  },
  header_txt_title :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
  },
  body_section :{
    marginTop : Metrics.baseMargin,
    paddingHorizontal : Metrics.paddingHorizontal
  },
  view_cuisines :{
    marginTop : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center', 
    justifyContent : 'space-between',   
  },
  resturant_view :{
    flexDirection : 'row',
    alignItems : 'center', 
  },
  img_review :{
    width: 60,
    height : 60,
    borderRadius : 10,
  },
  item_view :{
    marginLeft : Metrics.baseMargin
  },
  txt_label :{
    marginTop : Metrics.smallMargin,
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  txt_detail :{
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  icon_arrow_sm :{
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.h4,
    fontFamily      : Fonts.type.base,
  },
})
