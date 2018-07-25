import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'
export default StyleSheet.create({
  container: {
    flex: 1,
    marginRight : Metrics.baseMargin,
  },
  img : {
    width: Metrics.width_90,
    height : Metrics.height_60,  
    borderRadius : 10,
    alignItems : 'flex-end'
  },
  icon_heart : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    margin : Metrics.baseMargin,
  },
  txt_title: {
    width: Metrics.width_90,
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  txt_rating : {
    marginTop : Metrics.baseMargin,
    color: Colors.lightGrey,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  txt_location : {
    width: Metrics.width_90,
    color: Colors.lightGrey,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  icon_location : {
    color: Colors.lightGrey,
    fontSize        : 10,
    fontFamily      : Fonts.type.base, 
  },
  txt_cost : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium-1,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  review_section : {
    flexDirection : 'row',
    alignItems : 'center',
    paddingVertical : 2,
  },
  
  txt_md : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
    marginLeft : 5,
  },
})