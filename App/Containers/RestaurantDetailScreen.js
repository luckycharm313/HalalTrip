import React, { Component } from 'react'
import { Share, ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, Linking, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import StarRating from 'react-native-star-rating';
// import Share, {ShareSheet, Button} from 'react-native-share';
import InfiniteScroll from 'react-native-infinite-scroll'
import HTML from 'react-native-render-html'

// Styles
import styles from './Styles/RestaurantDetailScreenStyle'
import { Images, Colors, Metrics } from '../Themes'
import NavBar from '../Components/NavBar'
import RestaurantList from '../Components/RestaurantList'
import RestaurantAction from '../Redux/RestaurantRedux'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call'
import Modal from "react-native-modal";

import { strings } from '../../locales/i18n';

class RestaurantDetailScreen extends Component {
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
      modalVisible: false,
      starCount : 0,
      subRestaurantData: [],
      tempRestaurantData: [],
      pageRestaurant: 0,
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
    this.props.getRestaurantDetail(this.state.restaurantId)
  }

  _renderRestaurantData = ({item})=> {
      return( <RestaurantList data = {item} nav={this.props.navigation} /> )
  }
  _onMapView =()=>{
    this.props.navigation.navigate('MapViewScreen',{
      street_lat : this.props.restaurantDetailData.street_lat, 
      street_lng : this.props.restaurantDetailData.street_lng,
      title : this.props.restaurantDetailData.title
    });
  }
  
  _onGiveRating =()=>{
    this.setState({modalVisible: true})
  }

  _onDial=()=> {
    const phoneNumber = this.props.restaurantDetailData.phone
    RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
    // let url = `tel:${phoneNumber}`
    // console.log('url => ', url)
    // Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  
  _onShare=()=> {
    Share.share({
      message : this.props.restaurantDetailData.post_url
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

  onStarRatingPress = (rating)=> {
    this.setState({
      starCount: rating
    });
  }
  _onModalCancel =()=>{
    this.setState({modalVisible: false})
  }
  _onModalOK =()=>{
    this.setState({modalVisible: false})
    let id = this.props.restaurantDetailData.id
    let rate = this.state.starCount
    this.props.setRestaurantRate(id, rate)
  }

  componentWillReceiveProps(nextProps){
    const restaurantDetailData = nextProps.restaurantDetailData? nextProps.restaurantDetailData:[]
    const subRestaurantData = nextProps.subRestaurantData? nextProps.subRestaurantData:[]
    const {rating} = restaurantDetailData
    const _rating = Number.parseFloat(rating)
    this.setState({starCount : _rating})
    
    if(subRestaurantData.length>0){
      this.setState({subRestaurantData})

      let _temp=[]
      subRestaurantData.forEach(function (value, index) {
        if(index < 3){
          _temp.push(value)
        }
      });
      this.setState({tempRestaurantData:_temp})
    }    
  }
  
  loadMoreSimilarRestaurants =()=>{
    var _rd = this.state.subRestaurantData
    var _pg = this.state.pageRestaurant
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*3){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempRestaurantData:_temp})
      this.setState({pageRestaurant: _pg})
    }
  }

  render () {
    const restaurantDetailData = this.props.restaurantDetailData? this.props.restaurantDetailData:[]
    const subRestaurantData = this.props.subRestaurantData? this.props.subRestaurantData:[]
    const {id, title, description, phone, rating, location, img_url, post_url} = restaurantDetailData
    // const detailImages = restaurantDetailData.detailImages? restaurantDetailData.detailImages :[]
    const _rating = Number.parseFloat(rating)
    
    let similarRestaurantView = null
    if(subRestaurantData.length > 0 ){
      similarRestaurantView = (
        <View style={styles.section}>
          <Text style={styles.txtSectionTitle}>{strings('restaurant.similar_restaurant')} in {this.state.placeName}</Text>
          <InfiniteScroll
              horizontal={true}
              onLoadMoreAsync={this.loadMoreSimilarRestaurants}
              distanceFromEnd={10}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.tempRestaurantData}
                renderItem={this._renderRestaurantData}
                keyExtractor={(item, index) => index.toString()}
              />
          </InfiniteScroll>          
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
    this.props.savedIds.forEach(element => {
      if(element == id){
        icon = <FontAwesome name="heart" style = {styles.icon_heart_save} />
      }  
    })

    return (
      <ScrollView style={styles.mainContainer}>
        <View style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setState({ modalVisible: false })}
            style={styles.modal}>
            <View style={styles.modalView}>
              <View style={styles.modal_section}>
                <Text style={styles.modal_title_text}>Please rate to the {title}</Text>
              </View>
              <View style={styles.modal_section}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    fullStarColor={Colors.primary}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starSize = {25}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
              </View>
              <View style={styles.modal_section_btn}>
                <TouchableOpacity style={styles.modal_btn_cancel} onPress={this._onModalCancel}>
                  <Text style={styles.modal_btn_txt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modal_btn_ok} onPress={this._onModalOK}>
                  <Text style={styles.modal_btn_txt}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
            <TouchableOpacity style={styles.rating_view} onPress={this._onGiveRating}>
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
                  selectedStar={() => this._onGiveRating()}
                />
              <Text style={styles.txt_rating}>{rating}</Text>
            </TouchableOpacity>
            <View style={styles.price_view}>
              {/* <Image style={styles.icon_money} source={Images.icon_money} resizeMode='contain' />
              <View style={styles.price_detail_view}>
                <Text style={styles.txt_price_detail_label}>Price Range</Text>
                <Text style={styles.txt_price_detail}>Around $80 per person</Text>
              </View> */}
              <Text style={styles.txt_description_label}>{strings('hotel.information')}</Text>
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
              <Text style={styles.txt_description_label}>{strings('global.description')}</Text>
              <HTML
                html={description}
                renderers={_renderers}
                onLinkPress={(evt, href) => this.externalLink(href)}
                />
          </View>

         {similarRestaurantView}

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
    restaurantDetailData : restaurant.restaurantDetailData,
    subRestaurantData : restaurant.subRestaurantData,
    savedIds : restaurant.savedIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantDetail : (restaurantId) => dispatch(RestaurantAction.getRestaurantDetail(restaurantId)),
    setRestaurantRate : (id, rate) => dispatch(RestaurantAction.setRestaurantRate(id, rate)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetailScreen)
