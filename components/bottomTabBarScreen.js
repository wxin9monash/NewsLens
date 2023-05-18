// Import required React and React Native modules
import React, { useState, useCallback } from "react";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { BackHandler, Text, View, StyleSheet, Image } from 'react-native'

// Import required screens
import HomeScreen from "../screens/home/homeScreen";
import CategoryScreen from "../screens/category/categoryScreen";
import VideosScreen from "../screens/videos/videosScreen";
import BookmarksScreen from "../screens/bookmarks/bookmarksScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { useFocusEffect } from '@react-navigation/native';

// Import bottom tab navigation from React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PoliticalBiasScreen from "../screens/politicalBias/PoliticalBiasScreen";

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// The TabNavigator component
const TabNavigator = ({ navigation }) => {

    // A function for handling back action
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    // The useFocusEffect hook manages the hardware back button on Android
    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    // This function sets back click count and resets it after 1 second
    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    // State variable for back click count
    const [backClickCount, setBackClickCount] = useState(0);

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: { backgroundColor: Colors.backColor, height: 80.0 }
                }}
            >
                {/* Define Tab Screens with respective icons */}
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ tabBarIcon: ({ focused }) => tabBarItem({ icon: require('../assets/images/icons/home.png'), focused, text: 'Home' }) }}
                />
                <Tab.Screen
                    name="Category"
                    component={CategoryScreen}
                    options={{ tabBarIcon: ({ focused }) => tabBarItem({ icon: require('../assets/images/icons/category.png'), focused, text: 'Category' }) }}
                />
                <Tab.Screen
                    name="Focus"
                    component={PoliticalBiasScreen}
                    options={{ tabBarIcon: ({ focused }) => tabBarItem({ icon: require('../assets/images/icons/view.png'), focused, text: 'Focus' }) }}
                />
                <Tab.Screen
                    name="Bookmark"
                    component={BookmarksScreen}
                    options={{ tabBarIcon: ({ focused }) => tabBarItem({ icon: require('../assets/images/icons/save.png'), focused, text: 'Bookmark' }) }}
                />
            </Tab.Navigator>
            {/* Call exitInfo function */}
            {exitInfo()}
        </>
    );

    // Function for displaying an exit info view when back button is pressed
    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor13Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
                :
                null
        )
    }

    // Function for rendering a tab bar item with icon and text
    function tabBarItem({ icon, focused, text }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={icon}
                    style={{ width: 25.0, height: 25.0, resizeMode: 'contain', tintColor: focused ? Colors.whiteColor : '#696969' }}
                />
                <Text style={{ fontSize: 10, color: focused ? Colors.whiteColor : '#696969' }}>{text}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default TabNavigator;