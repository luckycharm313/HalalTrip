import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  navbar :{
    width: '100%',
    position : 'absolute',
    // top : Platform.OS=='ios' ? 20: 0,
    zIndex : 1000,
  },
  map_view : {
    // flex : 1,   
    height : Metrics.screenHeight,
  },

  direct_view : {
    position : 'absolute',
    bottom : 30,
    right : 20,
  },

  icon_map : {
    width : 50,
    height : 50,
  },

})
