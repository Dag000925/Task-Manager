import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const Log = ({ setUserLoggedIn }) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // was false
  const auth = FIREBASE_AUTH; 

  const navigation = useNavigation();

  // changes from here
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUserLoggedIn(true);
        navigation.navigate('Profile');
      }
  });
  return () => unsubscribe();
},[navigation, setUserLoggedIn]);

// 
  const signIn = async ()=> {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setUserLoggedIn(true);
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
      alert('Login Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () =>{
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Registeration Successful');
      setUserLoggedIn(true);
      navigation.navigate('Profile');
    } catch (error){
      console.log(error);
      alert('Sign in Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <KeyboardAvoidingView behavior="padding">
        <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}></TextInput>

        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' autoCapitalize='none'
          onChangeText={(text) => setPassword(text)}></TextInput>
          <StatusBar style="auto" />

      { loading ? (<ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <> 
        <Button title="Login" onPress={signIn}/>
        <Button title="Create Account" onPress={signUp}/>
        </>
      )}
      </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9370db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 25,
  },
});

export default Log;