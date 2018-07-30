import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/RestaurantScreenStyle'
import { Images, Colors } from '../Themes'
import CuisinesItem from '../Components/CuisinesItem'
import RestaurantList from '../Components/RestaurantList'
import RestaurantAllList from '../Components/RestaurantAllList'

class RestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: ['Dates', 'Guests'],
      cuisinesData : [{
        title : 'Japanese',
        detail : '84 Restaurants',
        img_url : Images.image4,
      },{
        title : 'Italian',
        detail : '356 Restaurants',
        img_url : Images.image1,
      },{
        title : 'Mexican',
        detail : '38 Restaurants',
        img_url : Images.image2,
      }],
      restaurantData : [{
        title : 'Coco Bamboo Resto & Bar',
        country : 'Italian',
        location : 'Milan City Center',
        review : '4.9',
        img_url : Images.image4,
      },{
        title : 'Moon Rodrigo Mezzanine',
        country : 'Mexican',
        location : 'Birmingham',
        review : '4.9',
        img_url : Images.image1,
      },{
        title : 'Elia & Sushi Today',
        country : 'Japanese',
        location : 'Tokyo',
        review : '4.9',
        img_url : Images.image2,
      }],
    }
  }
  _renderCuisinesItem = ({item})=> {
    return( <CuisinesItem data = {item} /> ) 
  }

  _renderTrendingData = ({item})=> {
    return( <RestaurantList data = {item} nav ={this.props.navigation} /> ) 
  }

  _renderAllRestaurants = ({item})=> {
    return( <RestaurantAllList data = {item} /> ) 
  }

  _onCuisines = ()=>{
    this.props.navigation.navigate('CuisinesScreen');
  }
  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header_section}>
            <View style={styles.label_section}>
              <Text style={styles.header_txt_title}>Restaurants</Text>
              <TouchableOpacity style={styles.btnFilter} onPress={this._onFilterBtn}>
                <Text style={styles.txtFilter}>Filters</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.search_section}>
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
                    <View style={styles.filter_view}>
                      <Text style={styles.filter_label}>{element}</Text>
                    </View>
                  ))
                }
              </View>
              <TouchableOpacity style={styles.map_location}>
                <Icon name="location-on" style = {styles.icon_location} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>Cuisines</Text>
              <TouchableOpacity style={styles.more_area} onPress = {this._onCuisines}>
                <Text style={styles.txtLabelSm}>See all</Text>
                <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
              </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.cuisinesData}
                renderItem={this._renderCuisinesItem}
                keyExtractor={(item, index) => index}
              />
          </View>

          <View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>Trending This Week</Text>
              <TouchableOpacity style={styles.more_area}>
                <Text style={styles.txtLabelSm}>See all</Text>
                <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
              </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.restaurantData}
                renderItem={this._renderTrendingData}
                keyExtractor={(item, index) => index}
              />
          </View>

          <View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>All Restaurants</Text>
            </View>
            <FlatList
              data={this.state.restaurantData}
              renderItem={this._renderAllRestaurants}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen)
