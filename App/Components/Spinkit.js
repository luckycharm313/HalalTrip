import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './Styles/SpinkitStyle'
import { Colors } from '../Themes'
export default class Spinkit extends Component {

  render () {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    )
  }
}
