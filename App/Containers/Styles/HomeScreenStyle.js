import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    flex: 1,
    backgroundColor : Colors.font.default,    
  },
  //header section
  header_section :{
    height : (Metrics.screenHeight) * 0.4,
  },
  header_txt_section : {
    flex : 1,
    position: "relative",
    alignItems : 'center',
    justifyContent : 'center',  
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom : 10,
  },
  header_txt_title : {
    color: Colors.font.default,
    fontSize        : Fonts.size.h0,
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
  search_view :{
    position: "absolute",
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    backgroundColor : Colors.font.default,
    borderRadius : 5,
    marginHorizontal : 25,
    padding : 5,
    bottom : -20,
    borderWidth : 2,
    borderColor: Colors.grey,
  },
  input_area :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
    paddingVertical : Metrics.smallMargin+2,
    paddingHorizontal : 10,
    flex: 1,
  },
  btnSearch :{
    padding: 5,
  },
  icon_search :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.h4,
    fontFamily      : Fonts.type.base,
  },

  // body section
  // category section
  section : {
    marginTop : Metrics.section,
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

  // deaction section
  deactive_section : {
    marginTop : Metrics.section,
    marginHorizontal : Metrics.paddingHorizontal,
  }
})
