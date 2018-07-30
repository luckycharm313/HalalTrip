import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NotificationScreenStyle'
import NavBar from '../Components/NavBar'

class NotificationsScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  render () {
    return (
      <View style = {styles.mainContainer}>
        <ScrollView style={styles.container}>
            <View style = {styles.navbar}>
              <NavBar nav = {this.props.navigation} />          
            </View>
        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)
