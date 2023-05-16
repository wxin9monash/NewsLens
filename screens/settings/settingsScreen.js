import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Text, StyleSheet, ScrollView } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        pushNotification: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { pushNotification } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.backColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {notificationSetting()}
                    {divider()}
                    {clearCacheInfo()}
                    {divider()}
                    {servicesInfo()}
                    {divider()}
                    {privacyPolicyTitle()}
                    {divider()}
                    {aboutUsTitle()}
                    {divider()}
                    {termsOfUseTitle()}
                    {divider()}
                    {versionInfo()}
                    {divider()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function versionInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Version
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 15.0, ...Fonts.grayColor12Medium }}>
                    1.0
                </Text>
            </View>
        )
    }

    function termsOfUseTitle() {
        return (
            <Text style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding,
                ...Fonts.whiteColor14Bold
            }}>
                Terms of use
            </Text>
        )
    }

    function aboutUsTitle() {
        return (
            <Text style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding,
                ...Fonts.whiteColor14Bold
            }}>
                About Us
            </Text>
        )
    }

    function privacyPolicyTitle() {
        return (
            <Text style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding,
                ...Fonts.whiteColor14Bold
            }}>
                Privacy Policy
            </Text>
        )
    }

    function servicesInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Services
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 15.0, ...Fonts.grayColor12Medium }}>
                    Connect with social media account
                </Text>
            </View>
        )
    }

    function clearCacheInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Clear Cache
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 15.0, ...Fonts.grayColor12Medium }}>
                    Clear locally cached images, currently : 15.4MB
                </Text>
            </View>
        )
    }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: '#e0e0e0',
                    height: 1.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            />
        )
    }

    function notificationSetting() {
        return (
            <View style={styles.notificationSettingWrapStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Push Notifications
                </Text>
                <Switch
                    trackColor={{ true: '#7D7D7D', false: '#C3C3C3' }}
                    thumbColor={pushNotification ? Colors.whiteColor : '#9E9E9E'}
                    value={pushNotification}
                    color={Colors.whiteColor}
                    style={{ transform: [{ scaleX: .9 }, { scaleY: .8 }] }}
                    onValueChange={(value) => updateState({ pushNotification: value })}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor20Bold }}>
                    Settings
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    notificationSettingWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
})

export default SettingsScreen;