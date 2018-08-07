import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, TouchableOpacity, View, FlatList} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import MainAction from '../Redux/MainRedux'
import styles from './Styles/HomeScreenStyle'
import { Images, Colors } from '../Themes'
import CategoryItem from '../Components/CategoryItem'
import HotelItem from '../Components/HotelItem'
import ActivityItem from '../Components/ActivityItem'
import DestinationItem from '../Components/DestinationItem'
import TrendItem from '../Components/TrendItem'
import Redeem from '../Components/Redeem'
import FreeCredit from '../Components/FreeCredit'
import Spinkit from '../Components/Spinkit'


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appLoading : false,
      activityData : [
        {
          title : 'Deepest Diving Pool in Indonesia',
          sub_title : 'Submarine',
          location : 'Raja Ampat Islands',
          cost : '$126',
          review : '128',
          img_url : Images.image3,
        },
        {
          title : 'Enjoy Traditional Tea & Music',
          sub_title : 'Entertainment',
          location : 'Raja Ampat Islands',
          cost : '$126',
          review : '130',
          img_url : Images.image4,
        },
      ],
      trendData : [
        {
          title : 'Explore Forest',
          detail : 'Explore the forest with fun outdoor activities without fear with anything anywhere for everyon',
          img_url : Images.image1,
        },
        {
          title : 'Color Run Now',
          detail : 'Find new friends everywhere with a beautiful colorful by running together and always smiling',
          img_url : Images.image2,
        },
      ]
    };
  }

  _renderCategoryItem = ({item}) => (
    <CategoryItem
      data = {item}
    />
  )

  _renderHotelItem = ({item}) => (
    <HotelItem
      data = {item}
    />
  )
  
  _renderActivityItem = ({item}) => (
    <ActivityItem
      data = {item}
    />
  )
  
  _renderDestinationItem = ({item}) => (
    <DestinationItem
      data = {item}
    />
  )
  
  _renderTrendItem = ({item}) => (
    <TrendItem
      data = {item}
    />
  )

  componentWillMount(){
    this.setState({appLoading : true})
    this.props.loadData()
  }

  componentWillReceiveProps(nextProps){
    this.setState({appLoading : nextProps.fetching})
  }
  render () {
    console.log(" appLoading => ", this.state.appLoading)
    if (this.state.appLoading) {
      return <Spinkit size={30} type="FadingCircle" color={Colors.primary} />
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.container}>
            <ImageBackground style={styles.header_section} source={Images.image1}>
              <View style={styles.header_txt_section}>
                <Text style={styles.header_txt_title}>Explore the world</Text>
                <Text style={styles.header_txt_description}>Discover and book everything that make your joyful</Text>
                <TouchableOpacity style={styles.btnDiscover} onPress={this._discoverDestinations}>
                  <Text style={styles.txtDiscover}>Discover destinations</Text>
                  <Icon name="keyboard-arrow-right" style = {styles.icon_arrow} />
                </TouchableOpacity>
              </View>
            </ImageBackground>

            <View style={styles.section}>
              <Text style={styles.txtSectionTitle}>Categories</Text>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.props.categoryData}
                  renderItem={this._renderCategoryItem}
                  keyExtractor={(item, index) => index.toString()}
                />
            </View>
            
            <View style={styles.section}>
              <View style={styles.section_header}>
                <Text style={styles.txtSectionTitle}>Popular Hotels</Text>
                <TouchableOpacity style={styles.more_area}>
                  <Text style={styles.txtLabelSm}>See all</Text>
                  <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
                </TouchableOpacity>
              </View>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.props.hotelTotalData}
                  renderItem={this._renderHotelItem}
                  keyExtractor={(item, index) => index.toString()}
                />
            </View>
            
            <View style={styles.section}>
              <View style={styles.section_header}>
                <Text style={styles.txtSectionTitle}>Popular Actvities</Text>
                <TouchableOpacity style={styles.more_area}>
                  <Text style={styles.txtLabelSm}>See all</Text>
                  <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
                </TouchableOpacity>
              </View>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.activityData}
                  renderItem={this._renderActivityItem}
                  keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.section}>
              <View style={styles.section_header}>
                <Text style={styles.txtSectionTitle}>Top Destinations</Text>
                <TouchableOpacity style={styles.more_area}>
                  <Text style={styles.txtLabelSm}>See all</Text>
                  <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
                </TouchableOpacity>
              </View>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.props.placeTotalData}
                  renderItem={this._renderDestinationItem}
                  keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.section}>
              <View style={styles.section_header}>
                <Text style={styles.txtSectionTitle}>Trending Now</Text>
                <TouchableOpacity style={styles.more_area}>
                  <Text style={styles.txtLabelSm}>See all</Text>
                  <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
                </TouchableOpacity>
              </View>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.trendData}
                  renderItem={this._renderTrendItem}
                  keyExtractor={(item, index) => index.toString()}
                />
            </View>
            
            <View style={styles.deactive_section}>
              <Redeem />
            </View>

            <View style={styles.deactive_section}>
              <FreeCredit />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({main, category, hotel, place}) => {
  return {
    errorMsg : main.errorMsg,
    categoryData : category.categoryData,
    hotelTotalData : hotel.hotelTotalData,
    placeTotalData : place.placeTotalData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(MainAction.loadData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
