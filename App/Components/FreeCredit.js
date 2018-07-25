import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/FreeCreditStyle'
import { Metrics, Colors, Fonts, Images } from '../Themes/'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class FreeCredit extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <ImageBackground 
        style={styles.img}
        imageStyle={{ borderRadius: 10}}
        source={Images.image3}>
        <View style={styles.opacity_view} >
          <View style={styles.close_view_section} >
            <TouchableOpacity style={styles.close_view}>
              <Icon name="close" style = {styles.icon_close} />
            </TouchableOpacity>
          </View>
          <View style = {styles.txt_view}>
            <Text style = {styles.txt_title}>Get free credits when you complete an experience</Text>
            <TouchableOpacity style={styles.btn} >
              <Text style={styles.txtBtn}>View more</Text>
            </TouchableOpacity>
          </View>          
        </View>
      </ImageBackground>        
    )
  }
}
