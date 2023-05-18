// Import necessary libraries from react and react-native
import React from "react";
import { SafeAreaView, View, Dimensions, StatusBar, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles"; // Import predefined styles
import { MaterialIcons } from '@expo/vector-icons'; // Import icons library

// Retrieve the screen width
const { width } = Dimensions.get('window');

// Initialize a list of categories to be displayed
const categoriesList = [
    {
        id: '1',
        categoryImage: require('../../assets/images/category/world.png'),
        category: 'WORLD',
    },
    {
        id: '2',
        categoryImage: require('../../assets/images/category/entertainment.png'),
        category: 'ENTERTAINMENT',
    },
    {
        id: '3',
        categoryImage: require('../../assets/images/category/technology.png'),
        category: 'TECHNOLOGY',
    },
    {
        id: '4',
        categoryImage: require('../../assets/images/category/health.png'),
        category: 'HEALTH',
    },
    {
        id: '6',
        categoryImage: require('../../assets/images/category/business.png'),
        category: 'BUSINESS',
    },
    {
        id: '7',
        categoryImage: require('../../assets/images/category/travel.png'),
        category: 'TRAVEL',
    },
    {
        id: '8',
        categoryImage: require('../../assets/images/category/food.png'),
        category: 'FOOD',
    },
    {
        id: '9',
        categoryImage: require('../../assets/images/category/science.png'),
        category: 'SCIENCE',
    },
    {
        id: '10',
        categoryImage: require('../../assets/images/category/sports.png'),
        category: 'SPORTS',
    },
    {
        id: '11',
        categoryImage: require('../../assets/images/category/other.png'),
        category: 'OTHER',
    },
];

// The CategoryScreen component
// This component receives the 'navigation' prop, which is used to navigate between different screens
const CategoryScreen = ({ navigation }) => {
    // Initialize a search type variable
    const searchType = ''

    // The render of the CategoryScreen component
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.blackColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {categories()}
            </View>
        </SafeAreaView>
    )

    // Function to render the categories
    function categories() {
        // Component to render each individual item in the FlatList
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('AllTopNews', { category: item.category })}
                style={styles.categoriesWrapStyle}
            >
                <Image
                    source={item.categoryImage}
                    style={{ width: 50.0, height: 50.0, tintColor: 'white' }}
                    resizeMode="contain"
                />
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    {item.category}
                </Text>
            </TouchableOpacity>

        )
        // Return a FlatList of categories
        return (
            <FlatList
                data={categoriesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding - 5.0, paddingTop: Sizes.fixPadding - 5.0, }}
            />
        )
    }
    
    // Function to render the header
    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Category
                </Text>
                <MaterialIcons
                    name="search"
                    color={Colors.whiteColor}
                    size={30}
                    onPress={() => navigation.push('Search', { searchType })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    categoriesWrapStyle: {
        backgroundColor: '#65737e',
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding * 5.3,
        flex: 1,
        marginHorizontal: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 3.0,
        borderColor: '#e0e0e0',
        borderWidth: 0.3,
        maxWidth: width / 2.4,
    }
})

export default CategoryScreen;