async function saveTokenToDatabase(token) {
  const usersCollection = firestore()
    .collection('tokens')
    .get()
    .then(async collectionSnapshot => {
      // console.log('Total users: ', collectionSnapshot.size);
      if (collectionSnapshot.size == 0) {
        await firestore()
          .collection('tokens')
          .add({
            token: firestore.FieldValue.arrayUnion(token),
          });
      }
      collectionSnapshot.forEach(async documentSnapshot => {
        // console.log(
        // 'User ID: ',
        // documentSnapshot.id,
        // token,
        // documentSnapshot.data().token[0],
        // );
        // console.log('Device Token', token);
        // console.log(
        //   'Databs Token',
        //   documentSnapshot.id,
        //   documentSnapshot.data(),
        // );
        if (documentSnapshot.data().token[0] === token) {
          console.log('Already exist please update');
          await firestore()
            .collection('tokens')
            .doc(documentSnapshot.id)
            .update({
              token: firestore.FieldValue.arrayUnion(token),
            });
        } else {
          console.log('Add New');
          // await firestore()
          //   .collection('tokens')
          //   .add({
          //     token: firestore.FieldValue.arrayUnion(token),
          //   });
        }
      });
    });
  // console.log('usersCollection', usersCollection);
  await firestore()
    .collection('users')
    .add({
      id: 222,
      name: 'Rizwan Maqbool',
      tokens: firestore.FieldValue.arrayUnion(token),
    });
}

const showUserCollection = () => {
  // const usersCollection = firestore()
  //   .collection('users')
  //   .doc('1q0Gu311zOi6tcw2rXG5')
  //   .get();

  // const usersCollection = firestore().collection('users').get();
  // console.log('usersCollection', usersCollection);

  const usersCollection = firestore()
    .collection('users')
    .get()
    .then(collectionSnapshot => {
      console.log('Total users: ', collectionSnapshot.size);
      collectionSnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
  console.log('usersCollection', usersCollection);
};

// useEffect(() => {
//   messaging()
//     .getToken()
//     .then(token => {
//       // console.log('FCM Token', token);
//       return saveTokenToDatabase(token);
//     });
//   if (Platform.OS == 'ios') {
//     messaging()
//       .getAPNSToken()
//       .then(token => {
//         return saveTokenToDatabase(token);
//       });
//   }
//   return messaging().onTokenRefresh(token => {
//     saveTokenToDatabase(token);
//   });
// }, []);

useEffect(() => {
  messaging()
    .subscribeToTopic('weather')
    .then(() => console.log('Subscribed to topic!'));
}, []);
