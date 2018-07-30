import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/RestaurantTabStyle'
import RestaurantAllList from '../Components/RestaurantAllList'
import { Images, Colors } from '../Themes'

export default class RestaurantTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  _renderAllRestaurants = ({item})=> {
    return( <RestaurantAllList data = {item} /> ) 
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.restaurantData}
            renderItem={this._renderAllRestaurants}
            keyExtractor={(item, index) => index}
          />
      </View>
    )
  }
}
