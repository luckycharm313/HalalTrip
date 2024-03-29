import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ImageBackground, Platform} from 'react-native'
import styles from './Styles/HotelSavedListStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HotelAction from '../Redux/HotelRedux'
import StarRating from 'react-native-star-rating';
import {Colors} from '../Themes/'

class HotelSavedList extends Component {
  _goToHotelDetail=()=>{
    this.props.nav.navigate('HotelSavedDetailScreen', {hotelId : this.props.data.id});
  }
  
  _onSave=()=>{
    const id = this.props.data.id
    this.props.saveHotelTotal(this.props.data)
  }

  render () {
    const {id, title, rating, location, img_url} = this.props.data

    const cost = '$239'
    const review = '8.8'
    let _rating = Number.parseFloat(rating)
    let icon = <Icon name="heart" style = {styles.icon_heart} />
    this.props.savedIds.forEach(element => {
      if(element == id){
        icon = <FontAwesome name="heart" style = {styles.icon_heart_save} />
      }  
    })

    return (
      <TouchableOpacity style={styles.container} onPress={this._goToHotelDetail}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri: Platform.OS === 'android' ? 'file://' + img_url : '' + img_url}} >
          <TouchableOpacity onPress = {this._onSave}>
          { icon }            
          </TouchableOpacity> 
        </ImageBackground>
        <View style={styles.detail}>
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
            <Text style={styles.txt_rating}>  {rating} </Text>          
          </View>
          
          <Text style={styles.txt_title} numberOfLines={1} ellipsizeMode ={'tail'}>{title}</Text>          
          <Text style={styles.txt_location} numberOfLines={1} ellipsizeMode ={'tail'}>
            <Icon name="location-pin" style = {styles.icon_location} />
            &nbsp;&nbsp;{location}
          </Text>
          {/* <Text style={styles.txt_cost}>{cost} per night</Text>
          <View style={styles.review_section}>
            <Text style={styles.txt_review}>{review}</Text>
            <Text style={styles.txt_md}> Very Good</Text>
          </View> */}
        </View>        
      </TouchableOpacity>
    )
  }
}
const mapStateToProps = ({hotel}) => {
  return {
    savedIds : hotel.savedIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveHotelTotal : (data) =>dispatch(HotelAction.saveHotelTotal(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelSavedList)