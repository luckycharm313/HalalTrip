import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/ActivityTabStyle'
import ActivitySavedItem from '../Components/ActivitySavedItem'

export default class ActivityTab extends Component {
  _renderActivityItem = ({item}) => (
    <ActivitySavedItem
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
          renderItem={this._renderActivityItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}
