import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  img : {
    margin : Metrics.smallMargin,
  },
  opacity_view : {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 10,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    justifyContent : 'flex-end',  
  },
  txt_title: {
    marginTop : Metrics.baseMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  txt_detail: {
    marginTop : Metrics.smallMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  }
})
