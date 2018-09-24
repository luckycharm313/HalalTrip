import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Spinkit from '../Components/Spinkit'
import { Colors } from '../Themes'
import OneSignal from 'react-native-onesignal';
// Styles
import styles from './Styles/RootContainerStyles'

let obj = null;
class RootContainer extends Component {
  
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  componentWillMount() {
    // obj = this;
    // OneSignal.init("180a6e93-3a86-42de-813d-282a113a4fc3");
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
    // OneSignal.configure()
  }
  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  // onReceived(notification) {
  //   const {payload} = notification
  //   const {body} = payload
  //   console.log("Notification received: ", notification);
  //   console.log("Notification body: ", body);
  //   console.log("Notification object: ", obj);
  //   obj.props.receivedNotification(body)
  // }

  // onOpened(openResult) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }

  // onIds(device) {
  // console.log('Device info: ', device);
  // }
   
  render () {
    
    let maybeSpinkit = null

    if (this.props.isLoading) {
      maybeSpinkit = <Spinkit style={{position: 'absolute'}} size={30} type="FadingCircle" color={Colors.primary} />
    }
  
    return (
      <View style={styles.applicationView}>
        {maybeSpinkit}
        <StatusBar barStyle='dark-content'/>
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = ({startup}) => {
  return {
    isLoading : startup.isLoading,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
//  receivedNotification: (notification) => dispatch(StartupActions.receivedNotification(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
