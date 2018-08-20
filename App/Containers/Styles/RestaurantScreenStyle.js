import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Images } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex : 1,
    backgroundColor : Colors.font.default,
  },
  header_section :{
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingTop : Metrics.section,
  },
  label_section :{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  header_txt_title :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
  },
  btnFilter :{
    padding : Metrics.smallMargin
  },
  txtFilter :{
    color: Colors.primary,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },

  search_section : {
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : Metrics.baseMargin,
    backgroundColor : Colors.inputBox,
    borderRadius : 6,
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical : Metrics.smallMargin,
  },
  icon_search :{
    color: Colors.font.textHintColor,
    fontSize   : Fonts.size.regular,
    fontFamily : Fonts.type.base,
  },
  input_area : {
    flex : 1,
    padding : 0,
    marginLeft : Metrics.baseMargin,
    color: Colors.font.dark,
    fontSize   : Fonts.size.medium,
    fontFamily : Fonts.type.base,
  },
  action_section : {
    marginTop : Metrics.baseMargin,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  filter_actions : {
    flexDirection : 'row',
    alignItems : 'center',
  },
  filter_view : {
    borderColor : Colors.font.textHintColor,
    borderWidth : 1,
    borderRadius : Metrics.smallMargin,
    marginRight : Metrics.smallMargin,
  },
  filter_label : {
    color: Colors.font.dark,
    fontSize   : Fonts.size.small,
    fontFamily : Fonts.type.base,
    marginHorizontal : Metrics.baseMargin,
    marginVertical : Metrics.smallMargin,
  },
  map_location : {
    borderWidth : 1,
    padding : 8,
    borderRadius : 30,
    borderColor : Colors.font.textHintColor
  },
  icon_location : {
    color: Colors.primary,
    fontSize   : Fonts.size.input,
    fontFamily : Fonts.type.base,
  },

  // category section
  section : {
    marginTop : Metrics.baseMargin,
    marginLeft : Metrics.paddingHorizontal,
  },
  txtSectionTitle : {
    color: Colors.font.dark,
    fontSize        : Fonts.size.h6,
    fontFamily      : Fonts.type.base,
    marginBottom : Metrics.baseMargin,
  },

  // hotel setion
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
    color: Colors.primary,
    fontSize        : Fonts.size.small,
    fontFamily      : Fonts.type.base,
  },
  icon_arrow_sm: {
    color: Colors.primary,
    fontSize        : Fonts.size.regular,
    fontFamily      : Fonts.type.base,
  },

})
