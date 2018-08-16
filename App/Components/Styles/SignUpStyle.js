import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical : Metrics.doubleBaseMargin,
    paddingHorizontal : Metrics.paddingHorizontal,
  },
  input_area : {
    backgroundColor : Colors.inputBox,
    borderRadius : 8,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin+4,
    color: Colors.font.dark,
    fontSize   : Fonts.size.regular,
    fontFamily : Fonts.type.base,
    marginTop : Metrics.baseMargin,
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
  policy_section : {
    marginTop : Metrics.baseMargin,
    alignItems : 'center',
    paddingVertical : Metrics.smallMargin,
    paddingHorizontal : Metrics.paddingHorizontal,
  },
  text_policy : {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
    textAlign : 'center',
  },
  btnSocial : {
    marginTop : Metrics.baseMargin,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
    borderRadius : 8,
    paddingHorizontal : Metrics.section,
    paddingVertical : Metrics.baseMargin
  },
  social_icon : {
    width: 20,
    height : 25,
  },
  social_txt : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
})
