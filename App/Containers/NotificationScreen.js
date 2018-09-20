import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/NotificationScreenStyle'
import NavBar from '../Components/NavBar'
import { strings } from '../../locales/i18n';
class NotificationsScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  }
  _renderNotificationItem = ({item}) =>{
    return (
      <View style = {styles.itemView}>
        <Icon name="notifications" style = {styles.icon_setting} />
        <Text style={styles.txt_setting}>{item}</Text>
      </View>
    )
  }

  render () {
    notificationData = this.props.notifications?this.props.notifications:[]
    console.log("notification ", notificationData)
    return (
      <View style = {styles.mainContainer}>
        <ScrollView style={styles.container}>
            <View style = {styles.navbar}>
              <NavBar nav = {this.props.navigation} />          
            </View>
            <View style={styles.label_section}>
              <Text style={styles.header_txt_title}>Notifications</Text>
            </View>
            <View>
              <FlatList
                data={notificationData}
                renderItem={this._renderNotificationItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({startup}) => {
  return {
    notifications:startup.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)
