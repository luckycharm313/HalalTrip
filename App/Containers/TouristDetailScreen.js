import React, { Component } from 'react'
import { Share, Platform, ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, Linking, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import StarRating from 'react-native-star-rating';

import HTML from 'react-native-render-html'
// Styles
import styles from './Styles/TouristDetailScreenStyle'
import { Images, Colors, Metrics } from '../Themes'
import NavBar from '../Components/NavBar'
import TouristHList from '../Components/TouristHList'
import TouristAction from '../Redux/TouristRedux'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call'

class TouristDetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation
    const _name = this._getPlaceName(params.placeName)
    this.state = {
      touristId : params.touristId,
      placeName : _name,
    }
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

  componentWillMount(){
    this.props.getTouristDetail(this.state.touristId)
  }

  _renderTouristData = ({item})=> {
      return( <TouristHList data = {item} nav={this.props.navigation} /> )
  }
  _onMapView =()=>{
    this.props.navigation.navigate('MapViewScreen',{
      street_lat : this.props.touristDetailData.street_lat, 
      street_lng : this.props.touristDetailData.street_lng,
      title : this.props.touristDetailData.title
    });
  }

  _onDial=()=> {
    const phoneNumber = this.props.touristDetailData.phone
    RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
  }
  
  _onShare=()=> {
    Share.share({
      message : this.props.touristDetailData.post_url
    }).then(this._result);
  }
  
  _result =(result)=>{
    console.log("result=>", result);
  }

  externalLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
      }
      else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render () {
    const touristDetailData = this.props.touristDetailData? this.props.touristDetailData:[]
    const subTouristData = this.props.subTouristData? this.props.subTouristData:[]
    const {id, title, description, phone, rating, location, img_url, post_url} = touristDetailData
    // const detailImages = restaurantDetailData.detailImages? restaurantDetailData.detailImages :[]
    const _rating = Number.parseFloat(rating)

    let similarTouristView = null
    if(subTouristData.length > 0 ){
      similarTouristView = (
        <View style={styles.section}>
          <Text style={styles.txtSectionTitle}>Similar Tourist Attractions in {this.state.placeName}</Text>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={subTouristData}
              renderItem={this._renderTouristData}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
      )
    }

    const _renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <Image
            source={{uri: htmlAttribs.src?htmlAttribs.src:"", width: Metrics.screenWidth - 30, height: Metrics.screenWidth * 60 / 100}}
            style={{marginVertical : 10}}
            {...passProps} />)
      },
    }

    let icon = <SimpleIcon name="heart" style = {styles.icon_heart} />
    // this.props.savedIds.forEach(element => {
    //   if(element == id){
    //     icon = <FontAwesome name="heart" style = {styles.icon_heart_save} />
    //   }  
    // })

    return (
      <ScrollView style={styles.mainContainer}>
        <View style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <ImageBackground style={styles.view_photo} source={{uri: img_url==null?"":img_url}}>
            {/* <View style={styles.photo_action}> 
              <View style={styles.photo_number}>
                <Text style={styles.txt_number}>1/5</Text>
              </View>
            </View> */}
            {icon}
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
                  starSize = {25}
                />
              <Text style={styles.txt_rating}>{rating}</Text>
            </View>
            <View style={styles.price_view}>
              {/* <Image style={styles.icon_money} source={Images.icon_money} resizeMode='contain' />
              <View style={styles.price_detail_view}>
                <Text style={styles.txt_price_detail_label}>Price Range</Text>
                <Text style={styles.txt_price_detail}>Around $80 per person</Text>
              </View> */}
              <Text style={styles.txt_description_label}>Information</Text>
              <View style={styles.action_view}>
                <View>
                  <Text style={styles.txt_description_detail}>Monday - Thursday &nbsp;&nbsp;&nbsp; 10:00 AM - 11:00 PM</Text>
                  <Text style={styles.txt_description_detail}>Friday - Sunday &nbsp;&nbsp;&nbsp; 12:00 PM - 5:00 AM</Text>
                </View>
                <TouchableOpacity style={styles.btn_action} onPress={this._onShare}>
                  <Icon name="share" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>
              <View style={styles.action_view}>
                <Text style={styles.txt_action}>{location}</Text>
                <TouchableOpacity style={styles.btn_action} onPress={this._onMapView}>
                  <Icon name="location-on" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>

              <View style={styles.action_view}>
                <Text style={styles.txt_action}>{phone}</Text>
                <TouchableOpacity style={styles.btn_action} onPress={this._onDial}>
                  <Icon name="local-phone" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.order_section}>
              <View style={styles.order_view}>
                <Text style={styles.txt_order}>Table for 2 Jun 14</Text>
              </View>
              <TouchableOpacity style={styles.btn_view}>
                <Text style={styles.change_btn_txt}>Change</Text>
              </TouchableOpacity>
            </View> */}
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
              <Text style={styles.txt_description_label}>Description</Text>
              <HTML
                html={description}
                renderers={_renderers}
                onLinkPress={(evt, href) => this.externalLink(href)}
                />
          </View>

         {similarTouristView}

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
            <TouchableOpacity style={styles.btn_reservation} onPress={this._onMapView}>
              <Text style={styles.txt_room}>Get Direction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({tourist}) => {
  return {
    touristDetailData : tourist.touristDetailData,
    subTouristData : tourist.subTouristData,
    savedIds : tourist.savedIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTouristDetail : (touristId) => dispatch(TouristAction.getTouristDetail(touristId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TouristDetailScreen)
