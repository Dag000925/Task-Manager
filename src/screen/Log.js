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
      }
  });
  return () => unsubscribe();
},[navigation, setUserLoggedIn]);

// 
  const signIn = async ()=> {
    //setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setUserLoggedIn(true);
    } catch (error) {
      console.log(error);
      alert('Login Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logImg} style={styles.imageStyle}/>
        <Text style={styles.overlayText}>Task Manager</Text>
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
        <View style={styles.accountPromptContainer}>
          <Text style={styles.accountPromptText}>Don't have an account?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Register Here" onPress={() => navigation.navigate('SignUp')}/>
          </View>
        </View>
        </>
      )}
      </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // overall container style
  container: {
    flex: 1,
    backgroundColor: '#9370db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // content style
  centeredContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 200,
    alignItems: 'center',
    
  },
  // image positioning, height, width
  imageStyle: {
    width: 400,
    height: 200,
    position: 'absolute',
    top: 270,
    
  },
  // input field style
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    paddingLeft: 15,
    width: 300,
    backgroundColor: 'white',
    
  },
  buttonContainer: {
    top: 20,
    width: '80%',
    borderRadius: 5,
    position: 'absolute',
    //justifyContent: 'flex-start',
    left: 100,

  },
  // text style
  overlayText: {
    color: 'white', 
    fontSize: 48, 
    fontWeight: 'bold',
    top: 200,
    fontFamily: 'Arial',
  },
  accountPromptText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    left: 136,
    fontSize: 17,

  },
  accountPromptContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  
  
  
  
});

export default Log;