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
      backgroundColor: Colors.primary
    },
    container: {
      flex: 1,
    },
  },  
}

export default ApplicationStyles
