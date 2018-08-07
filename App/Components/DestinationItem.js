import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './Styles/DestinationItemStyle'

export default class DestinationItem extends Component {
  
  render () {
    const {title, hotel_count, restaurant_count, img_url} = this.props.data
    let detail = (hotel_count > 0 ? hotel_count +" hotels   ":"") + (restaurant_count > 0 ? restaurant_count +" restaurants":"")
    
    return (
      <TouchableOpacity style={styles.container}>
          <ImageBackground 
            style={styles.img}
            imageStyle={{ borderRadius: 10}}
            source={{uri : img_url}}>
            <View style={styles.opacity_view} >
              <Text style={styles.txt_title}>{title}</Text>
              <Text style={styles.txt_detail}>{detail}</Text>
            </View>
          </ImageBackground>        
      </TouchableOpacity>
    )
  }
}
