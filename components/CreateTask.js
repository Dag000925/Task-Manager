import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateTask = (props) => {
    return (
        <View style = {styles.item}>
            <Text style={styles.itemText}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#dc143c',
        padding: 20,
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 15,
    },
    itemText: {
        fontWeight: 'bold',
    }
})

export default CreateTask;