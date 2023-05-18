import React, { useState } from "react";
import { SafeAreaView, Dimensions, FlatList, View, StatusBar, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const mostViewNewsList = [
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
    {
        id: '3',
        inBookmark: true,
        newsImage: require('../../assets/images/news_image/img11.png'),
        headLine: 'Amazon\'s Online Store Down for many users globally',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        newsDetail: 'E-commerce giant Amazon.com Inc’s online store was grappling with widespread outages on Sunday night, according to outage monitoring website Downdetector, the second broad disruption to services since late June.',
    },
];

// This is a screen component to display the most viewed news.
const MostViewNewsScreen = ({ navigation }) => {

    // Using React's useState hook to manage state for most viewed news.
    const [mostViewNews, setMostViewNews] = useState(mostViewNewsList);

    // The main render function for the component. 
    // It returns a SafeAreaView containing the header and news items.
    return (
        // The UI of the app, with a header and a list of news items.
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {news()}
            </View>
        </SafeAreaView>
    )

    function updateMostViewNews({ id }) {
        // This function is used to update the bookmark status of a news item in the mostViewNews list. 
        // It toggles the inBookmark property of the news item.
        const newList = mostViewNews.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inBookmark: !item.inBookmark };
                return updatedItem;
            }
            return item;
        });
        setMostViewNews(newList)
    }

    // Function to render a list of news items.
    function news() {

         // The renderItem function specifies how each individual news item is rendered.
        const renderItem = ({ item }) => (
            // Each item is rendered as a touchable opacity. This makes the news item clickable.
            // Clicking on an item navigates to a detailed view of the news or video.
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
                <View style={styles.mostViewNewsDetailWrapStyle}>
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
                            onPress={() => updateMostViewNews({ id: item.id })}
                        />
                    </View>

                    <View style={styles.mostViewNewsCommentDateViewsWrapStyle}>
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
                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10Light }}>
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
        )
        // The news function returns a FlatList component that renders the list of news items.
        return (
            // The FlatList component gets its data from the mostViewNews state variable.
            <FlatList
                data={mostViewNews}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding, }}
            />
        )
    }

    // Function to render a header with a back button, title and a search button.
    function header() {
        // This function is used to render a header.
        // The header contains a back button, title, and a search button.
        // Clicking the back button navigates to the previous screen.
        // Clicking the search button navigates to the Search screen.
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.blackColor}
                        size={25}
                        onPress={() => navigation.pop()}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor20Bold }}>
                        Most View News
                    </Text>
                </View>
                <MaterialIcons
                    name="search"
                    color={Colors.blackColor}
                    size={24}
                    onPress={() => navigation.push('Search')}
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
    mostViewNewsDetailWrapStyle: {
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
    mostViewNewsCommentDateViewsWrapStyle: {
        marginVertical: Sizes.fixPadding - 7.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default MostViewNewsScreen;