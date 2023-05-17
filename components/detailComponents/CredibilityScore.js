import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Sizes, Fonts, Colors} from '../../constants/styles';

const CredibilityScore = ({ mediaScore, biasScore, sourceScore, userScore }) => {
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // Calculate the overall credibility score
  const credibilityScore = 
    (mediaScore * 0.7) + 
    (biasScore * 0.15) + 
    (sourceScore * 0.1) + 
    (userScore * 0.05);

  // Interpolate color from red to green based on credibility score
  const barColor = new Animated.Value(credibilityScore).interpolate({
    inputRange: [0, 100],
    outputRange: ['#f15656','#419136']
  });

  // Render the component
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {/* Title */}
        <Text style={styles.title}>News Credibility Score</Text>
        
        {/* Button to open the modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="question-circle" type="font-awesome" color="white" size={20} />
        </TouchableOpacity>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <Progress.Bar 
          progress={credibilityScore / 100} 
          width={300} 
          height={20}
          color={barColor}
          unfilledColor="#e0e0e0"
          borderWidth={0.5}
          borderColor="white"
        />
        
        {/* Marker to indicate the credibility score on the progress bar */}
        <View style={[styles.marker, {left: `${credibilityScore}%`}]}/>
      </View>
      
      {/* Display the credibility score */}
      <Text style={styles.score}>{credibilityScore.toFixed(2)}/100</Text>
      
      {/* Modal */}
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          {/* Modal title */}
          <Text style={styles.modalTitle}>How We Calculate the Score</Text>
          
          {/* Display individual scores */}
          <Text style={styles.modalText}>Media Score: {mediaScore * 0.7}</Text>
          <Text style={styles.modalText}>Bias Score: {biasScore * 0.15}</Text>
          <Text style={styles.modalText}>Source Score: {sourceScore * 0.1}</Text>
          <Text style={styles.modalText}>User Review Score: {userScore * 0.05}</Text>
          
          {/* Display total score */}
          <Text style={styles.modalScore}>Total Score: {credibilityScore.toFixed(2)}</Text>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: Sizes.fixPadding
    },
    titleContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: 20
    },
    title: {
      fontSize: 18, 
      marginRight: 10,
      color: '#FFFFFF',
      fontFamily: 'OpenSans_SemiBold'
    },
    score: {
      fontSize: 18, 
      marginTop: Sizes.fixPadding,
      color: '#FFFFFF',
      fontFamily: 'OpenSans_SemiBold'
    },
    progressBarContainer: {
        position: 'relative',
        width: 300,
        height: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    marker: {
        position: 'absolute',
        top: -10,
        bottom: -10,
        width: 4,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5,
    },
    modalContent: {
      backgroundColor: '#a7adba', 
      padding: 22, 
      borderRadius: 4, 
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
      fontSize: 20, 
      marginBottom: 12, 
      color: '#343d46',
      fontFamily: 'OpenSans_SemiBold'
    },
    modalText: {
      fontSize: 16, 
      marginBottom: 4,
      color: '#343d46',
      fontFamily: 'OpenSans_SemiBold'
    },
    modalScore: {
      fontSize: 18, 
      marginTop: 12, 
      color: '#343d46',
      fontFamily: 'OpenSans_SemiBold'
    },
  });

export default CredibilityScore;