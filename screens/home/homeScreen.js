import React, { useState } from "react";
import { SafeAreaView, Dimensions, ScrollView, View, TouchableOpacity, StatusBar, Image, Text, ImageBackground, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

const { width } = Dimensions.get('window');

const bannerSliderList = [
    {
        id: '1',
        inBookmark: false,
        newsImage: require('../../assets/images/news_image/img22.png'),
        headLine: 'Over 2,500% rise in Covid death registrations in second wave in Kerala',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 100,
        newsDetail: 'Covid-19 death registration in local bodies in the state picked up at alarming pace during the second wave, going from 404 covid deaths a month to over...'
    },
    {
        id: '2',
        inBookmark: false,
        newsImage: require('../../assets/images/news_image/img23.jpg'),
        headLine: 'High Court Grants Temporary Bail To Surendra Gadling In Elgar Parishad Case',
        date: '10/07/2021',
        viewsCount: 565,
        commentsCount: 20,
        newsDetail: 'Surendra Gadling. ladged at Taloja Jail in Navi Mumbai, can be out on bail from August 13 to 21, said a division bench of Justices SS Shinde and N J Jamadar.'
    },
    {
        id: '3',
        inBookmark: false,
        newsImage: require('../../assets/images/news_image/img26.png'),
        headLine: 'Gujarat Zoo To Trade 40 Asiatic Lions For Other Wild Animals',
        date: '10/07/2021',
        viewsCount: 360,
        commentsCount: 70,
        newsDetail: 'Gujarat Zoo To Trade 40 Asiatic Lions For Other Wild Animals Under the animal exchange programme, 40 Asiatic lions of this zoo will be traded with zoos across the country for different wild animals.',
    },
    {
        id: '4',
        inBookmark: false,
        newsImage: require('../../assets/images/news_image/img25.png'),
        headLine: 'Mi Hyper Sonic Power Bank With 50W Fast Charging, 20,000mAh Capacity Launched in India.',
        date: '10/07/2021',
        viewsCount: 300,
        commentsCount: 50,
        newsDetail: 'Mi Hyper Sonic Power Bank can deliver up to 22.5W via USB Type-A ports.'
    },
    {
        id: '5',
        inBookmark: false,
        newsImage: require('../../assets/images/news_image/img24.png'),
        headLine: 'Flat White: The Coffe Brew That Australia And New Zealand Continue To Fight Over',
        date: '10/07/2021',
        viewsCount: 305,
        commentsCount: 10,
        newsDetail: 'It\'s not just the Aussie-Kiwi legends that form the backdrop of the Flat White origin story, there\'s also the rivalry between Sydney and Melbourne akin to the Delhi-Mumbai city rivarly.'
    }
];

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

const latestNewsList = [
    {
        id: '1',
        inBookmark: false,
        isVideo: true,
        newsImage: require('../../assets/images/news_image/img4.png'),
        headLine: 'Euro 2020:England fans left feeling  blue after heartbreaking loss to Italy in final on penalties - Sports News.',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        newsDetail: 'A nail-biting match turned heart-breaking when penalties got the best of team England and they lost to the Italians 3-2 on penalties on the 11th of July in UEFA Euro Cup 2020 at the Wembley Stadium, London.',
    },
    {
        id: '2',
        inBookmark: false,
        newsImage: require('../../assets/images/news_image/img5.png'),
        headLine: 'Dilip Kumar was shocked to learn that stars charge money to attend weddings.',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        newsDetail: 'Dilip Kumar along with veteran comedian Johnny Walker at his residence. Speaking about his first meeting with the thespian, Jaffrey said, “Because I had accompanied Johnny Walker uncle I was given extra importance by Dilip saab.',
    },
];

const HomeScreen = ({ navigation }) => {

    const [state, setState] = useState({
        bannerList: bannerSliderList,
        activeSlide: 0,
        topNews: topNewsList,
        latestNews: latestNewsList,
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
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {bannerSlider()}
                    {topNewsInfo()}
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
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        Latest News
                    </Text>
                    <Text
                        onPress={() => navigation.push('AllLatestNews')}
                        style={{ ...Fonts.blackColor12Bold }}
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
                                            numberOfLines={1}
                                            style={{
                                                ...Fonts.blackColor14Bold,
                                                maxWidth: width - 150.0,
                                            }}
                                        >
                                            {item.headLine}
                                        </Text>
                                        <MaterialIcons
                                            name={item.inBookmark ? "bookmark" : "bookmark-outline"}
                                            color={item.inBookmark ? Colors.blackColor : Colors.grayColor}
                                            size={15}
                                            onPress={() => updateLatestNews({ id: item.id })}
                                        />
                                    </View>

                                    <View style={styles.latestNewsCommentDateViewsWrapStyle}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialIcons
                                                name="access-time"
                                                color={Colors.grayColor}
                                                size={13}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10Light }}>
                                                {item.date}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <SimpleLineIcons
                                                name="eye"
                                                size={13}
                                                color={Colors.grayColor}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10Light }}>
                                                {item.viewsCount}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialIcons
                                                name="share"
                                                color={Colors.grayColor}
                                                size={13}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10Light }}>
                                                Share
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialCommunityIcons
                                                name="comment-text-outline"
                                                color={Colors.grayColor}
                                                size={13}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10Medium }}>
                                                {item.commentsCount}comments
                                            </Text>
                                        </View>
                                    </View>

                                    <Text
                                        numberOfLines={4}
                                        style={{ ...Fonts.grayColor10Medium }}
                                    >
                                        {item.newsDetail}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
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
        updateState({ topNews: newList })
    }

    function topNewsInfo() {
        return (
            <View>
                <View style={styles.topNewsTitleWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        Top News
                    </Text>
                    <Text
                        onPress={() => navigation.push('AllTopNews')}
                        style={{ ...Fonts.blackColor12Bold }}
                    >
                        View All
                    </Text>
                </View>
                {
                    topNews.map((item) => (
                        <View key={`${item.id}`}>
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
                                            style={{ lineHeight: 18, ...Fonts.blackColor13Bold }}
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
                                <MaterialIcons
                                    name={item.inBookmark ? "bookmark" : 'bookmark-outline'}
                                    color={item.inBookmark ? Colors.blackColor : Colors.grayColor}
                                    size={16}
                                    onPress={() => updateTopNews({ id: item.id })}
                                />
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
                            size={18}
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => updateBannerList({ id: item.id })}
                        />
                        <View style={{ marginTop: Sizes.fixPadding, marginRight: Sizes.fixPadding * 5.0, }}>
                            <Text
                                numberOfLines={2}
                                style={{ ...Fonts.whiteColor12SemiBold }}
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
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor10Light }}>
                                        {item.date}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <SimpleLineIcons
                                        name="eye"
                                        size={13}
                                        color={Colors.whiteColor}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor10Light }}>
                                        {item.viewsCount}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons
                                        name="share"
                                        color={Colors.whiteColor}
                                        size={13}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor10Light }}>
                                        Share
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons
                                        name="comment-text-outline"
                                        color={Colors.whiteColor}
                                        size={13}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor10Light }}>
                                        {item.commentsCount}comments
                                    </Text>
                                </View>
                            </View>
                            <Text style={{ ...Fonts.whiteColor9Light }}>
                                {item.newsDetail}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
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
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Home
                </Text>
                <MaterialIcons
                    name="search"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.push('Search')}
                />
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
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginTop: -30.0,
        marginHorizontal: Sizes.fixPadding * 2.5,
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
        justifyContent: 'space-between'
    }
})

export default HomeScreen;