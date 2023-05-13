// components/GoogleNewsSearch.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const GoogleNewsSearch = () => {
  const [query, setQuery] = useState('');
  const [newsResults, setNewsResults] = useState([]);
  let newsResults_test = [];

  const bannerSliderList = [
    {
        id: '1',
        inBookmark: false,
        newsImage: require('../../assets/images/news_image/img22.png'),
        title: 'Over 2,500% rise in Covid death registrations in second wave in Kerala',
        source: 'bbc',
        date: '10/07/2021',
        viewsCount: 365,
        commentsCount: 100,
        link: 'Covid-19 death registration in local bodies in the state picked up at alarming pace during the second wave, going from 404 covid deaths a month to over...'
    },
    ]

  // Replace YOUR_API_KEY with your actual SerpApi key
  const apiKey = '58dc965f755f122b3067a0d51f373c147cbfc15af03d7586084c321848730d97';

  const searchGoogleNews = async (searchQuery) => {
    const parameters = {
      q: searchQuery,
      tbm: 'nws',
      num: 50, // Increase the number of results to improve the chances of getting 10 unique sources
    };

    const queryString = new URLSearchParams(parameters).toString();
    const apiUrl = `https://serpapi.com/search?${queryString}&api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const searchResults = await response.json();
      console.log(searchResults)

      if (searchResults && searchResults.organic_results) {
        // Filter the results to keep only the first result from each source
        const uniqueResults = [];
        const sources = new Set();
        for (const result of searchResults.organic_results) {
          if (!sources.has(result.source)) {
            uniqueResults.push(result);
            sources.add(result.source);
          }
          if (uniqueResults.length >= 10) {
            console.log(newsResults.length)
            break;
          }
        }
        setNewsResults(uniqueResults);
      } else {
        setNewsResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    searchGoogleNews(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Search Google News"
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSearch}>
        Search
      </Button>
      <View style={styles.resultsContainer}>
        <ScrollView>
          {bannerSliderList.map((result, index) => (
            <View key={index} style={styles.result}>
              <Text style={styles.title}>{result.title}</Text>
              <Text style={styles.link}>{result.link}</Text>
              <Text style={styles.source}>{result.source}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  resultsContainer: {
    flex: 1, // This will ensure that the ScrollView takes up the available space
  },
  result: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 12,
    color: 'blue',
  },
  source: {
    fontSize: 12,
  },
});

export default GoogleNewsSearch;