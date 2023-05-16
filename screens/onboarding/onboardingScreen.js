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
        onboardingImage: require("../../assets/images/content.png"),
        title: 'Investigate Current News',
        description: `Find what you need, when you need it - our news software search function covers links, headlines, and keywords, so you never miss a beat.`,
    },
    {
        id: '2',
        onboardingImage: require("../../assets/images/category_01.png"),
        title: 'Dive into Specific Themes',
        description: `From global headlines to your favorite hobbies, our news software keeps you in the know with a category for every interest.`,
    },
    {
        id: '3',
        onboardingImage: require("../../assets/images/political_bias.png"),
        title: 'Evaluate Political Leanings',
        description: `Stay informed, stay objective - our news software's bias feature lets you see the political leanings of your news sources, so you can make up your own mind.`,
    },
    {
        id: '4',
        onboardingImage: require("../../assets/images/credit.png"),
        title: 'Quantify News Credibility',
        description: `Get the facts, not the fiction - our news software's credibility score feature rates the truthfulness of your news sources, making it easy to identify reliable sources and stay informed.`,
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
                        ...Fonts.blackColor18Bold,
                        marginTop: StatusBar.currentHeight + 60.0,
                    }}
                >
                    {item.title}
                </Text>
                <Image
                    source={item.onboardingImage}
                    style={{
                        width: 250.0*1.3, height: 200.0*1.3,
                        alignSelf: 'center',
                        flex: 1,
                    }}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding  + 80.0,
                        margin: Sizes.fixPadding,
                        ...Fonts.whiteColor14Medium,
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
                        style={{ ...Fonts.whiteColor14Medium, }}
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
                            style={{ position: 'absolute', right: 0.0, bottom: 0.0, ...Fonts.whiteColor14Medium, }}
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
                                ...Fonts.whiteColor14Medium,
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
        justifyContent: 'space-between',
        marginBottom: 20,
    }
})

export default OnboardingScreen;