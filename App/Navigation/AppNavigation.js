import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import SignInScreen from '../Containers/SignInScreen'
import LaunchInterestScreen from '../Containers/LaunchInterestScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  SignInScreen: { screen: SignInScreen },
  LaunchInterestScreen: { screen: LaunchInterestScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
