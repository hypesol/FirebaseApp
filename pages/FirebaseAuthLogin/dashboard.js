// components/dashboard.js
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      catgid: '',
      catgname: '',
    };
  }
  signOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };

  testCode = async () => {
    await firestore()
      .collection('Users')
      // .doc("customid")
      .add({
        name: userName,
        contact: userContact,
        address: userAddress,
      })
      .then(() => {
        Alert.alert(
          'Success',
          'You are Registered Successfully',
          [
            {
              text: 'Ok',
              onPress: () => props.navigation.navigate('HomeScreen'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        Alert.alert(
          'Exception',
          error,
          [
            {
              text: 'Ok',
              onPress: () => props.navigation.navigate('HomeScreen'),
            },
          ],
          {cancelable: false},
        );
      });
  };
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  addCategory = async () => {
    await firestore()
      .collection('categories')
      .doc('2')
      .set({
        id: 2,
        name: 'Fun',
      })
      .then(() => {
        alert('Category Added');
      })
      .catch(error => {
        alert(`Exception: ${error}`);
      });
  };

  componentDidMount() {
    const usersCollection = firestore()
      .collection('categories')
      .get()
      .then(collectionSnapshot => {
        console.log('Total users: ', collectionSnapshot.size);
        collectionSnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
      });
    console.log('usersCollection', usersCollection);
  }

  render() {
    this.state = {
      displayName: auth().currentUser.displayName,
      uid: auth().currentUser.uid,
    };
    return (
      <>
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Category Id"
            value={this.state.email}
            onChangeText={val => this.updateInputVal(val, 'catgid')}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Category"
            value={this.state.password}
            onChangeText={val => this.updateInputVal(val, 'catgname')}
            maxLength={15}
          />
          <Button
            color="#3740FE"
            title="Add Category"
            onPress={() => this.addCategory()}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Hello, {this.state.displayName}</Text>
          <Button
            color="#3740FE"
            title="Logout"
            onPress={() => this.signOut()}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
