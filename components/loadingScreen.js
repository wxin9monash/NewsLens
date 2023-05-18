// Import required modules
import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

// Define the LoadingScreen component
const LoadingScreen = ({ navigation }) => {

    // Use useEffect to load fonts when the component is mounted
    useEffect(() => {
        async function loadFont() {
            // Use expo-font's loadAsync method to load fonts from local assets
            await Font.loadAsync({
                OpenSans_Light: require("../assets/fonts/OpenSans-Light.ttf"),
                OpenSans_Medium: require("../assets/fonts/OpenSans-Medium.ttf"),
                OpenSans_SemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
                OpenSans_Bold: require("../assets/fonts/OpenSans-Bold.ttf"),
            });
            console.log("LoadingScreen");
            // After fonts are loaded, navigate to the 'Splash' screen
            navigation.navigate('Splash');
        }
    
        // Call the loadFont function and handle possible errors
        loadFont().catch(error => console.error(error));
    }, []); // Empty dependency array means this effect will only run once, after the initial render

    // Render a simple View component
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

// Export the LoadingScreen component as the default export
export default LoadingScreen;

