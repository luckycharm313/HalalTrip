import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar'
// Styles
import styles from './Styles/WeatherScreenStyle'
import SearchAction from '../Redux/SearchRedux'

class WeatherScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // latitude: null,
      // longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {        
        this.props.getWeather(position.coords.latitude, position.coords.longitude)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _renderWeatherItem = ({item}) => (
    <View style = {styles.itemContainer}>
      <View style = {styles.itemWeather}>
        <Text style={styles.txt_date}>{item.date}</Text>
        <Text style={styles.txt_description}>{item.description}</Text>
      </View>
      <View style = {styles.itemIcon}>
        <Image style={styles.item_img} source={{uri: item.weather_icon?item.weather_icon:""}}></Image>
      </View>
      <View style = {styles.itemTemperature}>
        <Text style={styles.txt_temp}>{item.temp}°C</Text>
      </View>
    </View>    
  )

  render () {
    const weatherData = this.props.weatherData?this.props.weatherData: []
    return (
      <ScrollView style={styles.mainContainer}>
        <View style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <View style = {styles.viewWeather}>
            <FlatList
              data={weatherData}
              renderItem={this._renderWeatherItem}
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
    weatherData: search.weatherData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: (lat, long) => dispatch(SearchAction.getWeather(lat, long)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen)
