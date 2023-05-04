import React, { useState } from "react";
import { SafeAreaView, Dimensions, View, StatusBar, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import CollapsingToolbar from "../../components/collapsingHeaderScreen";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NewsDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        isLike: false,
        inBookMark: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        isLike,
        inBookMark,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <CollapsingToolbar
                leftItem={
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.whiteColor}
                        size={24}
                        onPress={() => navigation.pop()}
                    />
                }
                rightItem={
                    <MaterialIcons
                        name="share"
                        color={Colors.whiteColor}
                        size={24}
                    />
                }
                toolbarColor={Colors.blackColor}
                toolbarMinHeight={55}
                toolbarMaxHeight={220}
                src={item.newsImage}
            >
                <View style={{ paddingBottom: Sizes.fixPadding * 12.0 }}>
                    {newsInfo()}
                    {technologyButton()}
                    {newsCommentViewsAndDateInfo()}
                    {newsDetail()}
                </View>
            </CollapsingToolbar>
        </SafeAreaView>
    )

    function newsDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor10Medium }}>
                    E-commerce giant <Text style={{ ...Fonts.blueColor11Medium }}>Amazon.com</Text> Inc’s online store was grappling with widespread outages on Sunday night, according to outage monitoring website Downdetector, the second broad disruption to services since late June.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
                    Its online store showed error messages on several regional domains. Reuters could not access product listing on its domains including, the United States, India, Canada, the United Kingdom, France and Singapore.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
                    We’re sorry that some customers may be experiencing issues while shopping.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
                    As of 0400 GMT, some of the domains were back up. <Text style={{ ...Fonts.blueColor11Medium }}>Amazon</Text> did not immediately respond to requests for comment about the extent of the recovery in services.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
                    More than 38,000 user reports indicated issues with Amazon’s online store site, while nearly 500 users reported problems with the Amazon Web Services, according to Downdetector.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
                    About 80% of the issues reported were with its website, while 15% were with log-ins and 5% with its check-out services, according to Downdetector.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
                    E-commerce giant <Text style={{ ...Fonts.blueColor11Medium }}>Amazon.com</Text> Inc’s online store was grappling with widespread outages on Sunday night, according to outage monitoring website Downdetector, the second broad disruption to services since late June.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
                    More than 38,000 user reports indicated issues with Amazon’s online store site, while nearly 500 users reported problems with the Amazon Web Services, according to Downdetector.
                </Text>
            </View>
        )
    }

    function newsCommentViewsAndDateInfo() {
        return (
            <View style={styles.newsCommentViewsAndDateInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="access-time"
                        color={Colors.grayColor}
                        size={13}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor11Medium }}>
                        {item.date}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SimpleLineIcons
                        name="eye"
                        size={13}
                        color={Colors.grayColor}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor11Medium }}>
                        {item.viewsCount}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="share"
                        color={Colors.grayColor}
                        size={13}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor11Medium }}>
                        Share
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="comment-text-outline"
                        color={Colors.grayColor}
                        size={13}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor11Medium }}>
                        {item.commentsCount}comments
                    </Text>
                </View>
            </View>
        )
    }

    function technologyButton() {
        return (
            <View style={styles.technologyButtonStyle}>
                <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                    Technology
                </Text>
            </View>
        )
    }

    function newsInfo() {
        return (
            <View style={styles.newsInfoWrapStyle}>
                <Text style={{ maxWidth: width - 100.0, ...Fonts.blackColor14Bold }}>
                    {item.headLine}
                </Text>
                <View style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <MaterialIcons
                        name={isLike ? "thumb-up-alt" : "thumb-up-off-alt"}
                        color={Colors.blackColor}
                        size={18}
                        onPress={() => updateState({ isLike: !isLike })}
                    />
                    <MaterialIcons
                        name={inBookMark ? "bookmark" : 'bookmark-outline'}
                        color={Colors.blackColor}
                        size={18}
                        style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                        onPress={() => updateState({ inBookMark: !inBookMark })}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    newsCommentViewsAndDateInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding * 7.0,
        marginVertical: Sizes.fixPadding,
    },
    technologyButtonStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 6.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    newsInfoWrapStyle: {
        marginVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default NewsDetailScreen;