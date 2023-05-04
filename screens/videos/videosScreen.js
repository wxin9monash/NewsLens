import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const videosList = [
    {
        id: '1',
        newsImage: require('../../assets/images/news_image/img16.png'),
        headLine: 'Euro 2020: Portugal Captain Cristiano Ronaldo Wins Golden Boot',
        newsDetail: 'Cristiano Ronaldo won the Golden Boot at Euro 2020 on Sunday Cristiano Ronaldo, 36, scored five goals for Portugal Ronaldo also featured in a record fifth European Championship',
        date: '10/07/2021',
        newsCategory: 'Sports',
        inBookmark: true,
    },
    {
        id: '2',
        newsImage: require('../../assets/images/news_image/img17.png'),
        headLine: 'WhatsApp Privacy Policy Update That Gives Facebook User Data Access Criticsed by Europe Consumer Organisation',
        newsDetail: 'Facebook\'s WhatsApp on Monday faced a barrage of complaints by the European Consumer Organisation and others over a privacy policy update, which has prompted a global outcry and led some users to switch to rival apps Telegram and Signal.',
        date: '10/07/2021',
        newsCategory: 'Technology',
        inBookmark: false,
    },
    {
        id: '3',
        newsImage: require('../../assets/images/news_image/img18.png'),
        headLine: 'Why People with Cancer Should Be in COVID-19 Vaccinaton Trials',
        newsDetail: 'Expert are uncertain how effective COVID-19 vaccines are for people being treated for cancer and those who have survived the disease.',
        date: '10/07/2021',
        newsCategory: 'Health',
        inBookmark: false,
    },
    {
        id: '4',
        newsImage: require('../../assets/images/news_image/img19.png'),
        headLine: 'Zomato IPO opens July 14, check grey market premium; should you subscribe for listing gains?',
        newsDetail: 'Zomato, an online food delivery platform, sha- ses were trading with premium in the primary market, ahead of its Rs 9,375-crore  IPO was sold in a price band of Rs 74-76 a share during 14-16 July.',
        date: '10/07/2021',
        newsCategory: 'Business',
        inBookmark: true,
    },
    {
        id: '5',
        newsImage: require('../../assets/images/news_image/img20.png'),
        headLine: 'Food joints focusing more on direct delivery!',
        newsDetail: 'Multiple food joints are on their way to become ‘atmanirbhar’ and have started self-delivery services in the city. Some of them have discontinued the services of known food aggregators.',
        date: '10/07/2021',
        newsCategory: 'Food',
        inBookmark: false,
    },
    {
        id: '6',
        newsImage: require('../../assets/images/news_image/img16.png'),
        headLine: 'Euro 2020: Portugal Captain Cristiano Ronaldo Wins Golden Boot',
        newsDetail: 'Cristiano Ronaldo won the Golden Boot at Euro 2020 on Sunday Cristiano Ronaldo, 36, scored five goals for Portugal Ronaldo also featured in a record fifth European Championship',
        date: '10/07/2021',
        newsCategory: 'Sports',
        inBookmark: false,
    },
];

const VideosScreen = ({ navigation }) => {

    const [videosData, setvideosData] = useState(videosList)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {videos()}
            </View>
        </SafeAreaView>
    )

    function updateVideosData({ id }) {
        const newList = videosData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inBookmark: !item.inBookmark };
                return updatedItem;
            }
            return item;
        });
        setvideosData(newList)
    }

    function videos() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('VideoDetail', { item })}
                style={{
                    marginBottom: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={item.newsImage}
                            style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                        />
                        <View style={styles.recommendedPlayArrowIconWrapStyle}>
                            <MaterialIcons
                                name="play-arrow"
                                color={Colors.whiteColor}
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={{
                        maxWidth: width - 140,
                        marginLeft: Sizes.fixPadding,
                    }}>
                        <Text numberOfLines={2} style={{ ...Fonts.blackColor13Bold }}>
                            {item.headLine}
                        </Text>
                        <Text numberOfLines={3} style={{ ...Fonts.grayColor11Medium }}>
                            {item.newsDetail}
                        </Text>
                    </View>
                </View>
                <View style={styles.dateBookmarkAndCategoryWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="access-time"
                            color={Colors.grayColor}
                            size={13}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor10SemiBold }}>
                            {item.date}
                        </Text>
                        <Text style={{ marginLeft: Sizes.fixPadding * 3.0, ...Fonts.grayColor11Medium }}>
                            {item.newsCategory}
                        </Text>
                    </View>
                    <MaterialIcons
                        name={item.inBookmark ? "bookmark" : 'bookmark-outline'}
                        color={item.inBookmark ? Colors.blackColor : Colors.grayColor}
                        size={15}
                        onPress={() => updateVideosData({ id: item.id })}
                    />
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={videosData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Videos
                </Text>
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
    recommendedPlayArrowIconWrapStyle: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    dateBookmarkAndCategoryWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding - 8.0,
    }
})

export default VideosScreen;