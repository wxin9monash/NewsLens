import React, { useRef, useState, useCallback } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, Dimensions, Image, StyleSheet, Text, ImageBackground } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require("../../assets/images/category_01.png"),
        title: 'Welcome to NEWSLENZ App',
        description: `Thank you for download India Today News\nApp, enjoy this amazing app with\ncool features.`,
    },
    {
        id: '2',
        onboardingImage: require("../../assets/images/content.png"),
        title: 'Welcome to NEWSLENZ App',
        description: `Thank you for download NEWSLENZ\nApp, enjoy this amazing app with\ncool features.`,
    },
    {
        id: '3',
        onboardingImage: require("../../assets/images/subscribe.png"),
        title: 'Take your freedom',
        description: `Check political bias of the news, and take\nyour freedom to decide if you want to see the anslyis.`,
    },
    {
        id: '4',
        onboardingImage: require("../../assets/images/bookmark.png"),
        title: 'Save artical for later',
        description: `Hit the bookmark icon on any article to\nsave for later.`,
    }
];

const OnboardingScreen = ({ navigation }) => {
    const [backClickCount, setBackClickCount] = useState(0);

    const backAction = useCallback(() => {
        backClickCount === 1 ? BackHandler.exitApp() : _spring();
        return true;
    }, [backClickCount]); // <-- dependency array added

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount((prevCount) => prevCount + 1); // <-- use function to update state
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    }


    const [onboardingScreens, setOnboardingScreen] = useState(onboardingScreenList);
    const [activeSlide, setActiveSlide] = useState(0);

    const flatListRef = useRef();

    const renderItem = ({ item, }) => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text
                    style={{
                        ...Fonts.blackColor12SemiBold,
                        marginTop: StatusBar.currentHeight + 20.0,
                    }}
                >
                    {item.title}
                </Text>
                <Image
                    source={item.onboardingImage}
                    style={{
                        width: 250.0, height: 200.0,
                        alignSelf: 'center',
                        flex: 1,
                    }}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.whiteColor13Medium,
                        textAlign: 'center',
                    }}
                >
                    {item.description}
                </Text>
            </View>
        )
    }

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
                    source={require('../../assets/images/bg.png')}
                    style={{ flex: 1 }}
                >
                    <Carousel
                        ref={flatListRef}
                        data={onboardingScreens}
                        sliderWidth={width}
                        itemWidth={width}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        autoplay={true}
                        loop={true}
                        autoplayInterval={3500}
                        slideStyle={{ width: width }}
                    />
                    {pagination()}
                    {skipNextAndDone()}
                </ImageBackground>
            </LinearGradient>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor13Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function skipNextAndDone() {
        return (
            <View style={styles.skipNextAndDoneWrapStyle}>
                {activeSlide != 3
                    ?
                    <Text
                        onPress={() => { navigation.push('BottomTabBar') }}
                        style={{ ...Fonts.whiteColor13Medium, }}
                    >
                        Skip
                    </Text>
                    :
                    <Text>
                    </Text>
                }
                {
                    activeSlide == 3
                        ?
                        <Text
                            onPress={() => { navigation.push('BottomTabBar') }}
                            style={{ position: 'absolute', right: 0.0, bottom: 0.0, ...Fonts.whiteColor13Medium, }}
                        >
                            Done
                        </Text>
                        :
                        <Text
                            onPress={() => {
                                if (activeSlide == 0) {
                                    flatListRef.current.snapToItem(1);
                                }
                                else if (activeSlide == 1) {
                                    flatListRef.current.snapToItem(2);
                                }
                                else if (activeSlide == 2) {
                                    flatListRef.current.snapToItem(3);
                                }
                            }}
                            style={{
                                ...Fonts.whiteColor13Medium,
                            }}
                        >
                            Next
                        </Text>
                }
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={onboardingScreens.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.activeDotStyle}
                inactiveDotStyle={styles.dotStyle}
                inactiveDotScale={0.8}
            />
        );
    }
}

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
    headerWrapStyle: {
        flexDirection: 'row',
        height: 56.0,
        alignItems: 'center',
        paddingLeft: Sizes.fixPadding,
        paddingRight: Sizes.fixPadding * 2.0,
    },
    dotStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 5.0,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    activeDotStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 5.0,
        width: 25.0,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    skipNextAndDoneWrapStyle: {
        position: 'absolute',
        bottom: 22.0,
        left: 20.0,
        right: 20.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default OnboardingScreen;