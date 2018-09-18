import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar'
import SearchAction from '../Redux/SearchRedux'
// Styles
import styles from './Styles/EmergencyContactScreenStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call'

class EmergencyContactScreen extends Component {

  _onDial = (phone) => {
    RNImmediatePhoneCall.immediatePhoneCall(phone);
  }
  _renderItem = ({item}) => (
    <View style = {styles.itemContainer}>
      <View style={styles.phone_icon}>
        <TouchableOpacity style={styles.btn_action} onPress={this._onDial.bind(this, item.phone_number)}>
          <Icon name="local-phone" style = {styles.icon_action} />
        </TouchableOpacity>
      </View>
      <View style={styles.phone_number}>
        <Text style={styles.txt_phone_number}>{item.phone_number}</Text>
      </View>
      <View style={styles.phone_description}>
        <Text style={styles.txt_description}>{item.description_en}</Text>
      </View>
    </View>    
  )

  componentWillMount(){
    this.props.getEmergencyNumbers()
  }

  render () {
    const emergencyNumbers = this.props.emergencyNumbers?this.props.emergencyNumbers: []
    return (
      <ScrollView style={styles.mainContainer}>
        <View style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <View style = {styles.viewNumbers}>
            <FlatList
              data={emergencyNumbers}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({search}) => {
  return {
    emergencyNumbers: search.emergencyNumbers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmergencyNumbers: () => dispatch(SearchAction.getEmergencyNumbers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyContactScreen)
