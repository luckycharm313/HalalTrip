import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, TouchableOpacity, View, FlatList} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Images, Colors } from '../Themes'
import CategoryItem from '../Components/CategoryItem'
import HotelItem from '../Components/HotelItem'
import ActivityItem from '../Components/ActivityItem'
import DestinationItem from '../Components/DestinationItem'
import TrendItem from '../Components/TrendItem'
import Redeem from '../Components/Redeem'
import FreeCredit from '../Components/FreeCredit'


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData : [
        {
          title : 'Hotels',
          detail : '736 hotels',
          img_url : Images.image1,
        },
        {
          title : 'Activities',
          detail : '762 activities',
          img_url : Images.image2,
        },
        {
          title : 'Restaurants',
          detail : '549 restaurants',
          img_url : Images.image3,
        },
      ],
      hotelData : [
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '5',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.8',
          img_url : Images.image4,
        },
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '4',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.2',
          img_url : Images.image3,
        },
        {
          title : 'New Clayton Hotel Birminghan',
          rating : '5',
          location : 'Bimingham City Center',
          cost : '$239',
          review : '8.8',
          img_url : Images.image2,
        },
      ],
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
      destinationData : [
        {
          title : 'Yala',
          hotel_count : '893',
          activty_count : '237',
          img_url : Images.image2,
        },
        {
          title : 'Pattani',
          hotel_count : '245',
          activty_count : '357',
          img_url : Images.image1,
        },
        {
          title : 'Narathiwat',
          hotel_count : '245',
          activty_count : '357',
          img_url : Images.image3,
        },
        {
          title : 'Phuket',
          hotel_count : '245',
          activty_count : '357',
          img_url : Images.image4,
        },
        {
          title : 'Krabi',
          hotel_count : '245',
          activty_count : '357',
          img_url : Images.image1,
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

  render () {
    return (
      <ScrollView style={[styles.mainContainer, styles.container]}>
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
                data={this.state.categoryData}
                renderItem={this._renderCategoryItem}
                keyExtractor={(item, index) => index}
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
                data={this.state.hotelData}
                renderItem={this._renderHotelItem}
                keyExtractor={(item, index) => index}
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
                keyExtractor={(item, index) => index}
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
                data={this.state.destinationData}
                renderItem={this._renderDestinationItem}
                keyExtractor={(item, index) => index}
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
                keyExtractor={(item, index) => index}
              />
          </View>
          
          <View style={styles.deactive_section}>
            <Redeem />
          </View>

          <View style={styles.deactive_section}>
            <FreeCredit />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
