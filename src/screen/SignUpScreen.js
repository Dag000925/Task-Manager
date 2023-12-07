import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, StatusBar, Image, Text } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const regImg = require("../../assets/reg.png");

const SignUpScreen = ({ navigation, setUserLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    


    const signUp = async () => {
        try{
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
            alert('Registeration Successful');
            setUserLoggedIn(true);

            await sendEmailVerification(response.user, {
              handleCodeInApp: true,
              url: 'https://taskmanager-f6ad6.firebaseapp.com'
            });
            alert('Verification sent');

            const userRef = doc(FIRESTORE_DB, 'users', response.user.uid);
            await setDoc(userRef, {
              email, 
              lastName,
              firstName,
              //tasks: [],
              courses: [],
              events: [],
            });

            
            /* await FIREBASE_AUTH.currentUser.reload();
            setUserLoggedIn(true); */
            

            //navigation.navigate('Profile');
          } catch (error){
            console.log(error);
            alert('Sign up Failed: ' + error.message);
          } finally {
            setLoading(false);
          }
    };

return (
    <View style={styles.container}>
      <Image source={regImg} style={styles.imageStyle}/>
      <Text style={styles.overlayText}>Registration</Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={lastName}
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          value={firstName}
          style={styles.input}
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        <StatusBar style="auto" />
        <View style = {styles.buttonContainer}>
          <Button title="Create Account" onPress={signUp} />
        </View>
      </KeyboardAvoidingView>
    </View>
);
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9370db',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      top: 145,
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingLeft: 15,
      width: 300,
      backgroundColor: 'white',
    },
    centeredContent: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 200,
      alignItems: 'center',
      
    },
    buttonContainer: {
      marginTop: 10,
      width: '80%',
      borderRadius: 5,
      alignSelf: 'center',
      top: 135,

    },
    imageStyle: {
      width: 400,
      height: 280,
      top: 90,
      position: 'absolute',
    },
    overlayText: {
      color: 'white', 
      fontSize: 48, 
      fontWeight: 'bold',
      top: 365,
      fontFamily: 'Arial',
      position: 'absolute',
    },

  });
  
  export default SignUpScreen;