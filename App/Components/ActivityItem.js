import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/ActivityItemStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import {Colors} from '../Themes/'

export default class ActivityItem extends Component {
  
  _onActivityDetail = () => {
    this.props.nav.navigate('ActivityDetailScreen', {activityId : this.props.data.id});
  }

  render () {
    const {title, sub_title, location,rating, img_url} = this.props.data
    
    const cost = '$239'
    const review = '8.8'
    let _rating = Number.parseFloat(rating)
    let icon = <Icon name="heart" style = {styles.icon_heart} />

    return (
      <TouchableOpacity style={styles.container} onPress={this._onActivityDetail}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri: img_url}} >
          <TouchableOpacity onPress = {this._onSave}>
          { icon }            
          </TouchableOpacity> 
        </ImageBackground>
        <Text style={styles.txt_rating}>{sub_title}</Text>          
        <Text style={styles.txt_title}>{title}</Text>          
        <Text style={styles.txt_location} numberOfLines={1} ellipsizeMode ={'tail'}>
          <Icon name="location-pin" style = {styles.icon_location} />
          &nbsp;&nbsp;{location}
        </Text>
        <Text style={styles.txt_cost}>{cost} per person</Text>
        <View style={styles.review_section}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={_rating}
            fullStarColor={Colors.primary}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            starSize = {15}
          />
          <Text style={styles.txt_md}>{review} reviews</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
