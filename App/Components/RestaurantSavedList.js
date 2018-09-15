import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ImageBackground, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import {Colors} from '../Themes/'
import RestaurantAction from '../Redux/RestaurantRedux'
import styles from './Styles/RestaurantSavedListStyle'

class RestaurantSavedList extends Component {
  _onRestaurantDetail =()=>{
    this.props.nav.navigate('RestaurantSavedDetailScreen', {restaurantId : this.props.data.id, placeName : this.props.data.placeName})
  }
  
  _onSave=()=>{
    const id = this.props.data.id
    this.props.saveRestaurantTotal(this.props.data)
  }

  _getPlaceName = (arrName) =>{
    if(arrName){
      let full_name= ''
      for (var index in arrName) {
        let element = arrName[index]
        if(index > 0){
          full_name += ", "+element['place']
        }
        else{
          full_name = element['place']
        }
      }
      
      return full_name
    }
    else{
      return ''
    }    
  }

  render () {
    const {id, title, placeName, location, rating, img_url} = this.props.data
    const _rating = Number.parseFloat(rating)
    let country = this._getPlaceName(placeName)
    
    return (
      <TouchableOpacity style={styles.container} onPress = {this._onRestaurantDetail}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri : Platform.OS === 'android' ? 'file://' + img_url : '' + img_url}} >
          <TouchableOpacity onPress = {this._onSave}>
            <FontAwesome name="heart" style = {styles.icon_heart_save} />
          </TouchableOpacity> 
        </ImageBackground>
        <View style={styles.detail_view}>
          <Text style={styles.txt_rating} numberOfLines={1} ellipsizeMode ={'tail'}>{country}</Text>          
          <Text style={styles.txt_title} numberOfLines={1} ellipsizeMode ={'tail'}>{title}</Text>
          <View style ={styles.view_location}>
            <Icon name="location-pin" style = {styles.icon_location} />
            <Text style={styles.txt_location} numberOfLines={1} ellipsizeMode ={'tail'}>
              {location}
            </Text>
          </View>
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
        </View>        
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = ({restaurant}) => {
  return {
    savedIds : restaurant.savedIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveRestaurantTotal : (data) =>dispatch(RestaurantAction.saveRestaurantTotal(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSavedList)