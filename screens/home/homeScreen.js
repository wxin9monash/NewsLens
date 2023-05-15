import React, { useState, useRef } from "react";
import { SafeAreaView, Dimensions, ScrollView, View, TouchableOpacity, StatusBar, Image, Text, ImageBackground, StyleSheet, Animated } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { TextInput, Button } from 'react-native-paper';
import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const { width } = Dimensions.get('window');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('2cd35fd59fe44ea3841b860501b72886'); 
// 65d1f052cb624a518a8e5c48aeb8e75d
// 2cd35fd59fe44ea3841b860501b72886
const screenWidth = Dimensions.get('window').width;
const tabWidth = (screenWidth - (Sizes.fixPadding * 6.0)) / 3;
const latest = 'australia'
let count = 0;
let bannerSliderList_live = [];
let latestNewsList_live = [];
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const startDate = currentYear + "-" + (currentMonth) + "-" + (currentDay);
const latestDate = currentYear + "-" + (currentMonth+1) + "-" + (currentDay-7);

async function fetchTopNews(startDate, keywords = 'Australia', language = 'en', source = 'au', sortBy = 'relevancy') {

    function convertTimeToAustralia(dateString) {

        const date = new Date(Date.parse(dateString));
      
        // Determine the time zone offset in minutes
        const timezoneOffset = date.getTimezoneOffset();
      
        // Adjust the time by adding the time zone offset to the minutes
        date.setMinutes(date.getMinutes() + timezoneOffset);
      
        // Format the date and time in a way that is appropriate for Australia
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: 'Australia/Sydney'
        };
      
        const localTimeString = date.toLocaleString('en-AU', options);
      
        return localTimeString;
      }
      
    try {
        const response = await newsapi.v2.everything({
            q: keywords,
            sortBy: sortBy,
            from: startDate,
            language: language,
            source: source,
        });

        const articles = response.articles;
        bannerSliderList_live = [];
        latestNewsList_live =[];
        console.log('Found', articles.length, 'articles:');
        console.log(bannerSliderList_live.length);

        for (const article of articles) {
            if (bannerSliderList_live.length <= 8){
                const image = {uri: article.urlToImage};
                const randomInteger = Math.floor(Math.random() * (1000 - 800 + 1)) + 800;
                const news ={
                    id: count,
                    inBookmark: false,
                    newsImage: image,
                    headLine: article.title,
                    date: convertTimeToAustralia(article.publishedAt),
                    viewsCount: randomInteger,
                    commentsCount: randomInteger - 729,
                    newsDetail: article.content,
                    description: article.description,
                    newsUrl: article.url,
                    newsSource: article.source.name,
                }
                console.log(bannerSliderList_live.length)
                console.log('Title:', article.title);
                console.log('URL:', article.url);
                console.log('Description:', article.description);
                console.log('Publish Time:', article.publishedAt);
                console.log('Image:', image);
                console.log('Source:', article.source);
                console.log('------');
                if (news.description && news.newsImage != null){
                    bannerSliderList_live.push(news)
                    count++
                }
            } else {
                latestNewsList_live.push(bannerSliderList_live[5])
                latestNewsList_live.push(bannerSliderList_live[6])
                bannerSliderList_live.splice(-4)
                return;
            }
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
  
}

if (bannerSliderList_live.length <= 4){
    fetchTopNews(startDate);
} 

const topNewsList = [
    {
        id: '1',
        newsImage: require('../../assets/images/news_image/img1.png'),
        headLine: 'India reports 42,766 new covid-19 cases',
        newsDetail: 'Coronavirus cases today: The center has warned against laxity in following Covid-appropriate behaviour of large crowds at hill stations.',
        inBookmark: true,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        isVideo: true,
    },
    {
        id: '2',
        newsImage: require('../../assets/images/news_image/img2.png'),
        headLine: 'Covid testing enought for global travel, not vaccine discrimination\':Jaishankar',
        newsDetail: 'At a joint press conference with his Russian counterpart Sergery Lavrov, external affairs minister S Jaishankar also said that the coronavirus pandemic has demonstrated the strength of cooperation between the two countries.',
        inBookmark: false,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
    },
    {
        id: '3',
        newsImage: require('../../assets/images/news_image/img3.png'),
        headLine: 'More than 2 can cost you govt Job, single child\'s entry in IIT',
        newsDetail: 'Those who have only one child and undergo sterilisation will additionally get free health care facility, preference to child in admission in all education institutions, including IIMs and AIIMS.',
        inBookmark: false,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
    }
];

const HomeScreen = ({ navigation }) => {

    const [state, setState] = useState({
        bannerList: bannerSliderList_live,
        activeSlide: 0,
        topNews: topNewsList,
        latestNews: latestNewsList_live,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        bannerList,
        activeSlide,
        topNews,
        latestNews,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.blackColor}
            />
            <View style={{ flex: 1}}>
            {/* #343d46 */}
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {bannerSlider()}
                    {/* {topNewsInfo()} */}
                    {latestNewsInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function updateLatestNews({ id }) {
        const newList = latestNews.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inBookmark: !item.inBookmark };
                return updatedItem;
            }
            return item;
        });
        updateState({ latestNews: newList })
    }

    function latestNewsInfo() {
        return (
            <View>
                <View style={styles.latestNewsTitleStyle}>
                    <Text style={{ ...Fonts.whiteColor16Bold  }}>
                        Latest News
                    </Text>
                    <Text
                        onPress={() => navigation.push('AllTopNews', {category: latest} )}
                        style={{ ...Fonts.whiteColor12Bold }}
                    >
                        View All
                    </Text>
                </View>
                {
                    latestNews.map((item) => (
                        <View key={`${item.id}`} >
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    item.isVideo
                                        ?
                                        navigation.push('VideoDetail', { item })
                                        :
                                        navigation.push('NewsDetail', { item })
                                }}
                                style={{
                                    marginHorizontal: Sizes.fixPadding * 2.0,
                                    marginBottom: Sizes.fixPadding * 4.0,
                                }}
                            >
                                <ImageBackground
                                    source={item.newsImage}
                                    style={{
                                        height: 150.0,
                                        alignItems: 'center',
                                    }}
                                    borderRadius={Sizes.fixPadding - 5.0}
                                >
                                    {
                                        item.isVideo
                                            ?
                                            <View style={styles.playVideoIconWrapStyle}>
                                                <MaterialIcons
                                                    name="play-arrow"
                                                    color={Colors.whiteColor}
                                                    size={24}
                                                />
                                            </View>
                                            :
                                            null
                                    }
                                </ImageBackground>
                                <View style={styles.latestNewsDetailWrapStyle}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                ...Fonts.whiteColor14Bold,
                                                maxWidth: width - 150.0,
                                            }}
                                        >
                                            {item.headLine}
                                        </Text>
                                        <MaterialIcons
                                            name={item.inBookmark ? "bookmark" : "bookmark-outline"}
                                            color={item.inBookmark ? Colors.whiteColor : Colors.whiteColor}
                                            size={22}
                                            onPress={() => updateLatestNews({ id: item.id })}
                                        />
                                    </View>

                                    <View style={styles.latestNewsCommentDateViewsWrapStyle}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialIcons
                                                name="access-time"
                                                color={Colors.whiteColor}
                                                size={13}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor12Medium }}>
                                                {item.date}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <SimpleLineIcons
                                                name="eye"
                                                size={13}
                                                color={Colors.whiteColor}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor12Medium }}>
                                                {item.viewsCount}
                                            </Text>
                                        </View>

                                    </View>

                                    <Text
                                        numberOfLines={4}
                                        style={{ ...Fonts.whiteColor11Medium }}
                                    >
                                        {item.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        )
    }

    function updateBannerList({ id }) {
        const newList = bannerList.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inBookmark: !item.inBookmark };
                return updatedItem;
            }
            return item;
        });
        updateState({ bannerList: newList })
    }

    function bannerSlider() {

        const renderItem = ({ item }) => (
            
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('NewsDetail', { item })}
            >
                <ImageBackground
                    source={item.newsImage}
                    style={{
                        height: 170.0,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                    }}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    
                    <View style={styles.bannerSliderInfoWrapStyle}>
                        <MaterialIcons
                            name={item.inBookmark ? "bookmark" : "bookmark-outline"}
                            color={Colors.whiteColor}
                            size={22}
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => updateBannerList({ id: item.id })}
                        />
                        <View style={{ marginTop: 0, marginRight: Sizes.fixPadding * 5.0, }}>
                            <Text
                                numberOfLines={2}
                                style={{ ...Fonts.whiteColor14Bold }}
                            >
                                {item.headLine}
                            </Text>
                            <View style={styles.bannerNewsViewsCommentsDateInfoWrapStyle}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons
                                        name="access-time"
                                        color={Colors.whiteColor}
                                        size={13}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor12Medium }}>
                                        {item.date}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <SimpleLineIcons
                                        name="eye"
                                        size={13}
                                        color={Colors.whiteColor}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor12Medium }}>
                                        {item.viewsCount}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons
                                        name="comment-text-outline"
                                        color={Colors.whiteColor}
                                        size={13}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor12Medium }}>
                                        {item.commentsCount}
                                    </Text>
                                </View>
                            </View>
                            <Text style={{ ...Fonts.whiteColor11Medium }}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
            <View>
            <View style={styles.topNewsTitleWrapStyle}>
            <Text style={{ ...Fonts.whiteColor16Bold }}>
                Top News
            </Text>

            </View>
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Carousel
                    data={bannerList}
                    sliderWidth={width}
                    itemWidth={width}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    onSnapToItem={(index) => updateState({ activeSlide: index })}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                />
                {pagination()}
            </View>
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={bannerList.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    function header() {
        const [searchType, setSearchType] = useState('Title');
        const animatedValue = useRef(new Animated.Value(0)).current;
        const screenWidth = Dimensions.get('window').width;
        const tabWidth = (screenWidth - (Sizes.fixPadding * 6.0)) / 3;
      
        const handleTabPress = (type, index) => {
          setSearchType(type);
          animateTabIndicator(index);
        };
      
        const animateTabIndicator = (toValue) => {
          Animated.timing(animatedValue, {
            toValue,
            duration: 250,
            useNativeDriver: true,
          }).start();
        };
      
        const tabIndicatorStyle = {
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, tabWidth, tabWidth * 2],
              }),
            },
          ],
        };

        return (
            <View style={styles.searchSectionStyle}>
                <View style={styles.tabs}>
                <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />
                <TouchableOpacity onPress={() => handleTabPress('Keywords', 0)} style={styles.tab}>
                    <Text style={[styles.tabText, searchType === 'Keywords' ? styles.activeTabText : {}]}>Keywords</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Title', 1)} style={styles.tab}>
                    <Text style={[styles.tabText, searchType === 'Title' ? styles.activeTabText : {}]}>Title</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Link', 2)} style={styles.tab}>
                    <Text style={[styles.tabText, searchType === 'Link' ? styles.activeTabText : {}]}>Link</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.tabDescription}>Searching by {searchType} will provide results based on the selected option.</Text>
                <Button style={styles.searchButton} mode="contained" onPress={() => navigation.push('Search', {searchType})} contentStyle={{ backgroundColor: '#4f5b66' }} icon={({ size, color }) => <MaterialIcons name="search" size={size} color={color} />}>
                    Search News by {searchType}
                </Button>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchSectionStyle: {
        marginHorizontal: Sizes.fixPadding * 3.0,
        marginVertical: Sizes.fixPadding,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sliderActiveDotStyle: {
        width: 12,
        height: 12,
        borderRadius: 6.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 25.0
    },
    sliderInactiveDotStyle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: Colors.blackColor
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -25.0,
        left: 0.0,
        right: 0.0,
    },
    bannerSliderInfoWrapStyle: {
        height: 170.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    bannerNewsViewsCommentsDateInfoWrapStyle: {
        marginVertical: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topNewsTitleWrapStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topNewsWrapStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    latestNewsTitleStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    latestNewsDetailWrapStyle: {
        backgroundColor: '#65737e',
        elevation: 4.0,
        marginTop: -30.0,
        marginHorizontal: Sizes.fixPadding * 1.5,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    playVideoIconWrapStyle: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        marginTop: Sizes.fixPadding * 3.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    latestNewsCommentDateViewsWrapStyle: {
        marginVertical: Sizes.fixPadding - 7.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#65737e'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderRadius: 13,
        // borderWidth: 1,
        // borderColor: 'black',
        backgroundColor: '#4f5b66',
        overflow: 'hidden',
      },
      tab: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      activeTab: {
        backgroundColor: '#65737e',
      },
      tabText: {
        fontSize: 16,
        color: 'grey',
        fontFamily: 'OpenSans_Medium',
      },
      activeTabText: {
        color: 'white',
      },
      input: {
        marginBottom: 10,
      },
      tabDescription: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'OpenSans_Bold'
      },
      resultsContainer: {
        flex: 1,
      },
    searchButton: {
        width: '100%', 
        borderRadius: 20, 
        color: '#65737e',
    },
    tabIndicator: {
        position: 'absolute',
        height: 3,
        width: tabWidth,
        backgroundColor: '#c0c5ce',
      },
})

export default HomeScreen;