import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signOut } from 'firebase/auth';


const LogOut = ({ navigation }) => {
    
    const handleLogOut = async () => {
        try {
            const auth = FIREBASE_AUTH;
            await signOut(auth);
            navigation.navigate('Log');
        } catch (error) {
            console.error('Error occurred:' + error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Button title="Log Out" onPress={handleLogOut}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogOut;