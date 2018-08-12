import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/HotelTabStyle'
import { Images, Colors } from '../Themes'
import HotelSavedList from '../Components/HotelSavedList'

export default class HotelTab extends Component {
  constructor(props) {
    super(props);
    
  }

  _renderHotelItem = ({item}) => (
    <HotelSavedList
      data = {item}
      nav={this.props.nav}
    />
  )

  render () {
    const data = this.props.data? this.props.data: []
    return (
      <View style={styles.container}>
         <FlatList
              data={data}
              renderItem={this._renderHotelItem}
              keyExtractor={(item, index) => index.toString()}
            />
      </View>
    )
  }
}
