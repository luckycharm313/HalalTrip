import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, ImageBackground, Dimensions, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SignInScreenStyle'
import { Images, Colors } from '../Themes'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeIndex : 1
    };
  }
  _onClickSigninTab =()=>{
    this.setState({routeIndex : 1})
  }
  
  _onClickSignupTab =()=>{
    this.setState({routeIndex : 2})
  }

  render () {
    let renderTabView = null
    if(this.state.routeIndex == 1)
      renderTabView = <SignIn nav = {this.props.navigation} />
    else
      renderTabView = <SignUp />

    return (
      <View style={styles.mainContainer}>
          <ImageBackground style={styles.header_section} source={Images.image1}>
            <View style={styles.header_txt_section}>
              <Text style={styles.header_txt_title}>Halal Trip Thailand</Text>
              <Text style={styles.header_txt_description}>Always know beautiful destinations for your trip</Text>
            </View>
            <View style={styles.tab_bar_section} >
              <TouchableOpacity onPress={this._onClickSigninTab} style={this.state.routeIndex == 1 ? styles.bar_section_active : styles.bar_section}>
                <Text style={this.state.routeIndex == 1 ? styles.txt_tab_active : styles.txt_tab}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onClickSignupTab} style={this.state.routeIndex == 2 ? styles.bar_section_active : styles.bar_section}>
                <Text style={this.state.routeIndex == 2 ? styles.txt_tab_active : styles.txt_tab}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          
          <View style={styles.tab_body_section} >
            { renderTabView }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
