import React, { useState, useRef } from 'react';
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window')

const notificationList = [
    {
        key: '1',
        title: 'Kina Shah',
        description: 'Reply to your comment.',
        notificationImage: require('../../assets/images/notifications/notification1.png'),
        receiveTime: '1h ago',
    },
    {
        key: '2',
        title: 'Narendra modi is coming live',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting.',
        notificationImage: require('../../assets/images/notifications/notification2.png'),
        receiveTime: '2h ago',
    },
    {
        key: '3',
        title: 'Social',
        description: 'Instagram starts rolling out new stories design',
        notificationImage: require('../../assets/images/notifications/notification3.png'),
        receiveTime: '1days ago',
    },
    {
        key: '4',
        title: 'Subscription Plans',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting.',
        notificationImage: require('../../assets/images/notifications/notification6.png'),
        receiveTime: '2days ago',
    },
    {
        key: '5',
        title: 'Health',
        description: 'Why People with Cancer Should Be in COVID-19 Vaccination.',
        notificationImage: require('../../assets/images/news_image/img18.png'),
        receiveTime: '3days ago',
    },
    {
        key: '6',
        title: 'Rocky Patel',
        description: 'Reply to your comment.',
        notificationImage: require('../../assets/images/notifications/notification4.png'),
        receiveTime: '5days ago',
    },
    {
        key: '7',
        title: 'Sports',
        description: 'Tokyo Olympics:PM Narendra Modi promise es to have ice cream with',
        notificationImage: require('../../assets/images/notifications/notification5.png'),
        receiveTime: '25 Jun 2021 ago',
    },
];

// Animated values to track each row's animation state.
const rowTranslateAnimatedValues = {};

// NotificationsScreen is a React component that displays a list of notifications.
const NotificationsScreen = ({ navigation }) => {

    // State variables for managing the snack bar's visibility and message.
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState('');

    // State variable for managing the list of notifications.
    const [listData, setListData] = useState(notificationList);

    // Create an Animated.Value for each item in the list and store it in rowTranslateAnimatedValues.
    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    // A ref to track if an animation is running.
    const animationIsRunning = useRef(false);

    // Function to handle swipe events.
    const onSwipeValueChange = swipeData => {

        // Extract the key and value from the swipeData.
        const { key, value } = swipeData;
        // If the swipe was significant and no animation is currently running, start an animation.
        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);
                setSnackBarMsg(`${removedItem.title} dismissed`);
                setListData(newData);
                setShowSnackBar(true);
                animationIsRunning.current = false;
            });
        }
    };

    // Function to render an item in the list.
    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 90],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <View style={{ alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                        <View style={styles.notificationShadowStyle}>
                            <Image
                                source={data.item.notificationImage}
                                style={styles.notificationImageStyle}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                            <Text
                                numberOfLines={1}
                                style={{ ...Fonts.blackColor14Bold }}
                            >
                                {data.item.title}
                            </Text>
                            <Text
                                numberOfLines={2}
                                style={{ lineHeight: 15.0, ...Fonts.grayColor12Medium }}
                            >
                                {data.item.description}
                            </Text>
                            <Text style={{
                                ...Fonts.grayColor12Medium,
                                alignSelf: 'flex-end'
                            }}>
                                {data.item.receiveTime}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
    
    // Function to render a hidden item that will be revealed when the user swipes.
    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );
    
    // Function to render the header of the screen.
    function header() {
        // Contains a back arrow and the title "Notifications".
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor20Bold }}>
                    Notifications
                </Text>
            </View>
        )
    }

    // Main render function of the NotificationsScreen.
    return (
        // SafeAreaView encapsulating everything. Contains a Snackbar for feedback on item removal.
        // The list of notifications is rendered using a SwipeListView. When the list is empty, 
        // an icon and a message "No new notifications" is shown.
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ backgroundColor: Colors.backColor, flex: 1, }}>
                {header()}
                {listData.length == 0 ?
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <MaterialIcons name="notifications-off" size={56} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor12Medium, marginTop: Sizes.fixPadding }}>
                            No new notifications
                        </Text>
                    </View>
                    :
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-width}
                        leftOpenValue={width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                        showsVerticalScrollIndicator={false}
                    />
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    <Text style={{ ...Fonts.whiteColor13Medium }}>
                        {snackBarMsg}
                    </Text>
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    notificationIconWrapStyle: {
        height: 60.0,
        width: 60.0,
        backgroundColor: Colors.blackColor,
        borderRadius: 30.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 3.0,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.blackColor,
        flex: 1,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    notificationShadowStyle: {
        elevation: 6.0,
        borderRadius: 35.0,
        padding: Sizes.fixPadding - 9.0,
        overflow: 'hidden'
    },
    notificationImageStyle: {
        width: 60.0,
        height: 60.0,
        borderColor: Colors.whiteColor,
        borderWidth: 3.0,
        borderRadius: 30.0,
    }
});

export default NotificationsScreen;