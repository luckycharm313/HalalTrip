import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  navbar :{
    flex : 1,
  },
  label_section :{
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.baseMargin,
  },
  header_txt_title :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
  },

  itemView:{
    flexDirection : 'row',
    justifyContent : 'flex-start',   
    alignItems : 'center',
    marginTop : Metrics.baseMargin,
    marginBottom : Metrics.baseMargin,
    marginHorizontal : Metrics.paddingHorizontal,
    borderBottomWidth : 1,
    borderColor : Colors.lightBlack
  },
  txt_setting:{
    color: Colors.font.dark,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
    marginLeft : Metrics.baseMargin
  },
  icon_setting:{
    color: Colors.primary,
    fontSize        : Fonts.size.h5,
    fontFamily      : Fonts.type.base,
  },

})
