// #2 Integration of Firebase Cloud Firestore Database with React Native App
// https://aboutreact.com/react-native-firebase-cloud-firestore-db

import 'react-native-gesture-handler';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewAllUser from './pages/ViewAllUser';
import ViewUser from './pages/ViewUser';
import DeleteUser from './pages/DeleteUser';
import RealTimeAddUpdateUser from './pages/RealTimeAddUpdateUser';
import AddOrderSummary from './pages/AddOrderSummary';

/* Firebase Authentication Login */
import Signup from './pages/FirebaseAuthLogin/signup';
import Login from './pages/FirebaseAuthLogin/login';
import Dashboard from './pages/FirebaseAuthLogin/dashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
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
          name="Signup"
          component={Signup}
          options={{title: 'Signup'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'Dashboard'}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{title: 'Register'}}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{title: 'Update'}}
        />
        <Stack.Screen
          name="ViewAllUser"
          component={ViewAllUser}
          options={{title: 'View All'}}
        />
        <Stack.Screen
          name="ViewUser"
          component={ViewUser}
          options={{title: 'View'}}
        />
        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{title: 'Delete'}}
        />
        <Stack.Screen
          name="RealTimeAddUpdateUser"
          component={RealTimeAddUpdateUser}
          options={{title: 'Real Time Updates'}}
        />
        <Stack.Screen
          name="AddOrderSummary"
          component={AddOrderSummary}
          options={{title: 'Add Order Summary'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
