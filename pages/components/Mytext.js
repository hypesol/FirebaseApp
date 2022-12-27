// #2 Integration of Firebase Cloud Firestore Database with React Native App
// https://aboutreact.com/react-native-firebase-cloud-firestore-db
/*Custom Text*/
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Mytext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
  },
});

export default Mytext;