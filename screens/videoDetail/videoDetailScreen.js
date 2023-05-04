import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, View, StatusBar, Text, ScrollView, Dimensions, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { BottomSheet } from '@rneui/themed';

const { width } = Dimensions.get('window');

const newsDetailParagraphList = [
    'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an',
    'It has survived not only five centuries, but also the leap in into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
];

const recommendedList = [
    {
        id: '1',
        newsImage: require('../../assets/images/news_image/img18.png'),
        headLine: 'Why People with Cancer Should Be in COVID-19 Vaccinaton Trials',
        newsDetail: 'Expert are uncertain how effective COVID-19 vaccines are for people being treated for cancer and those who have survived the disease.',
        date: '10/07/2021',
        newsCategory: 'Health',
    },
    {
        id: '2',
        newsImage: require('../../assets/images/news_image/img19.png'),
        headLine: 'Zomato IPO opens July 14, check grey market premium; should you subscribe for listing gains?',
        newsDetail: 'Zomato, an online food delivery platform, sha- ses were trading with premium in the primary market, ahead of its Rs 9,375-crore  IPO was sold in a price band of Rs 74-76 a share during 14-16 July. ',
        date: '10/07/2021',
        newsCategory: 'Business',
    }
];

const VideoDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setisplay(true)
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setisplay(false)
        });
        return unsubscribe;
    }, [navigation]);

    const [isLike, setIsLike] = useState(false);
    const [isplay, setisplay] = useState(true)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ShowVideo item={item} isplay={isplay} />
                    {newsInfo()}
                    {divider()}
                    {newsDetail()}
                    {recommendedInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function recommendedInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginVertical: Sizes.fixPadding, ...Fonts.blackColor14Bold }}>
                    Recommended for you
                </Text>
                {
                    recommendedList.map((item) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => { setisplay(false), navigation.push('VideoDetail', { item }) }}
                            key={`${item.id}`}
                            style={{ marginBottom: Sizes.fixPadding * 2.0, }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={item.newsImage}
                                        style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                                    />
                                    <View style={styles.recommendedPlayArrowIconWrapStyle}>
                                        <MaterialIcons
                                            name="play-arrow"
                                            color={Colors.whiteColor}
                                            size={25}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    maxWidth: width - 140,
                                    marginLeft: Sizes.fixPadding,
                                }}>
                                    <Text numberOfLines={2} style={{ ...Fonts.blackColor13Bold }}>
                                        {item.headLine}
                                    </Text>
                                    <Text numberOfLines={3} style={{ ...Fonts.grayColor11Medium }}>
                                        {item.newsDetail}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: Sizes.fixPadding - 8.0,
                            }}>
                                <MaterialIcons
                                    name="access-time"
                                    color={Colors.grayColor}
                                    size={13}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor10SemiBold }}>
                                    {item.date}
                                </Text>
                                <Text style={{ marginLeft: Sizes.fixPadding * 3.0, ...Fonts.grayColor11Medium }}>
                                    {item.newsCategory}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    function newsDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                {
                    newsDetailParagraphList.map((item, index) => (
                        <View key={`${index}`}>
                            <Text style={{ ...Fonts.grayColor11Medium }}>
                                {`          `}{item}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: '#e0e0e0',
                    height: 1.0,
                    margin: Sizes.fixPadding * 2.0,
                }}
            />
        )
    }

    function newsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    {item.headLine}
                </Text>
                <View style={styles.likeShareViewsOptionsWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="access-time"
                            color={Colors.grayColor}
                            size={15}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                            {item.date}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SimpleLineIcons
                            name="eye"
                            size={15}
                            color={Colors.grayColor}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                            {item.viewsCount}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name="comment-text-outline"
                            color={Colors.grayColor}
                            size={15}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                            {item.commentsCount}comments
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name={isLike ? "thumb-up-alt" : "thumb-up-off-alt"}
                            color={Colors.grayColor}
                            size={15}
                            onPress={() => setIsLike(!isLike)}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor10SemiBold }}>
                            1159
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: Sizes.fixPadding + 5.0,
            }}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={24}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }
}

const playbackSpeedRangeList = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

const ShowVideo = ({ item, isplay }) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [playbackSpeedSheet, setPlaybackSpeedSheet] = useState(false);
    const [playbackSpeedRangeSheet, setPlaybackSpeedRangeSheet] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState(1.0);

    return (
        <View style={{ alignItems: 'center' }}>
            {videoPlayer()}
            {backDropContainer()}
            {playButton()}
            {optionsIcon()}
            {newsHeadline()}
            {showPlaybackSpeedSheet()}
            {showPlaybackSpeedRangeSheet()}
        </View>
    );

    function videoPlayer() {
        return (
            <Video
                ref={video}
                rate={currentSpeed}
                style={styles.video}
                source={require('../../assets/video/video.mp4')}
                useNativeControls
                resizeMode="cover"
                isLooping
                shouldPlay={isplay}
                onPlaybackStatusUpdate={status => {
                    setStatus(() => status)
                }}
            />
        )
    }

    function backDropContainer() {
        return (
            status.isPlaying ?
                null :
                <View
                    style={{
                        ...styles.video,
                        ...styles.backdropVideoStyle,
                    }}
                />
        )
    }

    function newsHeadline() {
        return (
            <Text
                numberOfLines={1}
                style={styles.newsHeadlineStyle}
            >
                {item.headLine}
            </Text>
        )
    }

    function optionsIcon() {
        return (
            <MaterialIcons
                name="more-vert"
                color={Colors.whiteColor}
                size={24}
                style={{ position: 'absolute', right: 10.0, top: 10.0 }}
                onPress={() => { setPlaybackSpeedSheet(true) }}
            />
        )
    }

    function playButton() {
        return (
            status.isPlaying ?
                null
                :
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                    style={styles.button}
                >
                    <MaterialIcons name="play-arrow" size={30} color={Colors.whiteColor} />
                </TouchableOpacity>
        )
    }

    function showPlaybackSpeedRangeSheet() {
        return (
            <BottomSheet
                isVisible={playbackSpeedRangeSheet}
                onBackdropPress={() => { setPlaybackSpeedRangeSheet(false) }}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlaybackSpeedRangeSheet(false)}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding * 2.0,
                    }}
                >
                    {
                        playbackSpeedRangeList.map((item, index) => (
                            <View key={`${index}`}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        setCurrentSpeed(item)
                                        setPlaybackSpeedRangeSheet(false)
                                    }}
                                    style={{
                                        marginBottom: Sizes.fixPadding * 2.0,
                                        flexDirection: 'row', alignItems: 'center'
                                    }}>
                                    {
                                        currentSpeed == item
                                            ?
                                            <MaterialIcons
                                                name="done"
                                                color={Colors.blackColor}
                                                size={24}
                                            />
                                            :
                                            <View style={{ width: 24.0 }} />
                                    }
                                    <Text style={{
                                        marginLeft: Sizes.fixPadding + 5.0,
                                        ...currentSpeed == item ? { ...Fonts.blueColor15Medium } : { ...Fonts.blackColor15Medium }
                                    }}>
                                        {item.toFixed(2)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function showPlaybackSpeedSheet() {
        return (
            <BottomSheet
                isVisible={playbackSpeedSheet}
                onBackdropPress={() => { setPlaybackSpeedSheet(false) }}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlaybackSpeedSheet(false)}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        padding: Sizes.fixPadding * 2.0,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            setPlaybackSpeedSheet(false)
                            setPlaybackSpeedRangeSheet(true)
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', }}
                    >
                        <MaterialIcons
                            name="speed"
                            color={Colors.grayColor}
                            size={24}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Medium }}>
                            Playback speed
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: '#e0e0e0',
                        height: 1.0,
                        marginVertical: Sizes.fixPadding + 10.0,
                    }} />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => { setPlaybackSpeedSheet(false) }}
                        style={{ flexDirection: 'row', alignItems: 'center', }}
                    >
                        <MaterialIcons
                            name="close"
                            color={Colors.grayColor}
                            size={24}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Medium }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </BottomSheet>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        backgroundColor: 'rgba(0,0,0,0.7)',
        top: 80.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
    },
    video: {
        alignSelf: 'center',
        width: width,
        height: 210,
    },
    backdropVideoStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0.0,
        left: 0.0,
        right: 0.0,
    },
    newsHeadlineStyle: {
        maxWidth: width - 80.0,
        ...Fonts.blackColor13Bold,
        position: 'absolute',
        top: 10.0,
        left: 20.0,
    },
    likeShareViewsOptionsWrapStyle: {
        marginRight: Sizes.fixPadding * 6.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    recommendedPlayArrowIconWrapStyle: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    }
})

export default VideoDetailScreen;