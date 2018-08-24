import { StyleSheet, Dimensions } from 'react-native'
const {width, height, scale} = Dimensions.get("window")
import { Metrics, Colors, Fonts } from '../../Themes/'
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems : 'center',
    justifyContent : 'center',
  },
  spinner : {
    width: width,
    height : height,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : Colors.lightBlack
  }
})
