import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    backgroundColor : Colors.font.default,
  },
  navbar :{
    top : Platform.OS=='ios' ? 20: 0,
  },
  tabs : {
  }
})
