import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Dimensions, StatusBar, FlatList, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const {searchType} = 'Keywords'
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('88a285931c764d54b7dc0a8bdcb9baab'); 
// 2cd35fd59fe44ea3841b860501b72886
// 88a285931c764d54b7dc0a8bdcb9baab
// f53ef1482bff4b87aa86646ad673f635

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
        inBookmark: true,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
    },
    {
        id: '4',
        newsImage: require('../../assets/images/news_image/img6.png'),
        headLine: 'IMD predicts heavy to very heavy rains in serveral parts of north India today',
        newsDetail: 'The IMD prediction is for Uttarakhand, Punjab, Chandigarh, Haryana and national capital Delhi.',
        inBookmark: true,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        isVideo: true,
    },
    {
        id: '5',
        newsImage: require('../../assets/images/news_image/img7.png'),
        headLine: 'Yogi Adityanath unveils Population Policy 2021-2030 for Uttar Pradesh',
        newsDetail: 'The population policy and the draft bill for population control have become a political flashpoint in Uttar Pradesh where Assembly election is slated to be held early next year',
        inBookmark: false,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        isVideo: true,
    },
    {
        id: '6',
        newsImage: require('../../assets/images/news_image/img8.png'),
        headLine: 'Rath Yatra to be taken out in Ahmedabad today amid curfew',
        newsDetail: 'Chief Minister Vijay Rupani and his deputy Nitin Patel, who visited the Lord Jagannath temple on Sunday evening for aarti, ahead of the 144th Lord Jagannath Rath Yatra in Ahmedabad, appealed to people to watch the proceedings of the event on television.',
        inBookmark: true,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        isVideo: true,
    },
    {
        id: '7',
        newsImage: require('../../assets/images/news_image/img9.png'),
        headLine: 'IMD predicts heavy to very heavy rains in serveral parts of north India',
        newsDetail: 'Arrested AI-Qaeda-Linked terrorists were planning to use human bomb: UP Police',
        inBookmark: false,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        isVideo: true,
    },
    {
        id: '8',
        newsImage: require('../../assets/images/news_image/img10.png'),
        headLine: 'India Flies out Kandahar mission personnel as Taliban advance',
        newsDetail: 'The Indian mission is now manned only by local Afghan staff and while it is technically open, for all intents and purpos.',
        inBookmark: false,
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        isVideo: true,
    },
];

const AllTopNewsScreen = ({ navigation, route }) => {

    const category = route.params.category;
    const keywords = category;
    let bannerSliderList_temp = []
    const [topNews, setTopNews] = useState(bannerSliderList_temp);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await fetchNews({keywords});
        }
        fetchData();
        // if (bannerSliderList_live.length <= 4) {
        //     fetchData();
        // }
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {news()}
            </View>
        </SafeAreaView>
    )
    async function fetchNews({keywords}) {
        let count = 0;
        let bannerSliderList_temp = [];
    
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
    
        const startDate = currentYear + "-" + (currentMonth) + "-" + (currentDay);
        // const sevenDaysAgo = new Date(currentYear, currentMonth, currentDay - 7);
    
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
                sortBy: 'relevancy',
                // from: startDate,
                language: 'en',
                // searchIn: 'description',
                source:'au',
            });
    
            const articles = response.articles;
            let bannerSliderList_temp = [];
            console.log('Found', articles.length, 'articles:');
            console.log(bannerSliderList_temp.length);
    
            for (const article of articles) {
                if (bannerSliderList_temp.length <= 12){
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
                    console.log(bannerSliderList_temp.length)
                    console.log('Title:', article.title);
                    console.log('URL:', article.url);
                    console.log('Description:', article.description);
                    console.log('Publish Time:', article.publishedAt);
                    console.log('Image:', image);
                    console.log('Source:', article.source);
                    console.log('------');
                    if (news.description && news.newsImage != null){
                        bannerSliderList_temp.push(news)
                        count++
                    }
                } else {
                    setTopNews(bannerSliderList_temp); 
                    setIsLoading(false); 
                    return;
                }
            }
    
        } catch (error) {
            console.error('Error fetching news:', error);
        }
      
    }

    function news() {
        if (isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color={Colors.primaryColor} />
                </View>
            );
        }

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    item.isVideo
                        ?
                        navigation.push('VideoDetail', { item })
                        :
                        navigation.push('NewsDetail', { item })
                }}
                style={styles.topNewsWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Image
                            source={item.newsImage}
                            style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding - 6.0, }}
                        />
                        {
                            item.isVideo
                                ?
                                <MaterialIcons
                                    name="play-arrow"
                                    color={Colors.whiteColor}
                                    size={23}
                                    style={{
                                        position: 'absolute',
                                        bottom: 0.0,
                                        left: 0.0,
                                    }}
                                />
                                :
                                null
                        }
                    </View>
                    <View style={{
                        marginLeft: Sizes.fixPadding,
                        maxWidth: width - 160,
                    }}>
                        <Text
                            numberOfLines={2}
                            style={{ lineHeight: 18, ...Fonts.whiteColor14Bold }}
                        >
                            {item.headLine}
                        </Text>
                        <Text
                            numberOfLines={2}
                            style={{ ...Fonts.grayColor10SemiBold }}
                        >
                            {item.newsDetail}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={topNews}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding,
                    paddingBottom: Sizes.fixPadding * 2.0,
                }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function updateTopNews({ id }) {
        const newList = topNews.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inBookmark: !item.inBookmark };
                return updatedItem;
            }
            return item;
        });
        setTopNews(newList);
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={24}
                    onPress={() => navigation.pop()}
                />
                <MaterialIcons
                    name="search"
                    color={Colors.whiteColor}
                    size={24}
                    onPress={() => navigation.push('Search',{searchType})}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    topNewsWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default AllTopNewsScreen;