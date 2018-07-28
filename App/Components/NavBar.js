import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native'
import styles from './Styles/NavBarStyle'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class NavBar extends Component {
  
  render () {
    const {goBack} = this.props.nav;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress = {() => goBack()}>
          <Icon name="arrow-back" style = {styles.icon_back}/>
        </TouchableOpacity>
      </View>
    )
  }
}
