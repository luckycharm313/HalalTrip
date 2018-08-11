import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/RestaurantTabStyle'
import RestaurantSavedList from '../Components/RestaurantSavedList'
import { Images, Colors } from '../Themes'

export default class RestaurantTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
  _renderAllRestaurants = ({item})=> {
    return( <RestaurantSavedList data = {item} nav={this.props.nav}/> ) 
  }

  render () {
    const data = this.props.data? this.props.data: []
    return (
      <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={this._renderAllRestaurants}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    )
  }
}
