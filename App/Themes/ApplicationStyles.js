import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { Platform } from 'react-native'
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      paddingTop: Platform.OS=='ios' ? 20: 0,
      backgroundColor: Colors.transparent
    },
    container: {
      flex: 1,
      // paddingTop: Metrics.baseMargin,
      //backgroundColor: Colors.transparent
    },
  },  
}

export default ApplicationStyles
