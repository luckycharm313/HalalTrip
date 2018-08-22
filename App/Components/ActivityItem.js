import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/ActivityItemStyle'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import {Colors} from '../Themes/'
import ActivityAction from '../Redux/ActivityRedux'

class ActivityItem extends Component {
  
  _onActivityDetail = () => {
    this.props.nav.navigate('ActivityDetailScreen', {activityId : this.props.data.id});
  }

  _onSave=()=>{
    const id = this.props.data.id
    this.props.saveActivityTotal(this.props.data)
  }

  render () {
    const {id, title, location,rating, img_url} = this.props.data
    
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
      <TouchableOpacity style={styles.container} onPress={this._onActivityDetail}>
        <ImageBackground 
          style={styles.img}
          imageStyle={{ borderRadius: 10}}
          source={{uri: img_url==null?"":img_url}} >
          <TouchableOpacity onPress = {this._onSave}>
          { icon }            
          </TouchableOpacity> 
        </ImageBackground>
        {/* <Text style={styles.txt_rating}>{sub_title}</Text>           */}
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

const mapStateToProps = ({activity}) => {
  return {
    savedIds : activity.savedIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveActivityTotal : (data) =>dispatch(ActivityAction.saveActivityTotal(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityItem)