// ColorBar.js
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

const colorImages = {
  red: 'https://example.com/red-image.png',
  green: 'https://example.com/green-image.png',
  blue: 'https://example.com/blue-image.png',
};

const ColorBar = ({ redRatio, greenRatio, blueRatio }) => {
  const redWidth = redRatio * 100;
  const greenWidth = greenRatio * 100;
  const blueWidth = blueRatio * 100;

  const selectionValue = useRef(new Animated.Value(0)).current;
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  const onPressColor = (color, position) => {
    setSelectedColor(colorImages[color]);
    setSelectedPart(color);
    Animated.timing(selectionValue, {
      toValue: position,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const selectionStyle = {
    transform: [{ translateX: selectionValue }],
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.indicator, selectionStyle]}
        source={selectedColor && { uri: selectedColor }}
        resizeMode="contain"
      />
      <View style={styles.barContainer}>
        <TouchableOpacity
          style={[
            styles.red,
            { flex: redWidth, height: selectedPart === 'red' ? 40 : 20 },
          ]}
          onPress={() => onPressColor('red', 0)}
        />
        <TouchableOpacity
          style={[
            styles.green,
            { flex: greenWidth, height: selectedPart === 'green' ? 40 : 20 },
          ]}
          onPress={() => onPressColor('green', redWidth)}
        />
        <TouchableOpacity
          style={[
            styles.blue,
            { flex: blueWidth, height: selectedPart === 'blue' ? 40 : 20 },
          ]}
          onPress={() => onPressColor('blue', redWidth + greenWidth)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 20,
  },
  red: {
    backgroundColor: 'red',
  },
  green: {
    backgroundColor: 'grey',
  },
  blue: {
    backgroundColor: 'blue',
  },
  indicator: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
});

export default ColorBar;