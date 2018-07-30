import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container :{
    alignItems : 'center',
    backgroundColor : Colors.font.default,
    flex : 1,
  },
  view_wallpaper : {
    width : '100%',
    height : Metrics.height_map,
    justifyContent : 'center',   
    alignItems : 'center',
  },
  view_avatar : {
    borderWidth : 1,
    borderRadius : 40,
    borderWidth : 2,
    borderColor : Colors.font.default,
  },
  img_avatar : {
    width : 80,
    height : 80,
    borderRadius : 40,
  },
  txt_authour : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.h3,
    fontFamily      : Fonts.type.base,
    fontWeight : '600'
  },
  txt_email : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },
  view_edit_btn : {
    marginTop : Metrics.baseMargin,
    flexDirection : 'row',
    justifyContent : 'center',   
    alignItems : 'center',
    borderWidth : 1,
    borderColor : Colors.font.default,
    paddingHorizontal : 12,
    paddingVertical : 2,
    borderRadius : 20,
  },
  icon_edit : {
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    marginRight : Metrics.smallMargin,
  },
  txt_btn : {
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },

  view_options : {
    width: '85%',
    position : 'absolute',
    top : Metrics.height_map -30,
    height : Metrics.height_map - 20,
    borderRadius : 10,
    borderWidth : 1,
    backgroundColor : Colors.font.default,
    borderColor : '#F0F0F0',
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
  },
  setting_option:{
    flexDirection : 'row',
    justifyContent : 'space-between',   
    alignItems : 'center',
    marginTop : Metrics.baseMargin,
    marginBottom : Metrics.baseMargin,
  },
  txt_setting:{
    color: Colors.font.dark,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
  icon_setting:{
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
  },
})
