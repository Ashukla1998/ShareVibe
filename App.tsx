import { enableScreens } from 'react-native-screens';
enableScreens();

import React, { JSX } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import UploadMedia from './src/screens/Upload';
import ScreenWrapper from './src/screens/SearchScreen';
import ReelsScreen from './src/screens/ReelsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Upload: undefined;
  Reel: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#6200EE',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              elevation: 5,
              height: Platform.OS === 'ios' ? hp('10%') : hp('9%'),
              paddingBottom: Platform.OS === 'ios' ? hp('2%') : hp('1.5%'),
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = '';

              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Search':
                  iconName = focused ? 'search' : 'search-outline';
                  break;
                case 'Upload':
                  iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
                  break;
                case 'Reel':
                  iconName = focused ? 'videocam' : 'videocam-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={ScreenWrapper} />
          <Tab.Screen name="Upload" component={UploadMedia} />
          <Tab.Screen name="Reel" component={ReelsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
