import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Styles
import styles from './Styles/SavedScreenStyle'
import { Fonts, Colors } from '../Themes'
import NavBar from '../Components/NavBar'
import HotelTab from '../Components/HotelTab'
import ActivityTab from '../Components/ActivityTab'
import RestaurantTab from '../Components/RestaurantTab'

import RestaurantAction from '../Redux/RestaurantRedux'

class SavedScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  componentWillMount(){
    this.props.loadSavedData()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />          
          </View>
          <ScrollableTabView
            style = {styles.tabs}
            tabBarUnderlineStyle = {style = { backgroundColor: Colors.primary}}
            tabBarBackgroundColor = {Colors.font.default}
            tabBarActiveTextColor = {Colors.font.dark}
            tabBarInactiveTextColor = {Colors.font.textHintColor}
            tabBarTextStyle = {{fontSize : Fonts.size.regular, fontFamily  : Fonts.type.base}}
            initialPage={2}
          >
            <HotelTab ref="hotel" tabLabel='Hotels' nav={this.props.navigation} /> 
            <ActivityTab ref="activity" tabLabel='Activities' nav={this.props.navigation} /> 
            <RestaurantTab ref="restaurant" tabLabel='Restaurants' nav={this.props.navigation} data = {this.props.savedRestaurantData}/> 
          </ScrollableTabView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({restaurant}) => {
  return {
    savedRestaurantData : restaurant.savedRestaurantData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSavedData: () => dispatch(RestaurantAction.loadSavedData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen)
