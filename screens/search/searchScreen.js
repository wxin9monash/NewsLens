import React, { useState, createRef } from "react";
import { SafeAreaView, View, Dimensions, ScrollView, StatusBar, Image, TextInput, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const recentSearchesList = [
    {
        id: '1',
        search: 'Ronaldo',
    },
    {
        id: '2',
        search: 'COVID-19',
    },
    {
        id: '3',
        search: 'Test Ind - Aus',
    },
    {
        id: '4',
        search: 'Current affairs',
    }
];

const searchResultsList = [
    {
        id: '1',
        newsImage: require('../../assets/images/news_image/img12.png'),
        headLine: 'Coronavirus Live updates: Favipiravir oral suspension to treat Covid-19',
        newsDetail: 'India on Monday reported 37,154 new Covid-19 cases in last 24 hours, pushing the country\'s caseload to 3,08,74376.',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        inBookmark: true,
    },
    {
        id: '2',
        newsImage: require('../../assets/images/news_image/img13.png'),
        headLine: 'Covid-19:Delhi\'s Janpatj market to remain closed until further orders',
        newsDetail: 'Authorities have launched a crackdown and closed several prominent market places in the national capital over the gross violation of Covid appropriate behaviour such as wearing of masks and maintaining social distancing.',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        inBookmark: false,
    },
    {
        id: '3',
        newsImage: require('../../assets/images/news_image/img14.png'),
        headLine: 'Zydus Cadila\'s Covid-19 vaccine approval likely in next few days',
        newsDetail: 'Gujarat-based pharmaceutical major Zydus Cadila\'s covid-19 vaccine may not be available soon as emergency approval from the country’s top drug regulator is likely to take a few more days, according to ANI sources.',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        inBookmark: true,
    },
    {
        id: '4',
        newsImage: require('../../assets/images/news_image/img15.png'),
        headLine: '42 new coronavirus cases in Gujarat; no fresh death reported',
        newsDetail: 'No fresh death was reported during the day and the toll currently stands at 10,073, it said.',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 10,
        inBookmark: false,
    },
];

const SearchScreen = ({ navigation }) => {

    const [state, setState] = useState({
        recentSearches: recentSearchesList,
        search: '',
        showSearchResults: false,
        searchResults: searchResultsList,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        recentSearches,
        search,
        showSearchResults,
        searchResults,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                {searchTextField()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        showSearchResults
                            ?
                            searchResultsInfo()
                            :
                            recentSearchesData()
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function updateSearchResults({ id }) {
        const newList = searchResults.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, inBookmark: !item.inBookmark };
                return updatedItem;
            }
            return item;
        });
        updateState({ searchResults: newList })
    }

    function searchResultsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                {
                    searchResults.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={{ marginBottom: Sizes.fixPadding + 15.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Image
                                        source={item.newsImage}
                                        style={{
                                            width: 65.0,
                                            height: 65.0,
                                            borderRadius: Sizes.fixPadding - 5.0,
                                        }}
                                    />
                                    <View style={{ maxWidth: width - 130, marginLeft: Sizes.fixPadding, }}>
                                        <Text numberOfLines={2} style={{ lineHeight: 18.0, ...Fonts.blackColor13Bold }}>
                                            {item.headLine}
                                        </Text>
                                        <Text numberOfLines={2} style={{ ...Fonts.grayColor10SemiBold }}>
                                            {item.newsDetail}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ marginRight: Sizes.fixPadding * 6.0, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialIcons
                                                name="access-time"
                                                color={Colors.grayColor}
                                                size={13}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                                {item.date}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <SimpleLineIcons
                                                name="eye"
                                                size={13}
                                                color={Colors.grayColor}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                                {item.viewsCount}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialIcons
                                                name="share"
                                                color={Colors.grayColor}
                                                size={13}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                                Share
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialCommunityIcons
                                                name="comment-text-outline"
                                                color={Colors.grayColor}
                                                size={13}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                                {item.commentsCount}comments
                                            </Text>
                                        </View>
                                    </View>
                                    <MaterialIcons
                                        name={item.inBookmark ? "bookmark" : 'bookmark-outline'}
                                        color={item.inBookmark ? Colors.blackColor : Colors.grayColor}
                                        size={15}
                                        onPress={() => updateSearchResults({ id: item.id })}
                                    />
                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    function removeSearch({ id }) {
        var data = recentSearches.filter((item) => item.id != id)
        updateState({ recentSearches: data });
    }

    function recentSearchesData() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    Recent Searches
                </Text>
                {
                    recentSearches.length == 0
                        ?
                        noRecentSearchesInfo()
                        :
                        recentSearchesInfo()
                }
            </View>
        )
    }

    function recentSearchesInfo() {
        return (
            <>
                {
                    recentSearches.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={styles.recentSearchesWrapStyle}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons
                                        name="access-time"
                                        color={Colors.grayColor}
                                        size={15}
                                    />
                                    <Text style={{
                                        maxWidth: width - 120.0,
                                        marginLeft: Sizes.fixPadding + 5.0,
                                        ...Fonts.grayColor13SemiBold
                                    }}>
                                        {item.search}
                                    </Text>
                                </View>
                                <MaterialIcons
                                    name="close"
                                    color={Colors.grayColor}
                                    size={20}
                                    onPress={() => removeSearch({ id: item.id })}
                                />
                            </View>
                            <View style={{
                                marginVertical: Sizes.fixPadding - 5.0,
                                backgroundColor: '#e0e0e0',
                                height: 1.0,
                            }}
                            />
                        </View>
                    ))
                }
            </>
        )
    }

    function noRecentSearchesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 3.0, alignItems: 'center' }}>
                <MaterialIcons
                    name="history"
                    color={Colors.grayColor}
                    size={50}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor13SemiBold }}>
                    Recent search history is empty
                </Text>
            </View>
        )
    }

    function searchTextField() {
        const textInputRef = createRef();
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        ref={textInputRef}
                        value={search}
                        onChangeText={(text) => updateState({ search: text })}
                        selectionColor={Colors.blackColor}
                        placeholder="Search News"
                        style={{ ...Fonts.blackColor12SemiBold, flex: 1, }}
                        placeholderTextColor={Colors.grayColor}
                    />
                    {
                        search === null || search.match(/^ *$/) !== null || showSearchResults
                            ?
                            <MaterialIcons
                                name="close"
                                color={Colors.grayColor}
                                size={22}
                                onPress={() => {
                                    updateState({ showSearchResults: false })
                                    textInputRef.current.focus()
                                }}
                            />
                            :
                            <MaterialIcons
                                name="search"
                                color={Colors.grayColor}
                                size={22}
                                onPress={() => {
                                    updateState({ showSearchResults: true })
                                    textInputRef.current.blur()
                                }}
                            />
                    }
                </View>
                <View style={{ backgroundColor: '#e0e0e0', height: 1.0, }} />
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back-ios"
                color={Colors.blackColor}
                size={24}
                onPress={() => navigation.pop()}
                style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0 }}
            />
        )
    }
}

const styles = StyleSheet.create({
    recentSearchesWrapStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default SearchScreen;