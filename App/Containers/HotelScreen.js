import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/HotelScreenStyle'
import { Images, Colors } from '../Themes'
import HotelList from '../Components/HotelList'

class HotelScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterData: ['Jun 6-9', '2 guests'],
      featuredHotelImages : [Images.image1, Images.image4, Images.image2, Images.image3, Images.image4, Images.image2, Images.image3],
      featuredHotel : {
        title : 'New Clayton Hotel Birminghan',
        rating : '5',
        location : 'Bimingham City Center',
        cost : '$239',
        review : '8.8'
      },
      hotelData : [
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '5',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.8',
          img_url : Images.image4,
        },
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '4',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.2',
          img_url : Images.image3,
        },
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '5',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.8',
          img_url : Images.image2,
        },
      ]
    }
  }
  
  _renderHotelItem = ({item}) => (
    <HotelList
      data = {item}
    />
  )
  _onHotelDetail = () =>{
    this.props.navigation.navigate('HotelDetailScreen');
  }

  render () {
    const {title, rating, location, cost, review} = this.state.featuredHotel
    return (
      <ScrollView style={[styles.mainContainer, styles.container]}>
        <View style={styles.header_section}>
          <View style={styles.label_section}>
            <Text style={styles.header_txt_title}>Hotels</Text>
            <TouchableOpacity style={styles.btnFilter} onPress={this._onFilterBtn}>
              <Text style={styles.txtFilter}>Filters</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.search_section}>
            <Icon name="search" style = {styles.icon_search} />
            <TextInput
              ref = {'search'}
              name = {'Search' }
              type = {'TextInput'}
              underlineColorAndroid = {Colors.transparent}
              autoCapitalize = {'none'}
              autoCorrect = {false}
              placeholder = {'Search'}
              placeholderTextColor = {Colors.textHintColor}
              style = {styles.input_area}
              returnKeyType = 'go'
              selectionColor = {Colors.textHintColor}
              onChangeText = {(_search) => { this.setState({_search: _search})}}
              onChange = {this._onSearch}
              maxLength = {100}/>
          </View>
          <View style={styles.action_section}>
            <View style={styles.filter_actions}>
              {
                this.state.filterData.map(element => (
                  <View style={styles.filter_view}>
                    <Text style={styles.filter_label}>{element}</Text>
                  </View>
                ))
              }
            </View>
            <TouchableOpacity style={styles.map_location}>
              <Icon name="location-on" style = {styles.icon_location} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featured_hotel_section}>
          <Text style={styles.header_txt_title_md}>Featured Hotel</Text>
          <ScrollView horizontal={true} style={styles.hotel_img_section} showsHorizontalScrollIndicator={false}>
              {
                this.state.featuredHotelImages.map(element => (
                  <Image style={styles.img_featured_hotel} source={element}/>
                ))
              }
          </ScrollView>
          <TouchableOpacity onPress={this._onHotelDetail}>
            <Text style={styles.txt_rating}>{rating} Stars</Text>
            <Text style={styles.txt_title}>{title}</Text>
            <Text style={styles.txt_location} numberOfLines={1} ellipsizeMode ={'tail'}>
              <Icon name="location-on" style = {styles.icon_location} />
              &nbsp;&nbsp;{location}
            </Text>
            <Text style={styles.txt_cost}>{cost} per night</Text>
            <View style={styles.review_section}>
              <Text style={styles.txt_review}>{review}</Text>
              <Text style={styles.txt_md}> Very Good</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.hotel_list_section}>
          <Text style={styles.header_txt_title_md}>All Hotels</Text>
          <View style={styles.hotel_list_view}>
            <FlatList
              data={this.state.hotelData}
              renderItem={this._renderHotelItem}
              keyExtractor={(item, index) => index}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(HotelScreen)
