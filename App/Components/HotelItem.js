import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/HotelItemStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class HotelItem extends Component {
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
    const {title, rating, location, img_url} = this.props.data

    const cost = '$239'
    const review = '8.8'
    return (
      <TouchableOpacity style={styles.container}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri: img_url}} >
          <Icon name="heart" style = {styles.icon_heart} />  
        </ImageBackground>
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
      </TouchableOpacity>
    )
  }
}
