import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/RestaurantListStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import StarRating from 'react-native-star-rating';
import {Colors} from '../Themes/'

class RestaurantList extends Component {
  
  _onRestaurantDetail =()=>{
    this.props.nav.navigate('RestaurantDetailScreen', {restaurantId : this.props.data.id, placeName : this.props.data.placeName})
  }

  _onSave=()=>{
    const id = this.props.data.id
    console.log("restaurnat saved id ==> ", id)
  }

  render () {
    const {title, country, location, rating, img_url} = this.props.data
    const _rating = Number.parseFloat(rating)
    // const review=''
    return (
      <TouchableOpacity style={styles.container} onPress = {this._onRestaurantDetail}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri: img_url}} >
          <TouchableOpacity onPress = {this._onSave}>
            <Icon name="heart" style = {styles.icon_heart} />  
          </TouchableOpacity>
        </ImageBackground>
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
            rating={_rating}
            fullStarColor={Colors.primary}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            starSize = {15}
          />
          <Text style={styles.txt_md}>{rating}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = ({restaurant}) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList)