import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
    View,
    StatusBar,
    Text,
    StyleSheet
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { CreditCardInput } from "../../components/creditCard/expo-credit-card";

const AddNewCardScreen = ({ navigation }) => {

    const [state, setState] = useState({
        cardNumberStatus: 'invalid',
        cardExpiryStatus: 'invalid',
        cardCvcStatus: 'invalid',
        cardHolderStatus: 'invalid',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        cardNumberStatus,
        cardExpiryStatus,
        cardCvcStatus,
        cardHolderStatus,
    } = state;

    const _onChange = (formData) => {
        updateState({
            cardNumberStatus: formData.status.number,
            cardExpiryStatus: formData.status.expiry,
            cardCvcStatus: formData.status.cvc,
            cardHolderStatus: formData.status.name,
        })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {cardDetails()}
                    {ValidateButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function cardDetails() {
        return (
            <CreditCardInput
                autoFocus={true}
                requiresName
                requiresCVC
                labelStyle={{ ...Fonts.blackColor15Medium }}
                inputStyle={{ ...Fonts.blackColor15Medium, }}
                inputContainerStyle={{
                    marginBottom: Sizes.fixPadding,
                    borderBottomColor: 'transparent',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                cardFontFamily='Kodchasan_Regular'
                cardScale={1.0}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={Colors.grayColor}
                onChange={_onChange}
            />
        )
    }

    function ValidateButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    cardNumberStatus == 'invalid' ||
                        cardNumberStatus == 'incomplete' ||
                        cardExpiryStatus == "invalid" ||
                        cardExpiryStatus == "incomplete" ||
                        cardCvcStatus == 'invalid' ||
                        cardHolderStatus == "invalid" ?
                        ToastAndroid.show("Please fill valid details", ToastAndroid.LONG)
                        :
                        navigation.pop()
                }}
                style={styles.validateButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Validate
                </Text>
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
                    Add New Card
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
    validateButtonStyle: {
        backgroundColor: Colors.blackColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding * 3.0,
    },
})

export default AddNewCardScreen;