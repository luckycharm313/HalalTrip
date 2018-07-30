import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/HotelTabStyle'
import { Images, Colors } from '../Themes'
import HotelList from '../Components/HotelList'

export default class HotelTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render () {
    return (
      <View style={styles.container}>
         <FlatList
              data={this.state.hotelData}
              renderItem={this._renderHotelItem}
              keyExtractor={(item, index) => index}
            />
      </View>
    )
  }
}
