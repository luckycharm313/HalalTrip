import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/CuisinesScreenStyle'
import { Images, Colors } from '../Themes'
import NavBar from '../Components/NavBar'
import { strings } from '../../locales/i18n';

class CuisinesScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      cuisinesData : [{
        title : 'Japanese',
        detail : '84 Restaurants',
        img_url : Images.image4,
      },{
        title : 'Italian',
        detail : '356 Restaurants',
        img_url : Images.image1,
      },{
        title : 'Mexican',
        detail : '38 Restaurants',
        img_url : Images.image2,
      }]
    }
  }

  _goToRestaurantPlace = (id, title) =>{
    this.props.navigation.navigate('RestaurantPlaceScreen', {placeId : id, placeTitle : title});
  }

  _renderCuisinesList = ({item}) =>{
    const {id, title, restaurant_count, img_url} = item
    return (
      <TouchableOpacity style={styles.view_cuisines} onPress={this._goToRestaurantPlace.bind(this, id, title)}>
        <View style={styles.resturant_view}>
          <View style={styles.opacity_view} >
            <Image style={styles.img_review} source={{uri: img_url==null?"":img_url}}/>
          </View>
          <View style={styles.item_view}>
            <Text style={styles.txt_label}>{title}</Text>
            <Text style={styles.txt_detail}>{restaurant_count} {strings('global.restaurant')}</Text>
          </View>
        </View>
        <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
      </TouchableOpacity>
    )
  }

  render () {
    const cuisineData = this.props.cuisineData ? this.props.cuisineData : []
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <View style={styles.header_section}>
            <Text style={styles.header_txt_title}>All Cities</Text>
          </View>
          <View style={styles.body_section}>
            <FlatList
                data={cuisineData}
                renderItem={this._renderCuisinesList}
                keyExtractor={(item, index) => index.toString()}
              />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({restaurant}) => {
  return {
    cuisineData : restaurant.cuisineData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CuisinesScreen)
