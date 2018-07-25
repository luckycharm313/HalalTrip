import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/RedeemStyle'
import { Metrics, Colors, Fonts, Images } from '../Themes/'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Redeem extends Component {

  render () {
    return (
      <View style={styles.container}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={Images.image2}>
          <View style={styles.opacity_view} >
            <View style={styles.close_view_section} >
              <TouchableOpacity style={styles.close_view}>
                <Icon name="close" style = {styles.icon_close} />
              </TouchableOpacity>
            </View>
            <Text style = {styles.txt_title}>Use promo code 'Discover Earth' to</Text>
            <TouchableOpacity style={styles.btn} >
              <Text style={styles.txtBtn}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>        
      </View>
    )
  }
}
