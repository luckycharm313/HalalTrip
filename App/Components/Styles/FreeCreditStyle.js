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
  txt_view : {
    width: '100%',
    alignItems : 'flex-start',
  },
  txt_title : {
    color: Colors.font.default,
    fontSize        : Fonts.size.h4,
    fontFamily      : Fonts.type.base,
    fontWeight :'600',
    paddingHorizontal : Metrics.paddingHorizontal,
    marginTop : Metrics.section,
  },
  btn : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    marginTop : Metrics.doubleBaseMargin,
  },
  txtBtn :{
    color: Colors.font.default,
    fontSize        : Fonts.size.medium-2,
    fontFamily      : Fonts.type.base,
  },
})
