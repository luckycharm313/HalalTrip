import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bg_container : {
    width : Metrics.screenWidth,
    height : Metrics.screenHeight,
  },
  skip_section : {
    width: '100%',
    flexDirection: 'row',
    justifyContent : 'flex-end',
    position: 'absolute',
    top : 0
  },
  btn_skip : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
  },
  txt_skip : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },

  title_section : {
    // marginTop : Metrics.marginTop_40,
    paddingHorizontal : Metrics.middleMargin,    
    marginBottom : 50,
  },
  txt_place_title : {
    color: Colors.font.default,
    fontSize        : Fonts.size.h0,
    fontFamily      : Fonts.type.base,
  },
  txt_place_description : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.medium,
    fontFamily      : Fonts.type.base,
  },

  place_section : {
    // marginTop : Metrics.doubleBaseMargin,
    marginLeft: Metrics.middleMargin,
    marginBottom : 80,
  },

  bottom_section : {
    width: '100%',
    flexDirection: 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: Metrics.marginBottom_30,
  },
  oval_section : {
    flexDirection: 'row',
  },
  oval_image_first_child : {
    marginLeft : Metrics.paddingHorizontal,
  },
  oval_image: {
    marginLeft : Metrics.smallMargin,
  },
})
