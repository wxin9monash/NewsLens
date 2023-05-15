// components/GoogleNewsSearch.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Sizes, Fonts} from '../../constants/styles';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';
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

const GoogleNewsSearch = ({searchInput}, {width}) => {
  const query_media_au = `${searchInput}`
  const [query, setQuery] = useState({query_media_au});
  const [newsResults, setNewsResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  // const [mediaBiasData, setMediaBiasData] = useState([]);

  const openLink = (url) => {
    setCurrentUrl(url);
    setModalVisible(true);
  };


  const apiKey = '58dc965f755f122b3067a0d51f373c147cbfc15af03d7586084c321848730d97';
  const mediaBiasData = require('../../assets/json/media_bias.json');
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
          console.log(modifiedResult)
          sources.add(result.source);
        }
      }
    });
  
    return uniqueResults;
  };


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

  
  // const containerWidth = Dimensions.get('container').width;
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

  const BiasDistribution = ({ data }) => {
    const biasCategories = ['Left', 'Leans Left', 'Center', 'Leans Right', 'Right'];
    const biasMedia = {
      'Left': [],
      'Leans Left': [],
      'Center': [],
      'Leans Right': [],
      'Right': [],
    };
  
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
      setSelectedMedia(mediaName); // Add this line
    };
  
    return (
      <View>
      <View style={styles.biasMediaIconsContainer}>
        {biasPercentages.map((bias, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.biasMediaIcons, { width: `${bias.percentage}%` }]}
            onPress={() => handleBiasBarPress(bias.category, bias.media)} // Change media.name to bias.media here
          >
            {biasMedia[bias.category].slice(0, 5).map((media, idx) => (
              <Image
                key={idx}
                source={media.image}
                style={[
                  styles.mediaIcon,
                  selectedBias === bias.category ? styles.mediaIconLarge : null,
                ]}
              />
            ))}
            {biasMedia[bias.category].length > 5 && (
              <Text style={styles.additionalMediaText}>+{biasMedia[bias.category].length - 5}</Text>
            )}
          </TouchableOpacity>
        ))}
        </View>
        <View style={styles.biasDistributionBar}>
          {biasPercentages.map((bias, index) => (
            <View
              key={index}
              style={[
                styles.biasDistributionSegment,
                {
                  backgroundColor: getBiasColor(bias.category),
                  width: `${bias.percentage}%`,
                },
              ]}
            >
              <Text style={styles.biasPercentageText}>{bias.percentage.toFixed(1)}%</Text>
            </View>
          ))}
        </View>
        <View style={styles.biasLabelsContainer}>
        {biasPercentages.map((bias, index) => (
          <Text key={index} style={[styles.biasLabelText, { width: `${bias.percentage}%` }]}>
            {bias.category}
          </Text>
        ))}
      </View>
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}>
      {loading ? null : (
        <Text style={{ ...Fonts.whiteColor14Medium, margin: Sizes.fixPadding, marginLeft:0 }}>Total sources: {newsResults.length}</Text>
      )}
      <View style={styles.resultsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : newsResults.length === 0 ? (
          <Text style={{ ...Fonts.whiteColor14Medium, margin: Sizes.fixPadding, marginLeft:0 }}>No results found</Text>
        ) : (
          <>
            <FlatList
            horizontal
            data={
              selectedMedia
                ? newsResults.filter((result) => result.source === selectedMedia)
                : newsResults
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.result, { width: containerWidth - 2 * Sizes.fixPadding - 14 }]}>
                <View style={styles.topRow}>
                  <View style={[styles.biasColor, { backgroundColor: getBiasColor(item.Bias), borderColor: getBiasColor(item.Bias) }]}>
                    <Text style={styles.biasText}>{item.Bias}</Text>
                  </View>
                  
                  <View style={styles.sourceImageContainer}>
                    {item.image && <Image source={item.image} style={styles.newsImage} />}
                    <Text style={styles.source}>{item.source}</Text>
                  </View>
                </View>
                {/* <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} /> */}
                <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
                <Text numberOfLines={3} style={styles.snippet}>{item.snippet}</Text>
                <TouchableOpacity onPress={() => openLink(item.link)}>
                  <Text numberOfLines={3} style={styles.readmore}>Read Full Article</Text>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
                >
                <WebView source={{ uri: currentUrl }} />
                <Button onPress={() => setModalVisible(false)}>Close</Button>
              </Modal>
            </View>
            )}
            snapToInterval={containerWidth - Sizes.fixPadding - 14}
            decelerationRate="fast"
          />
      <BiasDistribution data={newsResults} />
       </>
      )}
    </View>
  </View>
);
}
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
    elevation: 3,
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
    marginBottom: 5,
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
  },
});

export default GoogleNewsSearch;