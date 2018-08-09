import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ImageBackground } from 'react-native'
import styles from './Styles/CuisinesItemStyle'
import { Images, Colors } from '../Themes'

export default class CuisinesItem extends Component {
  
  render () {
    const {title, restaurant_count, img_url} = this.props.data
    return (
      <ImageBackground 
        style={styles.container}
        source={{uri :img_url}}
        imageStyle={{ borderRadius: 8 }} >
        <View style={styles.opacity_view} >
          <Text style={styles.txt_title}>{title}</Text>
          <Text style={styles.txt_detail}>{restaurant_count} Restaurants</Text>
        </View>
      </ImageBackground>
    )
  }
}
