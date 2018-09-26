import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'
import InfiniteScroll from 'react-native-infinite-scroll'
// Styles
import styles from './Styles/RestaurantScreenStyle'
import { Images, Colors } from '../Themes'
import CuisinesItem from '../Components/CuisinesItem'
import RestaurantList from '../Components/RestaurantList'
import RestaurantAllList from '../Components/RestaurantAllList'
import RestaurantAction from '../Redux/RestaurantRedux'

import { strings } from '../../locales/i18n';

class RestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: ['Dates', 'Guests'],
      restaurantData: [],
      tempRestaurantData: [],
      pageRestaurant: 0,
      tempWeekRestaurantData: [],
      pageWeekRestaurant: 0,
    }    
  }
  _renderCuisinesItem = ({item})=> {
    return( <CuisinesItem data = {item} nav ={this.props.navigation} /> ) 
  }

  _renderTrendingData = ({item})=> {
    return( <RestaurantList data = {item} nav ={this.props.navigation} /> ) 
  }

  _renderAllRestaurants = ({item})=> {
    return( <RestaurantAllList data = {item} nav ={this.props.navigation} /> ) 
  }

  _onCuisines = ()=>{
    this.props.navigation.navigate('CuisinesScreen');
  }
  
  componentWillMount(){
    this.props.loadRestaurantData()
  }

  componentWillReceiveProps(nextProps){
    const restaurantData = nextProps.restaurantData ? nextProps.restaurantData : []    

    if(restaurantData.length>0){
      this.setState({restaurantData})
      let _temp=[]
      let _weektemp=[]
      restaurantData.forEach(function (value, index) {
        if(index < 3){
          _weektemp.push(value)
        }

        if(index < 5){
          _temp.push(value)
        }
      });
      this.setState({tempRestaurantData:_temp})
      this.setState({tempWeekRestaurantData:_weektemp})
    }
  }
  
  loadMoreRestaurants =()=>{
    var _rd = this.state.restaurantData
    var _pg = this.state.pageRestaurant
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*5){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempRestaurantData:_temp})
      this.setState({pageRestaurant: _pg})
    }
  }
  
  loadMoreWeekRestaurants =()=>{
    var _rd = this.state.restaurantData
    var _pg = this.state.pageWeekRestaurant
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*3){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempWeekRestaurantData:_temp})
      this.setState({pageWeekRestaurant: _pg})
    }
  }

  render () {
    const cuisineData = this.props.cuisineData ? this.props.cuisineData : []
    const restaurantData = this.props.restaurantData ? this.props.restaurantData : []

    return (
      <InfiniteScroll
        horizontal={false}
        onLoadMoreAsync={this.loadMoreRestaurants}
        distanceFromEnd={10}
        style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header_section}>
            <View style={styles.label_section}>
              <Text style={styles.header_txt_title}>{strings('global.restaurant')}</Text>
              {/* <TouchableOpacity style={styles.btnFilter} onPress={this._onFilterBtn}>
                <Text style={styles.txtFilter}>Filters</Text>
              </TouchableOpacity> */}
            </View>
            {/* <View style={styles.search_section}>
              <Icon name="search" style = {styles.icon_search} />
              <TextInput
                ref = {'search'}
                name = {'Search' }
                type = {'TextInput'}
                underlineColorAndroid = {Colors.transparent}
                autoCapitalize = {'none'}
                autoCorrect = {false}
                placeholder = {'Search'}
                placeholderTextColor = {Colors.textHintColor}
                style = {styles.input_area}
                returnKeyType = 'go'
                selectionColor = {Colors.textHintColor}
                onChangeText = {(_search) => { this.setState({_search: _search})}}
                onChange = {this._onSearch}
                maxLength = {100}/>
            </View>
            <View style={styles.action_section}>
              <View style={styles.filter_actions}>
                {
                  this.state.filterData.map(element => (
                    <View style={styles.filter_view} key={element}>
                      <Text style={styles.filter_label}>{element}</Text>
                    </View>
                  ))
                }
              </View>
              <TouchableOpacity style={styles.map_location}>
                <Icon name="location-on" style = {styles.icon_location} />
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>{strings('global.cities')}</Text>
              <TouchableOpacity style={styles.more_area} onPress = {this._onCuisines}>
                <Text style={styles.txtLabelSm}>{strings('global.see_all')}</Text>
                <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
              </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={cuisineData}
                renderItem={this._renderCuisinesItem}
                keyExtractor={(item, index) => index.toString()}
                
              />
          </View>

          <View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>{strings('restaurant.trend_this_week')}</Text>
              {/* <TouchableOpacity style={styles.more_area}>
                <Text j
                
                style={styles.txtLabelSm}>See all</Text>
                <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
              </TouchableOpacity> */}
            </View>
            {/* <InfiniteScroll
              horizontal={true}
              onLoadMoreAsync={this.loadMoreWeekRestaurants}
              distanceFromEnd={10}> */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.restaurantData}
                  renderItem={this._renderTrendingData}
                  keyExtractor={(item, index) => index.toString()}                  
                />
            {/* </InfiniteScroll> */}
            
          </View>

          <View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>{strings('restaurant.all_restaurant')}</Text>
            </View>
              <FlatList
                data={this.state.tempRestaurantData}
                renderItem={this._renderAllRestaurants}
                keyExtractor={(item, index) => index.toString()}
              />
          </View>
        </View>
      </InfiniteScroll>
      
    )
  }
}

const mapStateToProps = ({restaurant}) => {
  return {
    cuisineData : restaurant.cuisineData,
    restaurantData : restaurant.restaurantData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadRestaurantData: () => dispatch(RestaurantAction.loadRestaurantData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen)
