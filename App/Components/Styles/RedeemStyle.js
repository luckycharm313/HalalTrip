import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  img : {
    width : '100%',
    height : Metrics.width_60,  
  },
  opacity_view : {
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 10,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  close_view_section : {
    width: '100%',
    alignItems : 'flex-end',
  },
  close_view : {    
    padding : Metrics.smallMargin,
  },
  icon_close : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  txt_title : {
    color: Colors.font.default,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
    paddingHorizontal : Metrics.baseMargin,
    textAlign : 'center',
    marginTop : Metrics.section,
  },
  btn : {
    backgroundColor : Colors.primary,
    borderRadius : 5,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    marginTop : Metrics.section,
  },
  txtBtn :{
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
})
