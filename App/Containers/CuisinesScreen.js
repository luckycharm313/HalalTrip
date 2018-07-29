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

  _renderCuisinesList = ({item}) =>{
    const {title, detail, img_url} = item
    return (
      <TouchableOpacity style={styles.view_cuisines}>
        <View style={styles.resturant_view}>
          <Image style={styles.img_review} source={img_url}/>
          <View style={styles.item_view}>
            <Text style={styles.txt_label}>{title}</Text>
            <Text style={styles.txt_detail}>{detail}</Text>
          </View>
        </View>
        <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <ScrollView style={[styles.mainContainer, styles.container]}>
        <View style = {styles.navbar}>
          <NavBar nav = {this.props.navigation} />
        </View>
        <View style={styles.header_section}>
          <Text style={styles.header_txt_title}>All Cuisines</Text>
        </View>
        <View style={styles.body_section}>
          <FlatList
              data={this.state.cuisinesData}
              renderItem={this._renderCuisinesList}
              keyExtractor={(item, index) => index}
            />
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CuisinesScreen)
