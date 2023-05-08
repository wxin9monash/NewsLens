import React, { useState } from "react";
import { SafeAreaView, Dimensions, View, StatusBar, Text, TouchableOpacity, StyleSheet, Button, Modal, Animated,Easing   } from "react-native";
import { WebView } from 'react-native-webview';
import { Colors, Fonts, Sizes } from "../../constants/styles";
import CollapsingToolbar from "../../components/collapsingHeaderScreen";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import ColorBar from "../../components/detailComponents/biasBar";
import BannerSlider from "../../components/detailComponents/BannerSlider";
import UserReview from "../../components/detailComponents/UserReview";

const { width } = Dimensions.get('window');

const NewsDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;


    // const updateState = (data) => setState((state) => ({ ...state, ...data }))
    const [isLike, setisLike] = useState(false);
    const [inBookMark, setinBookMark] = useState(false);

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
        const newUrl = item.newsUrl
        const [modalVisible, setModalVisible] = useState(false);
        const redRatio = 0.3;
        const greenRatio = 0.4;
        const blueRatio = 0.3;
        const FoldableSection = ({ title, children, isfold }) => {
            const [expanded, setExpanded] = useState(isfold);
            const [rotation] = useState(new Animated.Value(0));
          
            const toggleExpanded = () => {
              Animated.timing(rotation, {
                toValue: expanded ? 0 : 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
          
              setExpanded(!expanded);
            };
          
            const arrowRotation = rotation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '90deg'],
            });
          
            return (
              <View>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={toggleExpanded}
                >
                  <Text style={styles.sectionTitle}>{title}</Text>
                  <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                  </Animated.View>
                </TouchableOpacity>
                {expanded && <View style={styles.sectionContent}>{children}</View>}
              </View>
            );
        };

        const handleSubmit = (rating) => {
            console.log('User rating:', rating);
            // Perform any action after receiving the rating
          };

        return (
            // <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
            //     <Text style={{ ...Fonts.grayColor10Medium }}>
            //         E-commerce giant <Text style={{ ...Fonts.blueColor11Medium }}>Amazon.com</Text> Inc’s online store was grappling with widespread outages on Sunday night, according to outage monitoring website Downdetector, the second broad disruption to services since late June.
            //     </Text>
            //     <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor10Medium }}>
            //         Its online store showed error messages on several regional domains. Reuters could not access product listing on its domains including, the United States, India, Canada, the United Kingdom, France and Singapore.
            // </View>
            
            <View style={styles.container}>
                <FoldableSection title="Summary" isfold='false'>
                    <Text style={{marginVertical: Sizes.fixPadding,marginHorizontal: Sizes.fixPadding * 1.0, ...Fonts.blackColor13Bold}}>{item.description}</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            color = 'black'
                            title="Read Full Article"
                            onPress={() => setModalVisible(true)}
                        />
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalVisible}
                            onRequestClose={() => {
                            setModalVisible(false);
                            }}
                        >
                            <WebView source={{ uri: newUrl }} />
                            <Button color = 'black' title="Close" onPress={() => setModalVisible(false)} />
                        </Modal>
                    </View>
                </FoldableSection>
                <FoldableSection title="Full Media Coverage">
                    <View style={styles.mediaContainer}>
                        <BannerSlider />
                    </View>
                </FoldableSection>               
                <FoldableSection title="Political Bias Analysis">
                    <ColorBar
                            redRatio={redRatio}
                            greenRatio={greenRatio}
                            blueRatio={blueRatio}
                    />
                </FoldableSection>   
                <FoldableSection title="Sentiment Analysis">

                </FoldableSection>   
                <FoldableSection title="User Review">
                    <UserReview onSubmit={handleSubmit}/>
                </FoldableSection>                   
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
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="share"
                        color={Colors.grayColor}
                        size={13}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor11Medium }}>
                        Share
                    </Text>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="comment-text-outline"
                        color={Colors.grayColor}
                        size={13}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor11Medium }}>
                        {item.commentsCount}
                    </Text>
                </View>
            </View>
        )
    }

    function technologyButton() {
        return (
            <View style={styles.technologyButtonStyle}>
                <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                    Australia
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
                        onPress={() => setisLike(!isLike)}
                    />
                    <MaterialIcons
                        name={inBookMark ? "bookmark" : 'bookmark-outline'}
                        color={Colors.blackColor}
                        size={18}
                        style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                        onPress={() => setinBookMark(!inBookMark)}
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
      },
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      sectionTitle: {
        fontSize: 18,
      },
      sectionContent: {
        padding: 16,
      },
      sectionText: {
        fontSize: 16,
      },
      mediaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

export default NewsDetailScreen;