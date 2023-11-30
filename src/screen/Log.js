import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TextInput, KeyboardAvoidingView, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const logImg = require("../../assets/log.jpg");

const Log = ({ setUserLoggedIn }) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // was false
  const auth = FIREBASE_AUTH; 

  const navigation = useNavigation();

  console.log('setUserLoggedIn type:', typeof setUserLoggedIn);

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
      <Image source={logImg} style={styles.imageStyle}/>
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
        <View>
          <Button title="Login" onPress={signIn}/>
        </View>
        <View>
          <Button title="Create Account" onPress={() => navigation.navigate('SignUp')}/>
        </View>
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
    justifyContent: 'flex-end',
    paddingBottom: 250,
    alignItems: 'center',
    
  },
  imageStyle: {
    width: 400,
    height: 200,
    //resizeMode: 'contain',
    //paddingBottom: 150,
    position: 'absolute',
    top: 220,
    
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
    width: '80%',
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
    borderRadius: 5,
  },
  
  
});

export default Log;