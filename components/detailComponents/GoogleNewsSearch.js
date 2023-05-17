// components/GoogleNewsSearch.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Sizes, Fonts } from '../../constants/styles';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import CredibilityScore from './CredibilityScore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import image1 from '../../assets/images/media_image/7_News.png';
import image2 from '../../assets/images/media_image/9_News.png';
import image3 from '../../assets/images/media_image/ABC_News.jpg';
import image4 from '../../assets/images/media_image/The_Australian.png';
import image5 from '../../assets/images/media_image/SBS_News.png';
import image6 from '../../assets/images/media_image/The_Guardian_Australia.jpg';
import image7 from '../../assets/images/media_image/BBC.png';
import image8 from '../../assets/images/media_image/The_Australian.png';
import image9 from '../../assets/images/media_image/Sky_news.jpg';
import image10 from '../../assets/images/media_image/Sky_news.jpg';
import image11 from '../../assets/images/media_image/The_Daily_Telegraph.jpg';
import image12 from '../../assets/images/media_image/Daily_Mail_Australia.jpg';
import image13 from '../../assets/images/media_image/Daily_Mail_Australia.jpg';
import image14 from '../../assets/images/media_image/Financial_Review.png';
import image15 from '../../assets/images/media_image/news_com_au.jpg';
import image16 from '../../assets/images/media_image/Sydney_Morning_Herald.png';

// Array of media images
const images = [
  { name: '7News', source: image1 },
  { name: '9News', source: image2 },
  { name: 'ABC', source: image3 },
  { name: 'The Australian', source: image4 },
  { name: 'SBS', source: image5 },
  { name: 'The Guardian', source: image6 },
  { name: 'BBC', source: image7 },
  { name: 'The Australian', source: image8 },
  { name: 'Sky News', source: image9 },
  { name: 'Sky News Australia', source: image10 },
  { name: 'Daily Telegraph', source: image11 },
  { name: 'Daily Mail', source: image12 },
  { name: 'Daily Mail Australia', source: image13 },
  { name: 'AFR', source: image14 },
  { name: 'News.com.au', source: image15 },
  { name: 'Sydney Morning Herald', source: image16 },
];

const GoogleNewsSearch = ({ searchInput, media }) => {
  const news_media = `${media}`
  const query_media_au = `${searchInput}`
  const [query, setQuery] = useState({ query_media_au });
  const [newsResults, setNewsResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [biasScore, setBiasScore] = useState(null);

  // Function to open a link in a modal
  const openLink = (url) => {
    setCurrentUrl(url);
    setModalVisible(true);
  };

  const apiKey = 'e9e1915a46577b2706bbe40649ccb1c86a761cf5626f089cc9cb72ae7620174a';
  // SERPAI KEYS
  // 46a5a4727b4fc5a940e3abf2f792fd255683dee662ce31df157fc16ba4aa6291
  // e9e1915a46577b2706bbe40649ccb1c86a761cf5626f089cc9cb72ae7620174a
  // 465b5c87a24534d967e433e411e99d3da2611496bc2862cb741d119667cfa4f0
  // 5f7947962e85a25fa6552bb9ef58f9931e325ac8abe248c4985d1c642c407ee1
  // f602700c8c886e2a13866218196530820d2e4a82de4716739ecd293a7ae3bab2




  const mediaBiasData = require('../../assets/json/media_bias.json');
  
  // Function to filter out duplicate sources and add media bias data
  const filterUniqueSources = (results) => {
    const uniqueResults = [];
    const sources = new Set();

    results.forEach((result) => {
      if (!sources.has(result.source)) {
        const matchingImage = images.find((image) => image.name === result.source);

        // Find matching media bias data
        const matchingMediaBiasData = mediaBiasData.find((item) => item.Media === result.source);

        if (matchingImage) {
          let modifiedResult = {
            ...result,
            image: matchingImage.source,
          };

          // Add attributes from mediaBiasData if a match is found
          if (matchingMediaBiasData) {
            modifiedResult = {
              ...modifiedResult,
              ...matchingMediaBiasData,
            };
          }

          uniqueResults.push(modifiedResult);
          sources.add(result.source);
        }
      }
    });

    return uniqueResults;
  };

  // Function to find media bias data for a given media name
  const findMedia = (mediaName) => {
    const mediaItem = mediaBiasData.find(item => item.Media.toLowerCase() === mediaName.toLowerCase());
    return mediaItem ? mediaItem :     {
      "Media": "The Guardian",
      "Bias": "Left",
      "Quality": "Mixed",
      "Link": "https://www.theguardian.com/",
      "Credibility": "60",
      "Image": "../../assets/images/media_image/The_Guardian_Australia.jpg"
    };
  };

  // Function to calculate the bias score based on the number of media results
  const getScore = (num_media) => {
    if (num_media >= 0 && num_media <= 3) {
      return 40;
    } else if (num_media >= 4 && num_media <= 6) {
      return 70;
    } else if (num_media >= 7) {
      return 100;
    } else {
      return 40; // Return 40 for invalid input or cases not covered
    }
  };

  // Function to retrieve the user review score from Firestore
  const getReviewData = async (url) => {
    try {
      const reviewRef = doc(FIRESTORE_DB, 'reviews', url);
      const reviewSnap = await getDoc(reviewRef);

      if (reviewSnap.exists()) {
        const data = reviewSnap.data();
        return data.totalRating / data.count;
      } else {
        return 3; // default value
      }
    } catch (error) {
      console.error('Error getting review data:', error);
      return 3; // default value in case of error
    }
  };

  const url = news_media; // the media variable you passed to UserReview component
  let userScore = 2.5 * 20; //set base 
  getReviewData(url)
    .then(score => {
      userScore = score;
    })

  const mediaItem = findMedia(news_media);
  const mediaScore = parseFloat(mediaItem.Credibility);
  const sourceScore = getScore(newsResults.length);

  // Function to search Google News based on the search query
  const searchGoogleNews = async (searchQuery) => {
    setLoading(true);
    const parameters = {
      q: searchQuery,
      tbm: 'nws',
      num: 200, // Request 100 results from the API
    };

    const queryString = new URLSearchParams(parameters).toString();
    const apiUrl = `https://serpapi.com/search?${queryString}&api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const searchResults = await response.json();

      if (searchResults && searchResults.news_results) {
        const uniqueResults = filterUniqueSources(searchResults.news_results.slice(0, 50));
        setNewsResults(uniqueResults);
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
    setLoading(true);
    setNewsResults([]);
    setQuery(query_media_au);
    searchGoogleNews(query_media_au);
  };

  // Add the useEffect hook to trigger handleSearch when the component is rendered
  useEffect(() => {
    handleSearch();
  }, []);

  const [containerWidth, setContainerWidth] = useState(0);

  const getBiasColor = (bias) => {
    switch (bias) {
      case 'Left':
        return '#ff4d4d'; // Red color
      case 'Leans Left':
        return '#FFCCCB'; // Orange color
      case 'Center':
        return '#c4c4c4'; // Blue color
      case 'Leans Right':
        return '#89CFF0'; // Purple color
      case 'Right':
        return '#0000FF'; // Cyan color
      default:
        return '#c4c4c4'; // Gray color
    }
  };

  const BiasDistribution = ({ data, setBiasScore }) => {
    const biasCategories = ['Left', 'Leans Left', 'Center', 'Leans Right', 'Right'];
    const biasMedia = {
      'Left': [],
      'Leans Left': [],
      'Center': [],
      'Leans Right': [],
      'Right': [],
    };

    const getLongestBiasCategory = () => {
      let max = 0;
      let maxKey = '';
      let tie = false;

      Object.keys(biasMedia).forEach((key) => {
        const length = biasMedia[key].length;
        if (length > max) {
          max = length;
          maxKey = key;
          tie = false;
        } else if (length === max) {
          tie = true;
        }
      });

      return tie ? 'Mixed' : maxKey;
    };

    const getBiasScore = () => {
      const biasCategory = getLongestBiasCategory();

      let score;
      switch (biasCategory) {
        case 'Center':
          score = 100;
          break;
        case 'Leans Right':
        case 'Leans Left':
        case 'Mixed':
          score = 70;
          break;
        case 'Right':
        case 'Left':
        default:
          score = 40;
          break;
      }

      setBiasScore(score);
    };

    useEffect(() => {
      getBiasScore();
    }, [data]);

    data.forEach((item) => {
      if (biasCategories.includes(item.Bias)) {
        biasMedia[item.Bias].push(item);
      }
    });

    const totalCount = data.length;
    const biasPercentages = Object.keys(biasMedia).map((key) => ({
      category: key,
      percentage: totalCount ? (biasMedia[key].length / totalCount) * 100 : 0,
    }));

    const [selectedBias, setSelectedBias] = useState(null);

    const handleBiasBarPress = (biasCategory, mediaName) => {
      setSelectedBias(selectedBias === biasCategory ? null : biasCategory);
      setSelectedMedia(mediaName);
    };

    // Render the BiasDistribution component
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
        style={styles.biasDistributionContainer}
      >
        {biasPercentages.map((item) => (
          <TouchableOpacity
            key={item.category}
            style={[styles.biasBar, { backgroundColor: getBiasColor(item.category) }]}
            onPress={() => handleBiasBarPress(item.category, biasMedia[item.category][0]?.source)}
          >
            <View style={[styles.biasBarFill, { width: `${item.percentage}%` }]} />
            <Text style={styles.biasBarText}>{item.percentage.toFixed(1)}%</Text>
            {selectedBias === item.category && (
              <Image source={require('../../assets/images/icons/right-chevron.png')} style={styles.chevronIcon} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // Render the GoogleNewsSearch component
  return (
    <View style={styles.container}>
      <TextInput
        label="Search"
        value={query_media_au}
        onChangeText={(text) => setQuery({ query_media_au: text })}
        style={styles.searchInput}
      />
      <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
        Search
      </Button>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          {newsResults.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.newsContainer}
              onContentSizeChange={(width) => setContainerWidth(width)}
            >
              {newsResults.map((newsItem, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.newsItem}
                  onPress={() => openLink(newsItem.link)}
                >
                  <Image
                    source={newsItem.image ? { uri: newsItem.image } : require('../../assets/images/default_image.jpg')}
                    style={styles.newsImage}
                  />
                  <View style={styles.newsContent}>
                    <Text style={styles.newsTitle}>{newsItem.title}</Text>
                    <Text style={styles.newsSource}>{newsItem.source}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noResultsText}>No results found.</Text>
          )}
        </>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <WebView source={{ uri: currentUrl }} style={styles.modalWebView} />
      </Modal>

      {selectedMedia && (
        <Modal visible={selectedMedia !== null} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedMedia}</Text>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Bias: {selectedMedia.Bias}</Text>
              <Text style={styles.modalText}>Quality: {selectedMedia.Quality}</Text>
              <Text style={styles.modalText}>Credibility: {selectedMedia.Credibility}</Text>
              <Text style={styles.modalText}>Link: {selectedMedia.Link}</Text>
              <CredibilityScore
                mediaScore={mediaScore}
                biasScore={biasScore}
                sourceScore={sourceScore}
                userScore={userScore}
              />
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSelectedMedia(null)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Sizes.fixPadding,
  },
  input: {
    marginBottom: 10,
  },
  resultsContainer: {
    flex: 1,
    marginBottom: Sizes.fixPadding
  },
  result: {
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#4f5b66',
    padding: Sizes.fixPadding,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  newsImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'OpenSans_Bold',
    marginBottom: Sizes.fixPadding
  },
  snippet: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'OpenSans_SemiBold'
  },
  readmore: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'OpenSans_SemiBold',
    margin: Sizes.fixPadding,
    marginLeft: 0,
    textDecorationLine: 'underline',
  },
  source: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: -Sizes.fixPadding,
    fontFamily: 'OpenSans_SemiBold'
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  biasColor: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },

  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'cover',
  },

  biasText: {
    fontSize: 12,
    color: '#ffffff',
  },
  sourceImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  biasMediaIconsContainer: {
    flexDirection: 'row',
    margin: Sizes.fixPadding,
  },
  biasMediaIcons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
    borderRadius: 25
  },
  mediaIconLarge: {
    width: 60,
    height: 60,
  },
  additionalMediaText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 2,
  },
  biasDistributionBar: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginBottom: 10,
    overflow: 'hidden',
  },
  biasDistributionSegment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  biasPercentageText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'OpenSans_SemiBold'
  },
  biasLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: -150
  },
  biasLabelText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'OpenSans_SemiBold'
  },
  longestBiasCategoryContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  longestBiasCategoryText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'OpenSans_SemiBold'
  },
});

export default GoogleNewsSearch;