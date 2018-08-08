import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/HotelListStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class HotelList extends Component {
  _goToHotelDetail=()=>{
    this.props.nav.navigate('HotelDetailScreen', {hotelId : this.props.data.id});
  }
  
  render () {
    const {title, rating, location, img_url} = this.props.data

    const cost = '$239'
    const review = '8.8'

    return (
      <TouchableOpacity style={styles.container} onPress={this._goToHotelDetail}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri: img_url}} >
          <Icon name="heart" style = {styles.icon_heart} />  
        </ImageBackground>
        <View style={styles.detail}>
          <Text style={styles.txt_rating}>{rating} Stars</Text>          
          <Text style={styles.txt_title}>{title}</Text>          
          <Text style={styles.txt_location} numberOfLines={1} ellipsizeMode ={'tail'}>
            <Icon name="location-pin" style = {styles.icon_location} />
            &nbsp;&nbsp;{location}
          </Text>
          <Text style={styles.txt_cost}>{cost} per night</Text>
          <View style={styles.review_section}>
            <Text style={styles.txt_review}>{review}</Text>
            <Text style={styles.txt_md}> Very Good</Text>
          </View>
        </View>
        
      </TouchableOpacity>
    )
  }
}
