import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Images } from '../../Themes/'

export default StyleSheet.create({
  container: {
    width : 180,
    height : 90,
    marginRight : Metrics.doubleBaseMargin,      
  },
  opacity_view : {
    width : '100%',
    height : '100%',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: 'rgba(0,0,0,0.2)', 
    borderRadius: 8,
  },
  txt_title :{
    color: Colors.font.default,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  txt_detail :{
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
})
