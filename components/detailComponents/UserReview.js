import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

// Import the images for stars
import starFilled from '../../assets/images/review_image/star_filled.png';
import starEmpty from '../../assets/images/review_image/star_empty.png';


const UserReview = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image
            source={i <= rating ? starFilled : starEmpty}
            style={styles.starImage}
          />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Please rate the experience from 1 to 5 stars:
      </Text>
      <View style={styles.starContainer}>{renderStars()}</View>
      <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit(rating)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starImage: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserReview;