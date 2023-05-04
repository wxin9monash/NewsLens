import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, StatusBar, TouchableOpacity, FlatList, ImageBackground, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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

const AllLatestScreen = ({ navigation }) => {

    const [latestNews, setLatestNews] = useState(latestNewsList);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {news()}
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
        setLatestNews(newList);
    }

    function news() {

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

        return (
            <FlatList
                data={latestNews}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding, }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={24}
                    onPress={() => navigation.pop()}
                />
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

export default AllLatestScreen;