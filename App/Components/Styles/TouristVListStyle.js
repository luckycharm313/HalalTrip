import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : Metrics.doubleBaseMargin,
  },
  img : {
    width: 100,
    height : 100,  
    borderRadius : 10,
    alignItems : 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)'
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
  detail_view : {
    marginLeft : Metrics.baseMargin,
    flex : 1,
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
  view_location :{
    paddingVertical : 2,
    flexDirection : 'row',
    alignItems : 'center',
    paddingRight: 10,    
  },
  txt_location : {
    flex : 1,
    color: Colors.lightGrey,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
    marginLeft : 5    
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
