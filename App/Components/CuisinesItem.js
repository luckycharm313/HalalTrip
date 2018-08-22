import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import styles from './Styles/CuisinesItemStyle'
import { Images, Colors } from '../Themes'

export default class CuisinesItem extends Component {
  _goToRestaurantPlace = (id, title) =>{
    this.props.nav.navigate('RestaurantPlaceScreen', {placeId : id, placeTitle : title});
  }
  render () {
    const {id , title, restaurant_count, img_url} = this.props.data
    return (
      <TouchableOpacity onPress={this._goToRestaurantPlace.bind(this, id, title)}>
        <ImageBackground 
          style={styles.container}
          source={{uri: img_url==null?"":img_url}}
          imageStyle={{ borderRadius: 8 }} >
          <View style={styles.opacity_view} >
            <Text style={styles.txt_title}>{title}</Text>
            <Text style={styles.txt_detail}>{restaurant_count} Restaurants</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}
