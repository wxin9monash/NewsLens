// React and React Native imports necessary for the screen
import React, { useState, createRef } from "react";
import { SafeAreaView, View, Dimensions, ScrollView, StatusBar, Image, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
// Dimensions API to get the window width
const { width } = Dimensions.get('window');

// NewsAPI for fetching news data
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('2cd35fd59fe44ea3841b860501b72886');
// 88a285931c764d54b7dc0a8bdcb9baab
// f53ef1482bff4b87aa86646ad673f635
const apiKey = 'f602700c8c886e2a13866218196530820d2e4a82de4716739ecd293a7ae3bab2';
let count = 1;
let searchResultsList_live = [];
let recentSearchesList = [];


// Main component for the SearchScreen
const SearchScreen = ({ navigation, route }) => {
    const searchType = route.params.searchType// Retrieve the searchType from the navigation params

    // Initialize state for search and search results
    const [state, setState] = useState({
        recentSearches: recentSearchesList,
        search: '',
        showSearchResults: false,
        searchResults: searchResultsList_live,
        loading: false,
    })

    // Function to update the state
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    // Destructure state variables for convenience
    const {
        recentSearches,
        search,
        showSearchResults,
        searchResults,
        loading,
    } = state;

    // Return the rendered component
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

    // Update the search results based on user's action
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

    // Render the search results, or a loading indicator if results are being fetched
    function searchResultsInfo() {
        if (loading) { // If loading, render a loading spinner
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='white' />
                </View>
            );
        }

        // Otherwise, render the search results
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                {
                    searchResults.map((item) => (
                        <TouchableOpacity
                            key={item.id}
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

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    // Remove a search term from the recent searches list
    function removeSearch({ id }) {
        var data = recentSearches.filter((item) => item.id != id)
        updateState({ recentSearches: data });
    }

    // Render the recent searches or a message if there are none
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

    // Render the list of recent searches
    function recentSearchesInfo() {
        return (
            // Here goes the code to render each individual recent search...
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
    // Render a message indicating there are no recent searches
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

    // This function fetches news data from Google using the SerpApi
    async function searchGoogleNews(searchQuery) {
        updateState({ loading: true });;
        const parameters = {
            q: searchQuery,
            tbm: 'nws',
            num: 50, // Request 100 results from the API
        };

        // Construct the query string from the parameters
        const queryString = new URLSearchParams(parameters).toString();
        // Construct the API URL with the query string and API key
        const apiUrl = `https://serpapi.com/search?${queryString}&api_key=${apiKey}`;

        try {
            // Fetch the search results from the API
            const response = await fetch(apiUrl);
            const searchResults = await response.json();

            if (searchResults && searchResults.news_results) {
                // If there are search results, process them
                for (const article of searchResults.news_results) {
                    // Only process the first 10 results
                    if (searchResultsList_live.length <= 10) {
                        // Extract the necessary data from each result
                        const image = { uri: article.thumbnail };
                        const randomInteger = Math.floor(Math.random() * (1000 - 800 + 1)) + 800;
                        const news = {
                            id: count,
                            newsImage: image,
                            headLine: article.title,
                            date: article.date,
                            viewsCount: randomInteger,
                            commentsCount: randomInteger - 629,
                            newsDetail: article.snippet,
                            description: article.snippet,
                            newsUrl: article.link,
                            newsSource: article.source,
                        }
                        console.log(searchResultsList_live.length)
                        console.log('Title:', article.title);
                        console.log('URL:', article.link);
                        console.log('Description:', article.snippet);
                        console.log('Publish Time:', article.date);
                        console.log('Source:', article.source);
                        console.log('image:', image);
                        console.log('------');

                        // Add the result to the live search results list
                        searchResultsList_live.push(news);
                        count++;
                    } else {
                        // If there are already 10 results, stop processing
                        updateState({ showSearchResults: true })
                        updateState({ searchResults: searchResultsList_live })
                        return;
                    }
                }
            } else {
                // If there are no search results, clear the results list
                setNewsResults([]);
            }
        } catch (error) {
            // If an error occurred, log it
            console.error('Error fetching news:', error);
        } finally {
            // Once the processing is done, hide the loading indicator
            updateState({ loading: false });
        }
        updateState({ loading: false });
        console.log(searchResultsList_live.length)
    }

    // This function fetches news data using the NewsAPI

    async function SearchNews(userInput) {
        updateState({ loading: true });
        // A helper function to convert dates to the Australia/Sydney timezone
        function convertTimeToAustralia(dateString) {

            const date = new Date(Date.parse(dateString));
            const timezoneOffset = date.getTimezoneOffset();
            date.setMinutes(date.getMinutes() + timezoneOffset);

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
            // Fetch the news articles from the API
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
                if (searchResultsList_live.length <= 10) {
                    const image = { uri: article.urlToImage };
                    const randomInteger = Math.floor(Math.random() * (1000 - 800 + 1)) + 800;
                    const news = {
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
                    if (news.description && news.newsImage != null) {
                        searchResultsList_live.push(news)
                        count++
                    }
                } else {
                    updateState({ showSearchResults: true })
                    updateState({ searchResults: searchResultsList_live })
                    return;
                }
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            // Once the processing is done, hide the loading indicator
            updateState({ loading: false });
        }
        updateState({ loading: false });
    }


    // This function renders the search text input field
    function searchTextField() {
        // The ref is used to control the focus of the text input
        const textInputRef = createRef();

        const handleSearchFunction = (search) => {
            if (searchType === 'Keywords') {
                SearchNews(search)
            } else {
                searchGoogleNews(search)
                console.log(searchResultsList_live.length)
            }
        }

        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        ref={textInputRef}
                        value={search}
                        onChangeText={(text) => updateState({ search: text })}
                        selectionColor={Colors.whiteColor}
                        placeholder={'Search News by ' + searchType}
                        style={{ ...Fonts.whiteColor16SemiBold, flex: 1, }}
                        placeholderTextColor={Colors.grayColor}
                    />
                    {
                        search === null || search.match(/^ *$/) !== null || showSearchResults
                            ?
                            <MaterialIcons
                                name="close"
                                color={Colors.grayColor}
                                size={30}
                                onPress={() => {
                                    updateState({ showSearchResults: false, search: '' })  // Setting search to '' clears the text
                                    textInputRef.current.focus()
                                }}
                            />
                            :
                            <MaterialIcons
                                name="search"
                                color={Colors.grayColor}
                                size={30}
                                onPress={() => {
                                    console.log({ search })
                                    handleSearchFunction(search)
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

    // This function renders a back arrow for navigation
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