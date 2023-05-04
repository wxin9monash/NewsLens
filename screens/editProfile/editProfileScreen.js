import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, TextInput, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';

const EditProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: 'Krishna Rai',
        password: '12345678',
        email: 'krishnarai@gmail.com',
        mobileNumber: '(+91)1234567890',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        password,
        email,
        mobileNumber,
        showBottomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {changeProfilePicInfo()}
                    {editNameInfo()}
                    {passwordInfo()}
                    {emailInfo()}
                    {mobileNoInfo()}
                    {saveButton()}
                </ScrollView>
            </View>
            {changeProfileOptionsSheet()}
        </SafeAreaView>
    )

    function changeProfileOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { updateState({ showBottomSheet: false }) }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: Sizes.fixPadding,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor16Bold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={22} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor14SemiBold, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-library" size={22} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor14SemiBold, marginLeft: Sizes.fixPadding }}>
                            Select From Gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.pop()}
                style={styles.saveButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    function mobileNoInfo() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <Text style={{ width: 110.0, ...Fonts.grayColor15SemiBold }}>
                    Mobile No
                </Text>
                <TextInput
                    keyboardType="phone-pad"
                    selectionColor={Colors.blackColor}
                    value={mobileNumber}
                    onChangeText={(text) => updateState({ mobileNumber: text })}
                    style={{
                        flex: 1,
                        ...Fonts.blackColor15Medium
                    }}
                />
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <Text
                    style={{
                        width: 110.0,
                        ...Fonts.grayColor15SemiBold
                    }}
                >
                    Email
                </Text>
                <TextInput
                    selectionColor={Colors.blackColor}
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    style={{
                        flex: 1,
                        ...Fonts.blackColor15Medium
                    }}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function passwordInfo() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <Text
                    style={{
                        width: 110.0,
                        ...Fonts.grayColor15SemiBold
                    }}
                >
                    Password
                </Text>
                <TextInput
                    selectionColor={Colors.blackColor}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => updateState({ password: text })}
                    style={{
                        flex: 1,
                        ...Fonts.blackColor15Medium
                    }}
                />
            </View>
        )
    }

    function editNameInfo() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <Text style={{ width: 120.0, ...Fonts.grayColor15SemiBold }}>
                    Name
                </Text>
                <TextInput
                    selectionColor={Colors.blackColor}
                    value={name}
                    onChangeText={(text) => updateState({ name: text })}
                    style={{
                        flex: 1,
                        ...Fonts.blackColor15Medium
                    }}
                />
            </View>
        )
    }

    function changeProfilePicInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => updateState({ showBottomSheet: true })}
                style={{
                    alignItems: 'center',
                    marginVertical: Sizes.fixPadding,
                    alignSelf: 'center',
                }}
            >
                <View>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={{
                            width: 70.0,
                            height: 70.0,
                            borderRadius: 35.0,
                        }}
                    />
                    <View style={styles.addProfilePicIconWrapStyle}>
                        <MaterialIcons
                            name="add"
                            color={Colors.whiteColor}
                            size={14}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor20Bold }}>
                    Edit
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
    textFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#e0e0e0',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
    },
    saveButtonStyle: {
        backgroundColor: Colors.blackColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding * 3.0,
    },
    addProfilePicIconWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        right: 0.0,
        width: 16.0,
        height: 16.0,
        borderRadius: 8.0,
        backgroundColor: Colors.blackColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default EditProfileScreen;