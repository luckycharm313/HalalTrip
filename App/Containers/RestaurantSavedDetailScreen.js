import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, WebView, Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StarRating from 'react-native-star-rating';

// Styles
import styles from './Styles/RestaurantSavedDetailScreenStyle'
import { Metrics, Colors } from '../Themes'
import NavBar from '../Components/NavBar'
import RestaurantAction from '../Redux/RestaurantRedux'
import { strings } from '../../locales/i18n';
import HTML from 'react-native-render-html'

class RestaurantSavedDetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation
    const _name = this._getPlaceName(params.placeName)
    this.state = {
      restaurantId : params.restaurantId,
      placeName : _name,
      roomOrderData : ["7:30 AM", "8:00 AM", "8:30 AM"],
    }
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

  componentWillMount(){
    this.props.getSavedDetail(this.state.restaurantId)
  }

  render () {
    const savedRestaurantDetailData = this.props.savedRestaurantDetailData? this.props.savedRestaurantDetailData:[]
    const {title, description, phone, rating, location, img_url} = savedRestaurantDetailData
    // const detailImages = restaurantDetailData.detailImages? restaurantDetailData.detailImages :[]
    const _rating = Number.parseFloat(rating)

    const _renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <Image
            source={{uri: htmlAttribs.src?htmlAttribs.src:"", width: Metrics.screenWidth - 30, height: Metrics.screenWidth * 60 / 100}}
            style={{marginVertical : 10}}
            {...passProps} />)
      },
      iframe: (htmlAttribs, children, passProps)=>{
        return(
          <WebView
            style={{borderWidth: 1, borderColor: 'red', width: Metrics.screenWidth - 30, height: Metrics.screenWidth * 60 / 100}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: htmlAttribs.src?htmlAttribs.src:""}}
          />
        )
      }
    }

    return (
      <ScrollView style={styles.mainContainer}>
        <View style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <ImageBackground style={styles.view_photo} source={{uri: Platform.OS === 'android' ? 'file://' + img_url : '' + img_url}}>
            {/* <View style={styles.photo_action}> 
              <View style={styles.photo_number}>
                <Text style={styles.txt_number}>1/5</Text>
              </View>
            </View> */}
          </ImageBackground>

          <View style={styles.restaurant_header_section}>
            <Text style={styles.txt_country}>{this.state.placeName}</Text>
            <Text style={styles.txt_restaurant_label}>{title}</Text>
            <View style={styles.rating_view}>
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
              <Text style={styles.txt_rating}>{rating}</Text>
            </View>
            <View style={styles.price_view}>
              <Text style={styles.txt_description_label}>{strings('hotel.information')}</Text>
              <View style={styles.action_view}>
                <View>
                  <Text style={styles.txt_description_detail}>Monday - Thursday &nbsp;&nbsp;&nbsp; 10:00 AM - 11:00 PM</Text>
                  <Text style={styles.txt_description_detail}>Friday - Sunday &nbsp;&nbsp;&nbsp; 12:00 PM - 5:00 AM</Text>
                </View>
                <TouchableOpacity style={styles.btn_action}>
                  <Icon name="share" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>
              <View style={styles.action_view}>
                <Text style={styles.txt_action}>{location}</Text>
                <TouchableOpacity style={styles.btn_action}>
                  <Icon name="location-on" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>

              <View style={styles.action_view}>
                <Text style={styles.txt_action}>{phone}</Text>
                <TouchableOpacity style={styles.btn_action}>
                  <Icon name="local-phone" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>
            </View>
           
          </View>

          {/* <ScrollView horizontal={true} style={styles.room_view} showsHorizontalScrollIndicator={false}>
            {
              this.state.roomOrderData.map(element => (
                <View style={styles.room_section} key={element}>
                  <Text style={styles.txt_room}>{element}</Text>
                  <Text style={styles.txt_room}>Dining Room</Text>
                </View>
              ))
            }
          </ScrollView> */}

          <View style={styles.description_section}>
              <Text style={styles.txt_description_label}>{strings('global.description')}</Text>
              <HTML
                html={description}
                renderers={_renderers}
                onLinkPress={(evt, href) => this.externalLink(href)}
                />
          </View>

          <View style={styles.reservation_section}>
            <View style={styles.reservation_rating}>
              <Text style={styles.txt_reservation_label} numberOfLines={1} ellipsizeMode ={'tail'}>{title}</Text>
              <View style={styles.rating_view}>
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
                <Text style={styles.txt_rating}>{rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.btn_reservation}>
              <Text style={styles.txt_room}>{strings('hotel.direction')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({restaurant}) => {
  return {
    savedRestaurantDetailData : restaurant.savedRestaurantDetailData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedDetail: (restaurantId) => dispatch(RestaurantAction.getSavedDetail(restaurantId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSavedDetailScreen)
