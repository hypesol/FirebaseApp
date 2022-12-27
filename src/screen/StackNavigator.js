// import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ChapterListScreen from './ChapterListScreen';
import ReadingChapterScreen from './ReadingChapterScreen';

const Stack = createStackNavigator();



const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#03A89E', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="ChapterListScreen"
          component={ChapterListScreen}
          options={{ title: 'Chapter' }}
        />
        <Stack.Screen
          name="ReadingChapterScreen"
          component={ReadingChapterScreen}
          options={{ title: 'Reading' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;




// const AppNavigator = createStackNavigator(
//   {
//     Login: LoginScreen,
//     Home: HomeScreen,
//     Chapters: ChapterListScreen,
//     Reading: ReadingChapterScreen,
//   },
//   {
//     initialRouteName: 'Login',
//   },
// );

// export default AppContainer = createAppContainer(AppNavigator);
