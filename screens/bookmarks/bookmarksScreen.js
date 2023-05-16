import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, StatusBar, TouchableHighlight, Animated, TouchableOpacity, Dimensions, Image, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { MaterialIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { BookmarkContext } from "../BookmarkContext";
const { width } = Dimensions.get('window');


const bookmarkList = [
    {
        key: '1',
        newsImage: require('../../assets/images/news_image/img16.png'),
        headLine: 'Euro 2023: Portugal Captain Cristiano Ronaldo Wins Golden Boot',
        newsDetail: 'Cristiano Ronaldo won the Golden Boot at Euro 2023 on Sunday Cristiano Ronaldo, 36, scored five goals for Portugal Ronaldo also featured in a record fifth European Championship',
        date: '2 days ago',
        viewsCount: 365,
        newsCategory: 'Sports',
        isVideo: true,
    },
    {
        key: '2',
        newsImage: require('../../assets/images/news_image/img21.png'),
        headLine: 'Taapsee Pannu reacts to being labelled a \'superstar\', says \'let theatres reopen',
        newsDetail: 'Taapsee Pannu has said that while she can sense positive signs, she is currently not in a position to say that she has become a \'star\' in Bollywood.',
        date: '2 days ago',
        viewsCount: 365,
        newsCategory: 'Entertainment',
        isVideo: false,
    },
    {
        key: '3',
        newsImage: require('../../assets/images/news_image/img14.png'),
        headLine: 'Zydus Cadila\'s Covid-19 vaccine approval likely in next few days',
        newsDetail: 'Gujarat-based pharmaceutical major Zydus Cadila\'s covid-19 vaccine may not be available soon as emergency approval from the country’s top drug regulator is likely to take a few more days, according to ANI sources.',
        date: '3 days ago',
        viewsCount: 365,
        newsCategory: 'World',
        isVideo: false,
    },
    {
        key: '4',
        newsImage: require('../../assets/images/news_image/img18.png'),
        headLine: 'Why People with Cancer Should Be in COVID-19 Vaccinaton Trials',
        newsDetail: 'Expert are uncertain how effective COVID-19 vaccines are for people being treated for cancer and those who have survived the disease.',
        date: '3 days ago',
        viewsCount: 365,
        newsCategory: 'Health',
        isVideo: true,
    },
    {
        key: '5',
        newsImage: require('../../assets/images/news_image/img19.png'),
        headLine: 'Zomato IPO opens July 14, check grey market premium; should you subscribe for listing gains?',
        newsDetail: 'Zomato, an online food delivery platform, sha- ses were trading with premium in the primary market, ahead of its Rs 9,375-crore  IPO was sold in a price band of Rs 74-76 a share during 14-16 July.',
        date: '3 days ago',
        viewsCount: 365,
        newsCategory: 'Business',
        isVideo: true,
    },
    {
        key: '6',
        newsImage: require('../../assets/images/news_image/img3.png'),
        headLine: 'More than 2 can cost you govt Job, single child\'s entry in IIT',
        newsDetail: 'Those who have only one child and undergo sterilisation will additionally get free health care facility, preference to child in admission in all education institutions, including IIMs and AIIMS.',
        date: '3 days ago',
        viewsCount: 365,
        newsCategory: 'Other',
        isVideo: true,
    }
];

// Array(bookmarkList.length).fill('').forEach((_, i) => {
//     rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
// });

const BookmarksScreen = ({ navigation }) => {
    const { bookmarks, removeBookmark, updateBookmark } = useContext(BookmarkContext);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [listData, setListData] = useState(bookmarks);

    const rowSwipeAnimatedValues = {};
    bookmarks.forEach((item) => {
        if (!rowSwipeAnimatedValues[item.key]) {
            rowSwipeAnimatedValues[item.key] = new Animated.Value(0);
        }
    });

    // Listen for changes in bookmarkUpdated and update local state accordingly.
    useEffect(() => {
        setListData(bookmarks);
    }, [bookmarks]);

    useEffect(() => {
        bookmarks.forEach((item) => {
            if (!rowSwipeAnimatedValues[item.key]) {
                rowSwipeAnimatedValues[item.key] = new Animated.Value(0);
            }
        });
    }, [bookmarks]);


    console.log(bookmarks)
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }}
                    />
                    <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                        Delete
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        updateBookmark(newData);
        setShowSnackBar(true);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    function removeItem({ key }) {
        console.log(key)
        removeBookmark(key);
        setShowSnackBar(true);
    }

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.backColor }}
            activeOpacity={0.7}
        >
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        data.isVideo ?
                            navigation.push('VideoDetail', { item: data.item })
                            :
                            navigation.push('NewsDetail', { item: data.item })
                    }}
                    style={{
                        marginBottom: Sizes.fixPadding * 2.0,
                        marginHorizontal: Sizes.fixPadding * 2.0
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={data.item.newsImage}
                                style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                            />
                            {
                                data.item.isVideo
                                    ?
                                    <View style={styles.recommendedPlayArrowIconWrapStyle}>
                                        <MaterialIcons
                                            name="play-arrow"
                                            color={Colors.whiteColor}
                                            size={25}
                                        />
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        <View style={{
                            maxWidth: width - 140,
                            marginLeft: Sizes.fixPadding,
                        }}>
                            <Text numberOfLines={2} style={{ ...Fonts.whiteColor14Bold }}>
                                {data.item.headLine}
                            </Text>
                            <Text numberOfLines={3} style={{ ...Fonts.grayColor11Medium }}>
                                {data.item.newsDetail}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.dateBookmarkAndCategoryWrapStyle}>
                        <View style={{ marginLeft: 80 + Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="access-time"
                                color={Colors.grayColor}
                                size={13}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor10SemiBold }}>
                                {data.item.date}
                            </Text>
                            {/* <View style={{ marginLeft: Sizes.fixPadding * 3.0, flexDirection: 'row', alignItems: 'center' }}>
                                <SimpleLineIcons
                                    name="eye"
                                    size={13}
                                    color={Colors.grayColor}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                    {data.item.viewsCount}
                                </Text>
                            </View> */}
                            <Text style={{ marginLeft: Sizes.fixPadding * 3.0, ...Fonts.grayColor10SemiBold }}>
                                {data.item.newsCategory}
                            </Text>
                        </View>
                        <Text
                            onPress={() => removeItem(data.item)}
                            style={{ ...Fonts.whiteColor12Bold }}>
                            Remove
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableHighlight>
    );

    function noItemsSaveInfo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <MaterialIcons
                        name="bookmark"
                        color={Colors.grayColor}
                        size={50}
                    />
                    <View style={styles.minusIconWrapStyle}>
                        <FontAwesome
                            name="minus"
                            color={Colors.grayColor}
                            size={15}
                        />
                    </View>
                </View>
                <Text style={{
                    marginTop: Sizes.fixPadding,
                    ...Fonts.grayColor13SemiBold
                }}>
                    No new item save
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                    {listData.length == 0 ?
                        <>
                            {noItemsSaveInfo()}
                        </>
                        :
                        <SwipeListView
                            data={bookmarks}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-100}
                            onSwipeValueChange={onSwipeValueChange}
                            useNativeDriver={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
                        />
                    }
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        <Text style={{ ...Fonts.whiteColor13Medium }}>
                            News removed from bookmarks
                        </Text>
                    </Snackbar>
                </View>
            </View>
        </SafeAreaView>
    );


    function header() {
        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Bookmarks
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
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
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 25,
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: 100,
        backgroundColor: Colors.blackColor,
        right: 0,
    },
    minusIconWrapStyle: {
        position: 'absolute',
        top: 5.0,
        right: -1.0,
        backgroundColor: Colors.backColor,
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default BookmarksScreen;