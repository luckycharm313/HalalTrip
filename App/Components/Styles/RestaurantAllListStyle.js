import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : Metrics.doubleBaseMargin
  },
  img : {
    width: 100,
    height : 100,  
    borderRadius : 10,
    alignItems : 'flex-end'
  },
  
  icon_heart : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    margin : Metrics.baseMargin,
  },
  
  detail_view : {
    marginLeft : Metrics.baseMargin,
  },

  txt_title: {
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
    // width: 120,
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
