// Import necessary dependencies
import React, { useCallback } from "react";
import { SafeAreaView, Image, StatusBar, ImageBackground, BackHandler } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { CircleFade } from 'react-native-animated-spinkit';
import { Colors } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

// Define a SplashScreen component
const SplashScreen = ({ navigation }) => {

    // Function to handle back button press in Android
    const backAction = () => {
        // Close the application when back button is pressed
        BackHandler.exitApp();
        return true;
    }

    // Hook to handle Android's hardware back button
    useFocusEffect(
        useCallback(() => {
            console.log("SplashScreen")
            // Add listener for the back button press
            BackHandler.addEventListener("hardwareBackPress", backAction);
            // Clean up the listener on unmount
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    // Set a delay before navigating to the 'Onboarding' screen
    setTimeout(() => {
        navigation.push('Onboarding');
    }, 2000);

    // Render the splash screen
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <LinearGradient
                colors={[
                    'rgba(255, 255, 255, 0.3)',
                    'rgba(0, 0, 0, 0.9)',
                ]}
                style={{ flex: 1 }}
            >
                <ImageBackground
                    source={require('../assets/images/bg.png')}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{
                            height: '150%',
                            width: 150.0*1.5,
                        }}
                        resizeMode="contain"
                    />
                    <CircleFade
                        size={50}
                        color={Colors.whiteColor}
                        style={{
                            position: 'absolute',
                            bottom: 60.0,
                        }}
                    />
                </ImageBackground>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default SplashScreen;