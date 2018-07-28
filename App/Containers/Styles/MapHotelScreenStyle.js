import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  navbar :{
    width: '100%',
    position : 'absolute',
    top : Platform.OS=='ios' ? 20: 0,
    zIndex : 1000,
  },
  map_view :{
    height : Metrics.height_map,
  },

  section : {
    marginTop : Metrics.section,
    marginLeft : Metrics.paddingHorizontal,
  },
  section_header: {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  more_area: {
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : 2,
  },
  txtLabelSm: {
    color: Colors.font.textHintColor,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },
  txtSectionTitle : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
    marginBottom : Metrics.baseMargin,
  },
})
