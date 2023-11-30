import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signOut } from 'firebase/auth';


const LogOut = ({ navigation }) => {
    const [confirmVisible, setConfirmVisible] = useState(false);

    const handleLogOut = async () => {
        setConfirmVisible(true);
    };

    const confirmLogout = async () => {
        try {
            const auth = FIREBASE_AUTH;
            await signOut(auth);
            setConfirmVisible(false);
            navigation.navigate("Log");
        } catch (error) {
            console.error('Error occurred:' + error.message);
        }
    };
    const cancelLogout = () =>{
        setConfirmVisible(false);
    }
    return (
        <View style={styles.container}>
            <Button title="Log Out" onPress={handleLogOut}/>
            {confirmVisible && (
                <View style={styles.confirmationContainer}>
                    <Text>Are you sure you want to log out?</Text>
                    <Button title="Yes" onPress={confirmLogout} />
                    <Button title="No" onPress={cancelLogout} />
            </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmationContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
});

export default LogOut;