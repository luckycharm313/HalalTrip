import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/TouristHListStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import {Colors, Images} from '../Themes/'
import TouristAction from '../Redux/TouristRedux'

class TouristHList extends Component {
  _onTouristDetail =()=>{
    this.props.nav.navigate('TouristDetailScreen', {touristId : this.props.data.id, placeName : this.props.data.placeName})
  }

  _getPlaceName = (arrName) =>{
    if(arrName){
      let full_name= ''
      arrName.forEach((element, index) => {
        if(index > 0){
          full_name += ", "+element['place']
        }
        else{
          full_name = element['place']
        }
      })
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
    
    // const review=''
    let icon = <Icon name="heart" style = {styles.icon_heart} />
    // this.props.savedIds.forEach(element => {
    //   if(element == id){
    //     icon = <FontAwesome name="heart" style = {styles.icon_heart_save} />
    //   }  
    // })

    return (
      <TouchableOpacity style={styles.container} onPress = {this._onTouristDetail}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri: img_url==null?"":img_url}} 
          // source={img_url?{uri: img_url}:Images.loading} 
          >
          <TouchableOpacity onPress = {this._onSave}>
          { icon }            
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.txt_rating} numberOfLines={1} ellipsizeMode ={'tail'}>{country}</Text>          
        <Text style={styles.txt_title} numberOfLines={1} ellipsizeMode ={'tail'}>{title}</Text>          
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
const mapStateToProps = ({tourist}) => {
  return {
    savedIds : tourist.savedIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TouristHList)