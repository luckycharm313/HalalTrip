import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container : {
    backgroundColor : Colors.font.default,      
  },
  row_view :{
    paddingHorizontal : Metrics.baseMargin,
    paddingVertical : Metrics.baseMargin,  
    flexDirection : 'row',
  },
  col_md_6 :{
    width : '50%',
    justifyContent : 'flex-start',   
  },
})
