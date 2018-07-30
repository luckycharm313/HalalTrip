import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MapHotelScreenStyle'
import { Images } from '../Themes'
import NavBar from '../Components/NavBar'
import HotelItem from '../Components/HotelItem'

class MapHotelScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      hotelData : [
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '5',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.8',
          img_url : Images.image4,
        },
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '4',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.2',
          img_url : Images.image3,
        },
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '5',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.8',
          img_url : Images.image2,
        },
      ]
    }
  }
  _renderHotelItem = ({item}) => (
    <HotelItem
      data = {item}
    />
  )

  render () {
    return (
        <View style = {styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style = {styles.navbar}>
              <NavBar nav = {this.props.navigation} />
            </View>
            <View style = {styles.map_view}>
              <Image source={Images.map} style = {styles.map_img} />
            </View>
            <View style={styles.body_section}>
              <View style={styles.section}>
                <View style={styles.section_header}>
                  <Text style={styles.txtSectionTitle}>Find hotel in Milan, Italy</Text>
                  <TouchableOpacity style={styles.more_area}>
                    <Text style={styles.txtLabelSm}>Hide info</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.hotelData}
                    renderItem={this._renderHotelItem}
                    keyExtractor={(item, index) => index}
                  />
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapHotelScreen)
