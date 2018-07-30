import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'
export default StyleSheet.create({
  container: {
    // flex: 1,
    height : Metrics.navBarHeight,
    alignItems : 'flex-start',
    justifyContent    : 'center',
    // backgroundColor : Colors.transparent
  },
  backIcon : {
    padding : Metrics.smallMargin
  },  
  icon_back : {
    color : Colors.primary,
    fontSize : Fonts.size.h4,
  },
})
