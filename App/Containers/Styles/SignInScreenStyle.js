import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  header_section :{
    height : (Metrics.screenHeight) * 0.38,    
  },
  header_txt_section : {
    flex : 1,
    alignItems : 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop : (Metrics.screenHeight) * 0.1, 
  },
  header_txt_title : {
    color: Colors.font.default,
    fontSize        : Fonts.size.h4,
    fontFamily      : Fonts.type.base,
  },
  header_txt_description : {
    marginTop : Metrics.baseMargin,
    paddingHorizontal : Metrics.middleMargin+30,
    color: Colors.font.default,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    textAlign : 'center',
  },

  tab_bar_section : {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  bar_section : {
    width: '50%',
    paddingVertical : Metrics.baseMargin,
  },
  bar_section_active : {
    width: '50%',
    paddingVertical : Metrics.baseMargin,
    borderBottomWidth : 3,
    borderColor : Colors.primary
  },
  txt_tab : {
    color: Colors.font.default,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
    textAlign : 'center',
  },
  txt_tab_active : {
    color : Colors.primary,
    fontSize : Fonts.size.input,
    fontFamily : Fonts.type.base,
    textAlign : 'center',
  },

  tab_body_section : {
    flex: 1,
    backgroundColor : Colors.font.default
  }
})
