import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  searchResult :{
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.paddingVertical
  }
})
