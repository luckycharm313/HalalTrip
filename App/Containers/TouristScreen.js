import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/TouristScreenStyle'
import TouristAction from '../Redux/TouristRedux'
import TouristVList from '../Components/TouristVList'

class TouristScreen extends Component {
  componentWillMount(){
    this.props.loadTouristData()
  }

  _renderTouristItem = ({item}) => (
    <TouristVList
      data = {item}
      nav={this.props.navigation}
    />
  )

  render () {
    const touristTotalData = this.props.touristTotalData ? this.props.touristTotalData : []
    let allTourist = null
    if(touristTotalData.length > 0){
      allTourist = (
        <View style={styles.hotel_list_section}>
          <Text style={styles.header_txt_title_md}>All Tourist Attractions</Text>
          <View style={styles.hotel_list_view}>
            <FlatList
              data={touristTotalData}
              renderItem={this._renderTouristItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      )
    }

    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          {/* <View style={styles.header_section}>
            <View style={styles.label_section}>
              <Text style={styles.header_txt_title}>Tourist Attraction</Text>
            </View>            
          </View> */}
          {allTourist}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({tourist}) => {
  return {
    touristTotalData : tourist.touristTotalData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTouristData: () => dispatch(TouristAction.loadTouristData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TouristScreen)
