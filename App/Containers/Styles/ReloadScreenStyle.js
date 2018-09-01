import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container :{
    flex : 1,
    // justifyContent : 'center',
  },
  img_view :{
    marginTop : 50,
    alignItems : 'center', 
  },
  img_404 :{
    width : 200,
    height : 200,
  },
  error_view :{
    alignItems : 'center', 
    marginTop: 50,
    paddingHorizontal : 15,
  },
  txtTitle :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.h3,
    fontFamily      : Fonts.type.base,
  },
  txtSub :{
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  btnHome :{
    marginTop: 20,
    width : 180,
    backgroundColor : Colors.primary,
    // paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    borderRadius : 5,
  },
  txtBtn :{
    color: Colors.font.default,
    fontSize        : 15,
    fontFamily      : Fonts.type.base,
    textAlign : 'center',
  },

  btnLogOut :{
    marginTop: 20,
    width : 180,
    backgroundColor : Colors.lightGrey,
    // paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
    borderRadius : 5,
  },
})
