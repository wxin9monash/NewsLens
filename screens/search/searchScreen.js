import React, { useState, createRef } from "react";
import { SafeAreaView, View, Dimensions, ScrollView, StatusBar, Image, TextInput, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('65d1f052cb624a518a8e5c48aeb8e75d'); 
let count = 0;
let searchResultsList_live = [];
let recentSearchesList = [];


const SearchScreen = ({ navigation, route }) => {
    const searchType = route.params.searchType

    const [state, setState] = useState({
        recentSearches: recentSearchesList,
        search: '',
        showSearchResults: false,
        searchResults: searchResultsList_live,
        loading: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        recentSearches,
        search,
        showSearchResults,
        searchResults,
        loading,
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
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.push('NewsDetail', { item })}
                        >
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
                                            <Text numberOfLines={2} style={{ lineHeight: 18.0, ...Fonts.whiteColor14Bold }}>
                                                {item.headLine}
                                            </Text>
                                            <Text numberOfLines={2} style={{ ...Fonts.grayColor10SemiBold }}>
                                                {item.description}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ marginRight: Sizes.fixPadding * 6.0, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ marginLeft: 65 + Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialIcons
                                                    name="access-time"
                                                    color={Colors.grayColor}
                                                    size={13}
                                                />
                                                <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                                    {item.date}
                                                </Text>
                                            </View>
                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <SimpleLineIcons
                                                    name="eye"
                                                    size={13}
                                                    color={Colors.grayColor}
                                                />
                                                <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                                    {item.viewsCount}
                                                </Text>
                                            </View> */}

                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialCommunityIcons
                                                    name="comment-text-outline"
                                                    color={Colors.grayColor}
                                                    size={13}
                                                />
                                                <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                                                    {item.commentsCount}comments
                                                </Text>
                                            </View> */}
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
                        </TouchableOpacity>
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
                <Text style={{ ...Fonts.whiteColor16Bold }}>
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

    async function SearchNews(userInput) {

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
                q: userInput,
                language: 'en',
                // sortBy: 'publishedAt',
            });
    
            const articles = response.articles;
            searchResultsList_live = [];
            console.log('Found', articles.length, 'articles:');
            console.log(searchResultsList_live.length);
    
            for (const article of articles) {
                if (searchResultsList_live.length <= 10){
                    const image = {uri: article.urlToImage};
                    const randomInteger = Math.floor(Math.random() * (1000 - 800 + 1)) + 800;
                    const news ={
                        id: count,
                        newsImage: image,
                        headLine: article.title,
                        date: convertTimeToAustralia(article.publishedAt),
                        viewsCount: randomInteger,
                        commentsCount: randomInteger - 629,
                        newsDetail: article.content,
                        description: article.description,
                        newsUrl: article.url,
                        newsSource: article.source.name,
                    }
                    console.log(searchResultsList_live.length)
                    console.log('Title:', article.title);
                    console.log('URL:', article.url);
                    console.log('Description:', article.description);
                    console.log('Publish Time:', article.publishedAt);
                    console.log('Source:', article.source);
                    console.log('image:', article.urlToImage);
                    console.log('------');
                    if (news.description && news.newsImage != null){
                        searchResultsList_live.push(news)
                        count++
                    }
                } else {
                    updateState({ showSearchResults: true })
                    // searchResults: searchResultsList_live
                    updateState({ searchResults: searchResultsList_live })
                    return;
                }
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
      
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
                        placeholder={'Search News by ' + searchType}
                        style={{ ...Fonts.whiteColor14SemiBold, flex: 1, }}
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
                                    console.log({search})
                                    SearchNews(search)
                                    updateState({ showSearchResults: true })
                                    updateState({ searchResults: searchResultsList_live })
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
                color={Colors.whiteColor}
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