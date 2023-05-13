// components/GoogleNewsSearch.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const GoogleNewsSearch = () => {
  const [query, setQuery] = useState('');
  const [newsResults, setNewsResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let newsResults_test = [];

  // Replace YOUR_API_KEY with your actual SerpApi key
  const apiKey = '58dc965f755f122b3067a0d51f373c147cbfc15af03d7586084c321848730d97';

  const searchGoogleNews = async (searchQuery) => {
    setLoading(true);
    const parameters = {
      q: searchQuery,
      tbm: 'nws',
      num: 10, // Request 10 results from the API
    };
  
    const queryString = new URLSearchParams(parameters).toString();
    const apiUrl = `https://serpapi.com/search?${queryString}&api_key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const searchResults = await response.json();
      console.log(searchResults)
  
      if (searchResults && searchResults.news_results) {
        setNewsResults(searchResults.news_results.slice(0, 10)); // Display the first 10 results
      } else {
        setNewsResults([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
            {newsResults.map((result, index) => (
              <View key={index} style={styles.result}>
                <Text style={styles.title}>{result.title}</Text>
                <Text style={styles.link}>{result.link}</Text>
                <Text style={styles.source}>{result.source}</Text>
              </View>
            ))}
          </ScrollView>
        )}
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