import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ReloadScreenStyle'
import { Images } from '../Themes'
import UserAction from '../Redux/UserRedux'

class ReloadScreen extends Component {
  _onGoToHomePage =()=>{
    this.props.navigation.navigate('HomeScreen');
  }
  _onLogOUt = () =>{
    this.props.logOut()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.img_view}>
            <Image style={styles.img_404} source={Images.img_404}/>
          </View>
          <View style={styles.error_view}>
            <Text style={styles.txtTitle}>Oops!!</Text>
            <Text style={styles.txtSub}>Something went wrong.</Text>
            <Text style={styles.txtSub}>Check your connection and try again</Text>
            <TouchableOpacity style={styles.btnHome} onPress={this._onGoToHomePage}>
              <Text style={styles.txtBtn}>Go to the Main Page</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLogOut} onPress={this._onLogOUt}>
              <Text style={styles.txtBtn}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    logOut: () => dispatch(UserAction.logOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReloadScreen)
