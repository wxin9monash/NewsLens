import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import searchScreen from "./screens/search/searchScreen";
import videoDetailScreen from "./screens/videoDetail/videoDetailScreen";
import newsDetailScreen from "./screens/newsDetail/newsDetailScreen";
import allTopNewsScreen from "./screens/allTopNews/allTopNewsScreen";
import allLatestNewsScreen from "./screens/allLatestNews/allLatestNewsScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import settingsScreen from "./screens/settings/settingsScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import splashScreen from "./screens/splashScreen";
import PoliticalBiasScreen from './screens/politicalBias/PoliticalBiasScreen';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={splashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Onboarding" component={onboardingScreen} />
        <Stack.Screen name="BottomTabBar" component={bottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Search" component={searchScreen} />
        <Stack.Screen name="VideoDetail" component={videoDetailScreen} />
        <Stack.Screen name="NewsDetail" component={newsDetailScreen} />
        <Stack.Screen name="AllTopNews" component={allTopNewsScreen} />
        <Stack.Screen name="PoliticalBias" component={PoliticalBiasScreen} />
        <Stack.Screen name="AllLatestNews" component={allLatestNewsScreen} />
        <Stack.Screen name="EditProfile" component={editProfileScreen}
          sharedElements={(route, otherRoute, showing) => {
            const id = route.params.id;
            return [id];
          }}
        />
        <Stack.Screen name="Notifications" component={notificationsScreen} />
        <Stack.Screen name="Settings" component={settingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;