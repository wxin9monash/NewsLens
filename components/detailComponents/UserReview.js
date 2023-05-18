// Import necessary modules from react, react-native, and firebase
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import Slider from '@react-native-community/slider';
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { runTransaction, updateDoc } from 'firebase/firestore';

// UserReview component for submitting user reviews
const UserReview = ({ onSubmit, media }) => {
  // State hooks for rating and submission status
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  // Animated value for slider's background color
  const animatedValue = new Animated.Value(0);

  // Function for handling changes in slider value
  const handleOnSliderValueChange = (value) => {
    const roundedValue = Math.round(value);
    setRating(roundedValue);
    // Animate the slider's background color as per the new rating
    Animated.timing(animatedValue, {
      toValue: roundedValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  // Function for handling the submit button
  const handleOnSubmit = async () => {
    try {
      const url = media;
      // Create a reference to a Firestore document
      const reviewRef = doc(FIRESTORE_DB, 'reviews', url);
  
      // Start a Firestore transaction
      await runTransaction(FIRESTORE_DB, async (transaction) => {
        // Retrieve the current document's snapshot
        const reviewSnapshot = await transaction.get(reviewRef);
  
        // If the document doesn't exist, create it with the current rating
        // Else, update the existing document with the new rating
        if (!reviewSnapshot.exists()) {
          transaction.set(reviewRef, { totalRating: rating, count: 1 });
        } else {
          const currentTotalRating = reviewSnapshot.data().totalRating || 0;
          const currentCount = reviewSnapshot.data().count || 0;
          const newTotalRating = currentTotalRating + rating;
          const newCount = currentCount + 1;
          transaction.update(reviewRef, { totalRating: newTotalRating, count: newCount });
        }
      });
  
      // Call the parent component's onSubmit function and set submission status to true
      onSubmit(rating);
      setSubmitted(true);
    } catch (error) {
      // Log the error if there is any
      console.error('Error writing review to Firestore:', error);
    }
  };

  // Interpolation for the slider's background color as per the rating
  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 5],
    outputRange: ['#f15656','#419136'],
  });

  // Apply the interpolated color to the slider's background
  const animatedStyle = {
    backgroundColor: interpolateColor,
  };

  const formattedValue = Math.round(rating);

  // Return the JSX for the component
  return (
    <View style={styles.container}>
      {!submitted ? (
        <>
          <Text style={styles.instructions}>
            Is the news worth trusting ?
          </Text>
          <View style={styles.sliderContainer}>
            <Animated.View style={[styles.sliderTrack, animatedStyle]} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={1}
              value={rating}
              onValueChange={handleOnSliderValueChange}
              thumbTintColor="#FFFFFF"
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
            />
          </View>
          <Text style={styles.ratingValue }>{rating}</Text>
          <TouchableOpacity style={styles.submitButton} onPress={handleOnSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.submittedMessage}>Thank you! Your rating has been submitted.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f5b66',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontFamily: 'OpenSans_SemiBold'
  },
  sliderContainer: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    position: 'absolute',
    height: 10,
    borderRadius: 5,
    width: '100%',
  },
  slider: {
    height: 40,
  },
  ratingValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: Sizes.fixPadding,
    color: Colors.whiteColor,
    fontFamily: 'OpenSans_SemiBold'
  },
  submitButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: Sizes.fixPadding,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  submittedMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.whiteColor,
    fontFamily: 'OpenSans_SemiBold'
  },
});

export default UserReview;