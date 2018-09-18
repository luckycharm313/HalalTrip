import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewNumbers :{
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical: Metrics.paddingVertical,
  },
  itemContainer:{
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingVertical : Metrics.paddingVertical,
    paddingHorizontal : 10,
    borderBottomWidth : 1,
    marginBottom : 10,
    borderColor : Colors.lightBlack,
  },
  phone_icon:{
    marginRight : 10,
  },
  btn_action : {
    padding : Metrics.baseMargin,
    borderColor : Colors.font.textHintColor,
    borderRadius : 30,
    borderWidth : 1,
  },
  icon_action : {
    color: Colors.primary,
    fontSize        : Fonts.size.h5,
    fontFamily      : Fonts.type.base,
  },
  phone_number:{
    width : 150,
    marginRight : 10,
  },
  txt_phone_number:{
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  phone_description:{
    flex : 1,
  },
  txt_description:{
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
})
