import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Kodchasan_Light: require("../assets/fonts/Kodchasan-Light.ttf"),
                Kodchasan_Medium: require("../assets/fonts/Kodchasan-Medium.ttf"),
                Kodchasan_Regular: require("../assets/fonts/Kodchasan-Regular.ttf"),
                Kodchasan_SemiBold: require("../assets/fonts/Kodchasan-SemiBold.ttf"),
                Kodchasan_Bold: require("../assets/fonts/Kodchasan-Bold.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;

