import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bg_container : {
    width : Metrics.screenWidth,
    height : Metrics.screenHeight,
  },

  title_section : {
    marginTop : Metrics.marginTop_40+50,
    paddingHorizontal : Metrics.middleMargin,    
  },
  txt_place_title : {
    color: Colors.font.default,
    fontSize        : Fonts.size.h0,
    fontFamily      : Fonts.type.base,
  },
  txt_place_description : {
    marginTop : Metrics.baseMargin,
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },

  interested_section : {
    marginTop : Metrics.section,
    marginLeft: Metrics.middleMargin,
  },
  place_section : {    
    alignItems : 'flex-start', 
  },
  interested_line : {
    flexDirection: 'row',
    marginTop : Metrics.smallMargin  
  },
  activityComponet : {
    margin : 4,
    paddingHorizontal: Metrics.baseMargin+5,
    paddingVertical : 3,
    borderRadius : 20,
    borderWidth : 1,
    borderColor: Colors.font.default
  },
  activityComponet_active : {
    margin : 4,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical : 2,
    borderRadius : 20,
    borderWidth : 1,
    borderColor: Colors.font.default,
    backgroundColor : Colors.font.default
  },

  txt_activity : {
    color: Colors.font.default,
    fontSize : Fonts.size.medium,
    fontFamily  : Fonts.type.base,
  },
  txt_activity_active : {
    color: Colors.font.dark,
    fontSize : Fonts.size.medium,
    fontFamily  : Fonts.type.base,
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
  btn_skip : {
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
  },
  txt_skip : {
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },
})
