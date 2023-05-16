import React, { useState, useRef, useContext } from "react";
import { SafeAreaView, Dimensions, View, StatusBar, Text, TouchableOpacity, StyleSheet, Button, Modal, Animated, Easing, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';
import { TextInput } from 'react-native-paper';
import { Colors, Fonts, Sizes } from "../../constants/styles";
import CollapsingToolbar from "../../components/collapsingHeaderScreen";
import { MaterialIcons, SimpleLineIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import UserReview from "../../components/detailComponents/UserReview";
import GoogleNewsSearch from "../../components/detailComponents/GoogleNewsSearch";
import { BookmarkContext } from "../BookmarkContext";

const { width } = Dimensions.get('window');

const NewsDetailScreen = ({ navigation, route }) => {

  const item = route.params.item;
  const newsTitle = route.params.item.headLine
  const newsSource = route.params.item.newsSource
  const { addBookmark, removeBookmark } = useContext(BookmarkContext);
  console.log(newsSource)

  // const updateState = (data) => setState((state) => ({ ...state, ...data }))
  const [isLike, setisLike] = useState(false);
  const [inBookMark, setinBookMark] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

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
    const newUrl = item.newsUrl;
    const [modalVisible, setModalVisible] = useState(false);

    const FoldableSection = ({ title, children, isfold }) => {
      const [expanded, setExpanded] = useState(isfold === 'false');
      const rotation = useRef(new Animated.Value(0)).current;

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
              <Ionicons name="chevron-forward" size={24} color="white" />
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

    const openLink = (url) => {
      setCurrentUrl(url);
      setModalVisible(true);
    };

    return (
      <View style={styles.container}>
        <FoldableSection title="Summary" isfold="false">
          <Text style={styles.summaryText}>{item.description}</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => openLink(newUrl)}>
              <Text numberOfLines={3} style={styles.readmore}>Read Full Article</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <WebView source={{ uri: newUrl }} />
              <Button color="black" title="Close" onPress={() => setModalVisible(false)} />
            </Modal>
          </View>
        </FoldableSection>
        {/* <FoldableSection title="Full Media Coverage" isfold="false">
                <View style={styles.mediaContainer}>
                  <BannerSlider />
                </View>
              </FoldableSection> */}
        <FoldableSection title="Political Bias Analysis" isfold="false">
          <View style={styles.googleNewsContainer}>
            <GoogleNewsSearch searchInput={newsTitle} media={newsSource} />
          </View>
        </FoldableSection>
        {/* <FoldableSection title="Sentiment Analysis">
        </FoldableSection> */}
        <FoldableSection title="User Review">
          <UserReview onSubmit={handleSubmit} media={newsSource} />
        </FoldableSection>
      </View>
    );
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
    // fetchNewsBias(newsTitle);
    return (
      <View style={styles.newsInfoWrapStyle}>
        <Text style={{ maxWidth: width - 100.0, ...Fonts.whiteColor16Bold }}>
          {item.headLine}
        </Text>
        <View style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {/* <MaterialIcons
            name={isLike ? "thumb-up-alt" : "thumb-up-off-alt"}
            color={Colors.whiteColor}
            size={18}
            onPress={() => setisLike(!isLike)}
          /> */}
          <MaterialIcons
            name={inBookMark ? "bookmark" : "bookmark-outline"}
            color={Colors.whiteColor}
            size={25}
            style={{ marginLeft: Sizes.fixPadding - 5.0 }}
            onPress={() => {
              if (inBookMark) {
                // Handle the action when the item is already bookmarked
                removeBookmark(item);
              } else {
                // Handle the action when the item is not bookmarked
                addBookmark(item);
              }
              setinBookMark(!inBookMark);
            }}
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
    paddingHorizontal: Sizes.fixPadding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#65737e',
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans_Bold'
  },
  sectionContent: {
    padding: 16,
    backgroundColor: '#65737e',
    borderRadius: 4,
    marginBottom: 20,
  },
  summaryText: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'OpenSans_Medium'
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serpContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  serpInput: {
    marginBottom: 10,
  },
  serpResult: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  serpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serpLink: {
    fontSize: 12,
    color: 'blue',
  },
  serpSource: {
    fontSize: 12,
  },
  googleNewsContainer: {
    flex: 1,
  },
  readmore: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'OpenSans_SemiBold',
    margin: Sizes.fixPadding,
    marginLeft: 0,
    textDecorationLine: 'underline',
  },
})

export default NewsDetailScreen;