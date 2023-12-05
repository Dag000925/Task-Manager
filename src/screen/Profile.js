import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DB } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import userPlaceholder from '../../assets/user.png';


export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userRef = doc(FIRESTORE_DB, 'users', user.uid);
            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    console.log('user data: ', userData);
                    setName(`${userData.firstName} ${userData.lastName}`);
                    setEmail(userData.email);
                    setImage(userData.photoURL);
                } else {
                    console.log('User does not exist');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    fetchUserData();
}, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);

    if (!result.canceled){
      uploadMedia(result.assets[0].uri);
    }
  };
  const updateProfilePicture = async (url) => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;
  
    const userRef = doc(FIRESTORE_DB, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        photoURL: url,
      });
      setImage(url); 
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const uploadMedia = async (uri) => {
    setUploading(true);

    try{
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.response = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      const user = FIREBASE_AUTH.currentUser;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const ref = storageRef(FIREBASE_STORAGE, `profile_pictures/${user.uid}/${filename}`);

      const uploadTask = await uploadBytes(ref, blob);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      updateProfilePicture(downloadURL);
      setUploading(false);
      Alert.alert('Photo Uploaded');
      setImage(null);
    }catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Image
          source={image ? { uri: image } : userPlaceholder}
          style={styles.userImage}
        />
        <Text style={styles.emailAndText}>Hi! {name}</Text>
        <Text style={styles.emailAndText}>Email: {email}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Pick an image from camera roll to edit picture" onPress={pickImage} disabled={uploading}/>
        </View>
         {uploading && (
          <View style={styles.uploadingContainer}
          ><Text style={styles.uploadingText}>Uploading...</Text>
          </View>)}
        <StatusBar style="auto" />
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
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    bottom: 200,
  },
  emailAndText: {
    fontSize: 25,
    fontFamily: 'Arial',
    marginBottom: 20,
    bottom: 150,
  },
  buttonContainer: {
    top: 200,
    alignSelf: 'center'
  }, 
  uploadingContainer: {
    position: 'absolute',  
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',        
    height: '100%',       
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  uploadingText: {
    color: '#fff',        
    fontSize: 20,         
    fontFamily: 'Arial',  
    
  },
});