import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Images } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
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
})
