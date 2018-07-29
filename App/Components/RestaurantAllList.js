import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/RestaurantAllListStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import StarRating from 'react-native-star-rating';
import {Colors} from '../Themes/'

export default class RestaurantAllList extends Component {
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
    const {title, country, location, review, img_url} = this.props.data

    return (
      <TouchableOpacity style={styles.container}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={img_url} >
          <Icon name="heart" style = {styles.icon_heart} />  
        </ImageBackground>
        <View style={styles.detail_view}>
          <Text style={styles.txt_rating}>{country}</Text>          
          <Text style={styles.txt_title}>{title}</Text>          
          <Text style={styles.txt_location} numberOfLines={1} ellipsizeMode ={'tail'}>
            <Icon name="location-pin" style = {styles.icon_location} />
            &nbsp;&nbsp;{location}
          </Text>
          <View style={styles.review_section}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={4}
              fullStarColor={Colors.primary}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starSize = {15}
            />
            <Text style={styles.txt_md}>{review}</Text>
          </View>
        </View>        
      </TouchableOpacity>
    )
  }
}
