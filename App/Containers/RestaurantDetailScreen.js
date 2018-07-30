import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StarRating from 'react-native-star-rating';
// Styles
import styles from './Styles/RestaurantDetailScreenStyle'
import { Images, Colors } from '../Themes'
import NavBar from '../Components/NavBar'
import RestaurantList from '../Components/RestaurantList'

class RestaurantDetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      roomOrderData : ["7:30 AM", "8:00 AM", "8:30 AM"],
      restaurantData : [{
        title : 'Coco Bamboo Resto & Bar',
        country : 'Italian',
        location : 'Milan City Center',
        review : '4.9',
        img_url : Images.image4,
      },{
        title : 'Moon Rodrigo Mezzanine',
        country : 'Mexican',
        location : 'Birmingham',
        review : '4.9',
        img_url : Images.image1,
      },{
        title : 'Elia & Sushi Today',
        country : 'Japanese',
        location : 'Tokyo',
        review : '4.9',
        img_url : Images.image2,
      }],
    }
  }

  _renderRestaurantData = ({item})=> {
    return( <RestaurantList data = {item} /> ) 
  }

  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <ImageBackground style={styles.view_photo} source={Images.image1}>
            <View style={styles.photo_action}> 
              <View style={styles.photo_number}>
                <Text style={styles.txt_number}>1/5</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.restaurant_header_section}>
            <Text style={styles.txt_country}>Italian</Text>
            <Text style={styles.txt_restaurant_label}>Coco Bamboo Resto & Bar</Text>
            <View style={styles.rating_view}>
              <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={4}
                  fullStarColor={Colors.primary}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  starSize = {15}
                />
              <Text style={styles.txt_rating}>4.9(349 ratings)</Text>
            </View>
            <View style={styles.price_view}>
              <Image style={styles.icon_money} source={Images.icon_money} resizeMode='contain' />
              <View style={styles.price_detail_view}>
                <Text style={styles.txt_price_detail_label}>Price Range</Text>
                <Text style={styles.txt_price_detail}>Around $80 per person</Text>
              </View>
            </View>
            <View style={styles.order_section}>
              <View style={styles.order_view}>
                <Text style={styles.txt_order}>Table for 2 Jun 14</Text>
              </View>
              <TouchableOpacity style={styles.btn_view}>
                <Text style={styles.change_btn_txt}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView horizontal={true} style={styles.room_view} showsHorizontalScrollIndicator={false}>
            {
              this.state.roomOrderData.map(element => (
                <View style={styles.room_section}>
                  <Text style={styles.txt_room}>{element}</Text>
                  <Text style={styles.txt_room}>Dining Room</Text>
                </View>
              ))
            }
          </ScrollView>

          <View style={styles.description_section}>
              <Text style={styles.txt_description_label}>Description</Text>
              <Text style={styles.txt_description_detail}>Coco Bamboo Resto & Bar is the latest and greatest from a certain downtown Milan restauranteur that needs no introd..</Text>

              <Text style={styles.txt_description_label}>Information</Text>
              <Text style={styles.txt_description_detail}>Monday - Thursday &nbsp;&nbsp;&nbsp; 10:00 AM - 11:00 PM</Text>
              <Text style={styles.txt_description_detail}>Friday - Sunday &nbsp;&nbsp;&nbsp; 12:00 PM - 5:00 AM</Text>

              <View style={styles.action_view}>
                <Text style={styles.txt_action}>34 Panderman St. Gading Kasri, Malang 65115 Indonesia</Text>
                <TouchableOpacity style={styles.btn_action}>
                  <Icon name="near-me" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>

              <View style={styles.action_view}>
                <Text style={styles.txt_action}>(0341) 958-234</Text>
                <TouchableOpacity style={styles.btn_action}>
                  <Icon name="local-phone" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.txtSectionTitle}>Similar Restaurants in Milan</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.restaurantData}
                renderItem={this._renderRestaurantData}
                keyExtractor={(item, index) => index}
              />
          </View>

          <View style={styles.reservation_section}>
            <View style={styles.reservation_rating}>
              <Text style={styles.txt_reservation_label} numberOfLines={1} ellipsizeMode ={'tail'}>Coco Bamboo</Text>
              <View style={styles.rating_view}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={4}
                    fullStarColor={Colors.primary}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starSize = {15}
                  />
                <Text style={styles.txt_rating}>4.9</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.btn_reservation}>
              <Text style={styles.txt_room}>Reservation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetailScreen)
