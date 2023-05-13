import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from "@rneui/themed";

const { width } = Dimensions.get('screen');

const ProfileScreen = ({ navigation }) => {

    const [showLogoutDialog, setshowLogoutDialog] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {profileInfo()}
                {divider()}
                {profileSettingOptions()}
            </View>
            {logoutDialog()}
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => setshowLogoutDialog(false)}
                overlayStyle={{ padding: 0.0, width: '80%', borderRadius: Sizes.fixPadding - 5.0, }}
            >
                <View style={styles.dialogContainerStyle}>
                    <Text style={{ ...Fonts.blackColor18Bold, }}>
                        Sure you want to logout?
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setshowLogoutDialog(false)}
                            style={{
                                ...styles.cancelAndLogoutButtonStyle,
                                marginRight: Sizes.fixPadding,
                                backgroundColor: Colors.blackColor,
                            }}>
                            <Text style={{ ...Fonts.whiteColor20Bold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Overlay>
        )
    }


    function profileSettingOptions() {
        return (
            <>
                {/* <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('MostViewNews')}
                >
                    {optionsShort(
                        {
                            icon: require('../../assets/images/icons/view.png'),
                            option: 'Most View News'
                        }
                    )}
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Bookmark')}
                >
                    {optionsShort(
                        {
                            icon: require('../../assets/images/icons/save.png'),
                            option: 'Bookmarks'
                        }
                    )}
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('Notifications')}
                >
                    {optionsShort(
                        {
                            icon: require('../../assets/images/icons/notification.png'),
                            option: 'Notifications'
                        }
                    )}
                </TouchableOpacity> */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('Settings')}
                >
                    {optionsShort(
                        {
                            icon: require('../../assets/images/icons/settings.png'),
                            option: 'Settings'
                        }
                    )}
                </TouchableOpacity>
            </>
        )
    }

    function optionsShort({ icon, option }) {
        return (
            <View style={styles.profileSettingOptionsWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{ width: 20.0, height: 20.0, tintColor: 'white' }}
                        resizeMode="contain"
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            maxWidth: width - 150.0,
                            marginLeft: Sizes.fixPadding + 5.0,
                            ...Fonts.whiteColor14Bold
                        }}
                    >
                        {option}
                    </Text>
                </View>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    color={Colors.whiteColor}
                    size={25}
                />
            </View>
        )
    }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: '#cccccc',
                    height: 1.0,
                    marginHorizontal: Sizes.fixPadding,
                    marginVertical: Sizes.fixPadding * 2.5,
                }}
            />
        )
    }

    function profileInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('EditProfile', { id: 'photo' })}
                style={styles.profileInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={{
                            width: 70.0,
                            height: 70.0,
                            borderRadius: 35.0,
                        }}
                    />
                    <View style={{
                        maxWidth: width - 200,
                        marginLeft: Sizes.fixPadding,
                    }}>
                        <Text numberOfLines={1} style={{ lineHeight: 18.0, ...Fonts.whiteColor14Bold }}>
                            Krishna Rai
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor11SemiBold }}>
                            krishnarai@gmail.com
                        </Text>
                    </View>
                </View>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    color={Colors.grayColor}
                    size={25}
                />
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    profileSettingOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 10.0,
    },

    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    cancelAndLogoutButtonStyle: {
        flex: 1,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 8.0,
        borderRadius: Sizes.fixPadding - 5.0,
    }
})

export default ProfileScreen;