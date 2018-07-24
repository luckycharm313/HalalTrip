import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default
  },
  navbar : {
    height : Metrics.navBarHeight,
    justifyContent    : 'space-between',
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : Metrics.baseMargin,
    borderBottomWidth : 1,
    borderColor : Colors.font.textHintColor
  },
  backIcon : {
    padding : Metrics.smallMargin
  },  
  icon_back : {
    color : Colors.primary,
    fontSize : Fonts.size.h4,
    // borderWidth : 1,
    // borderColor : 'blue'
  },
  screen_title : {
    color: Colors.font.grey,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },

  body_section : {
    paddingHorizontal : Metrics.paddingHorizontal,
  },
  description_txt : {
    marginTop : Metrics.doubleSection,
    paddingHorizontal : Metrics.middleMargin,
    color: Colors.font.grey,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    textAlign : 'center',
  },
  input_area : {
    backgroundColor : Colors.inputBox,
    borderRadius : 8,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin+4,
    color: Colors.font.dark,
    fontSize   : Fonts.size.regular,
    fontFamily : Fonts.type.base,
    marginTop : Metrics.doubleSection,
  },
  btnSignIn : {
    alignItems : 'center',
    backgroundColor : Colors.primary,
    borderRadius : 8,
    paddingVertical : Metrics.marginVertical,
    marginTop : Metrics.paddingHorizontal,
  },
  txtSignIn : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
})
