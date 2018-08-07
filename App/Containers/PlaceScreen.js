import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/PlaceScreenStyle'
import { Images } from '../Themes'
import PlaceItem from '../Components/PlaceItem'
class PlaceScreen extends Component {
  constructor(props) {
    super(props);
  }
  _renderPlaceItem=(element, index)=>{
    return(<PlaceItem key={index} data ={element} nav = {this.props.navigation} />)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.row_view}>
            <View style={styles.col_md_6}>
              {
                this.props.placeTotalData.map((element, index) => {
                  if (index % 2 == 1) return null;
                  return this._renderPlaceItem(element, index)   
                })
              }
            </View>
            <View style={styles.col_md_6}>
              {
                this.props.placeTotalData.map((element, index) => {
                  if (index % 2 == 0) return null;
                  return this._renderPlaceItem(element, index)   
                })
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({place}) => {
  return {
    placeTotalData : place.placeTotalData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceScreen)
