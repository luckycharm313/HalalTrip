import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginRight : Metrics.baseMargin,
    alignItems: 'center',
  },
  img : {
    width: Metrics.width_90-40,
    height : Metrics.width_90-40,  
  },
  opacity_view : {
    backgroundColor: 'rgba(0,0,0,0.5)', 
    flex : 1, 
    borderRadius: 10,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.doubleBaseMargin,
    justifyContent : 'flex-end',  
  },
  txt_title: {
    marginTop : Metrics.baseMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
  txt_detail: {
    marginTop : Metrics.section,
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  }
})

