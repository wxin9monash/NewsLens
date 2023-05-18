// Import required modules
import React, { Component } from 'react';
import { Colors } from "../constants/styles";
import {
    Animated,
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

// Set the default properties for the CollapsingToolbar component
const defaultProps = {
    leftItem: null,
    leftItemPress: null,
    rightItem: null,
    rightItemPress: null,
    element: null,
    titleColor: '#fff',
    toolbarColor: Colors.primaryColor,
    toolbarMaxHeight: 300,
    toolbarMinHeight: 40,
    borderBottomRadius: 0,
    childrenMinHeight: 700,
    isImage: true,
};

class CollapsingToolbar extends Component {
    constructor(props) {
        super(props);

        // Initialize state with scrollY as an Animated Value
        this.state = {
            scrollY: new Animated.Value(0),
        };
    }

    render() {
        // Destructure properties from this.props
        const {
            children,
            src,
            leftItem,
            leftItemPress,
            rightItem,
            rightItemPress,
            element,
            toolbarColor,
            toolbarMaxHeight,
            toolbarMinHeight,
            borderBottomRadius,
            childrenMinHeight,
            isImage,
        } = this.props;

        const scrollDistance = toolbarMaxHeight - toolbarMinHeight;

        // Define animations for various UI elements
        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, scrollDistance],
            outputRange: [0, -scrollDistance],
            extrapolate: 'clamp',
        });

        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, scrollDistance / 2, scrollDistance],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, scrollDistance],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const elementScale = this.state.scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

        // Render the collapsing toolbar component
        return (
            <View style={styles.fill}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <Animated.ScrollView
                    style={styles.fill}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}>
                    <View style={{ marginTop: toolbarMaxHeight, minHeight: childrenMinHeight }}>
                        {children}
                    </View>
                </Animated.ScrollView>
                <Animated.View
                    style={[
                        styles.header,
                        {
                            backgroundColor: 'transparent',
                            height: toolbarMaxHeight,
                            transform: [{ translateY: headerTranslate }],
                            borderBottomLeftRadius: borderBottomRadius,
                            borderBottomRightRadius: borderBottomRadius,
                        },
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                height: toolbarMaxHeight,
                                backgroundColor: 'transparent',
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        borderBottomLeftRadius={borderBottomRadius}
                        borderBottomRightRadius={borderBottomRadius}
                        source={src}
                    />

                    <Animated.View
                        style={[
                            styles.action,
                            {
                                backgroundColor: 'transparent',
                                transform: [
                                    { scale: elementScale },
                                ],
                                bottom: isImage ? 20 : 0.0,
                                paddingHorizontal: isImage ? 20 : 0.0,
                            },
                        ]}
                    >
                        {element}
                    </Animated.View>
                </Animated.View>

                <Animated.View style={styles.bar}>
                    <TouchableOpacity onPress={leftItemPress}>
                        <View style={styles.left}>{leftItem}</View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={rightItemPress}>
                        <View style={styles.right}>{rightItem}</View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

// Assign the default props to the CollapsingToolbar component
CollapsingToolbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        position: 'absolute',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        resizeMode: 'cover',
    },
    action: {
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
    },
    bar: {
        top: 0,
        left: 0,
        right: 20,
        height: 56,
        position: 'absolute',
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    left: {
        top: 0,
        left: 0,
        width: 50,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        top: 0,
        right: 0,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CollapsingToolbar;