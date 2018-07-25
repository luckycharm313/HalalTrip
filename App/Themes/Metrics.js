import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  paddingHorizontal: 15,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  middleMargin: 35,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  marginTop_40: (width < height ? height : width) * 0.35,
  marginBottom_30: 30,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 28,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },

  width_10 : (width < height ? width : height) * 0.25,
  height_10 : (width < height ? height : width) * 0.12,

  width_30 : (width < height ? width : height) * 0.32,
  height_30 : (width < height ? width : height) * 0.4,

  width_35 : (width < height ? width : height) * 0.4,
  height_20 : (width < height ? width : height) * 0.25,

  width_90 : (width < height ? width : height) * 0.9,
  height_60 : (width < height ? width : height) * 0.5,

  width_60 : (width < height ? width : height) * 0.6,
}

export default metrics
