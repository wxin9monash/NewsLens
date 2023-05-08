// BannerSlider.js
import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Text,
} from 'react-native';

// Import the images from the 'assets' folder
import image1 from '../../assets/images/media_image/7_News.png';
import image2 from '../../assets/images/media_image/9_News.png';
import image3 from '../../assets/images/media_image/ABC_News.png';
import image4 from '../../assets/images/media_image/The_Australian.png';
import image5 from '../../assets/images/media_image/SBS_News.png';
import image6 from '../../assets/images/media_image/The_Guardian_Australia.jpg';

// Create an array of image objects with name and source properties
const images = [
  { name: '7 News', source: image1 },
  { name: '9 News', source: image2 },
  { name: 'ABC News', source: image3 },
  { name: 'The Australian', source: image4 },
  { name: 'SBS News', source: image5 },
  { name: 'The Guardian Australia', source: image6 },
];

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.3;
const SPACING = 10;

const BannerSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={images}
        keyExtractor={(_, index) => String(index)}
        horizontal
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.imageContainer,
                {
                  transform: [{ scale }],
                },
              ]}
            >
              <Image source={item.source} style={styles.image} />
              <Text style={styles.imageName}>{item.name}</Text>
            </Animated.View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      alignItems: 'center',
    },
    imageContainer: {
      width: ITEM_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING,
      marginTop: 30,
      marginBottom: 30, // Add margin to the bottom to avoid image name being cut off
    },
    image: {
      width: '100%',
      height: '80%', // Adjust the height of the image to avoid top and bottom parts being cut off
      resizeMode: 'contain',
    },
    imageName: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
    },
  });

export default BannerSlider;