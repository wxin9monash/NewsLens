import React, { useCallback } from "react";
import { SafeAreaView, Image, StatusBar, ImageBackground, BackHandler } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { CircleFade } from 'react-native-animated-spinkit';
import { Colors } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.push('Onboarding');
    }, 2000);

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
                            height: '100%',
                            width: 150.0,
                        }}
                        resizeMode="contain"
                    />
                    <CircleFade
                        size={50}
                        color={Colors.blackColor}
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