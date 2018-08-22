import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/HotelListStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HotelAction from '../Redux/HotelRedux'

class HotelList extends Component {
  _goToHotelDetail=()=>{
    this.props.nav.navigate('HotelDetailScreen', {hotelId : this.props.data.id});
  }
  
  _onSave=()=>{
    const id = this.props.data.id
    this.props.saveHotelTotal(this.props.data)
  }

  render () {
    const {id, title, rating, location, img_url} = this.props.data

    const cost = '$239'
    const review = '8.8'

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
          source={{uri: img_url==null?"":img_url}} >
          <TouchableOpacity onPress = {this._onSave}>
          { icon }            
          </TouchableOpacity> 
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

export default connect(mapStateToProps, mapDispatchToProps)(HotelList)