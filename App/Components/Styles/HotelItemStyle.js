import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginRight : Metrics.baseMargin,
  },
  img : {
    width: Metrics.width_35,
    height : Metrics.height_20,  
    borderRadius : 10,
    alignItems : 'flex-end'
  },
  icon_heart : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    margin : Metrics.baseMargin,
  },
  icon_heart_save : {
    color: Colors.primary,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    margin : Metrics.baseMargin,
  },
  txt_title: {
    width: Metrics.width_35,
    color: Colors.font.dark,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  txt_rating : {
    color: Colors.lightGrey,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
    paddingVertical : 2,
  },
  txt_location : {
    width: Metrics.width_35,
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
  txt_review : {
    backgroundColor : Colors.primary,
    padding : 2,
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
})
