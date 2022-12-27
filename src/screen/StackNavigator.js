// import { createStackNavigator, createAppContainer } from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ChapterListScreen from './ChapterListScreen';
import ReadingChapterScreen from './ReadingChapterScreen';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Chapters: ChapterListScreen,
    Reading: ReadingChapterScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

export default AppContainer = createAppContainer(AppNavigator);
