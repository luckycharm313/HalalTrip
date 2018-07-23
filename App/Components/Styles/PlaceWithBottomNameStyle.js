import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginRight : Metrics.baseMargin,
    alignItems: 'center',
  },
  place_img : {
    width: Metrics.width_10,
    height : Metrics.height_10,  
    borderRadius : (Metrics.width_10) * 0.08,
  },
  place_title: {
    marginTop : Metrics.baseMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.small+1,
    fontFamily      : Fonts.type.base,
  }
})
