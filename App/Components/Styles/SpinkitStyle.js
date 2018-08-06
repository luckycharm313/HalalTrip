import { StyleSheet, Dimensions } from 'react-native'
const {width, height, scale} = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1
  },
  spinner : {
    "width": width,
    "alignItems": "center"
  }
})
