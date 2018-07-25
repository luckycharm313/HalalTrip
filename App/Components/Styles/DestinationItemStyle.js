import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'
export default StyleSheet.create({
  container: {
    flex: 1,
    marginRight : Metrics.baseMargin,
    alignItems: 'center',
  },
  img : {
    width: Metrics.width_60,
    height : Metrics.width_30,  
  },
  opacity_view : {
    backgroundColor: 'rgba(0,0,0,0.5)', 
    flex : 1, 
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
  },
  icon_dot : {
    color: Colors.font.default,
    fontSize        : 6,
    fontFamily      : Fonts.type.base,
  }
})
