import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                OpenSans_Light: require("../assets/fonts/OpenSans-Light.ttf"),
                OpenSans_Medium: require("../assets/fonts/OpenSans-Medium.ttf"),
                OpenSans_SemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
                OpenSans_Bold: require("../assets/fonts/OpenSans-Bold.ttf"),
            });
            console.log("LoadingScreen");
            navigation.navigate('Splash');
        }
    
        loadFont().catch(error => console.error(error));
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;

