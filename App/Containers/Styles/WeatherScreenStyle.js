import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewWeather :{
    paddingHorizontal : Metrics.paddingHorizontal,
    paddingVertical: Metrics.paddingVertical,
  },
  itemContainer :{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingVertical : Metrics.middleMargin,
    paddingHorizontal : 10,
    borderBottomWidth : 1,
    borderColor : Colors.lightBlack,
  },
  itemWeather :{
    flex :1,
  },
  txt_date :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.h5,
    fontFamily      : Fonts.type.bold,
  },
  txt_description :{
    marginTop : 10,
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
  },
  itemIcon :{
    width : 100,
    alignItems : "center",
  },
  item_img :{
    width : 80,
    height : 80,
  },
  itemTemperature :{
    width : 100,
  },
  txt_temp :{
    color: Colors.font.dark,
    fontSize        : Fonts.size.input,
    fontFamily      : Fonts.type.base,
    textAlign : "right",
  },
})
