import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/RestaurantPlaceScreenStyle'
import RestaurantAllList from '../Components/RestaurantAllList'
import NavBar from '../Components/NavBar'
import PlaceAction from '../Redux/PlaceRedux'

class RestaurantPlaceScreen extends Component {

  static navigationOptions = {
    tabBarVisible: false,
  };
  
  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation

    this.state = {
      placeId : params.placeId,
      placeTitle : params.placeTitle,
    }
  }

  _renderAllRestaurants = ({item})=> {
    return( <RestaurantAllList data = {item} nav ={this.props.navigation} /> ) 
  }

  componentWillMount(){
    this.props.getRestaurantPlace(this.state.placeId)
  }

  render () {
    const placeRestaurantData = this.props.placeRestaurantData ? this.props.placeRestaurantData : []
    const restaurantData = placeRestaurantData.restaurantData? placeRestaurantData.restaurantData:[]

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <View style={styles.header_section}>
            <Text style={styles.header_txt_title}>{this.state.placeTitle}</Text>
          </View>
          <View style={styles.body_section}>
            <FlatList
                data={restaurantData}
                renderItem={this._renderAllRestaurants}
                keyExtractor={(item, index) => index.toString()}
              />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({place}) => {
  return {
    placeRestaurantData : place.placeRestaurantData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   getRestaurantPlace : (placeId) => dispatch(PlaceAction.getRestaurantPlace(placeId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPlaceScreen)
