import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import Auth from './src/components/Auth';

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((res) => {
      // console.log('User >>> ', res);
      setUser(res);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <Logout /> : <Auth />}
      </SafeAreaView>
    </>
  );
};

const Logout = () => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <View>
      <Text>User logged</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});

export default App;
