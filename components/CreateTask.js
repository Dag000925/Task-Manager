import React  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Input } from '@rneui/themed';

export const placeholders = {
    title: "Title",
    description: "Description",
    
}

const CreateTask = (props) => {
    const title = props.title;
    const description = props.description;
    const category = props.category;
    const completed = props.completed;
    return (
        <TouchableOpacity>
            <View style = {styles.highPriorityItem} >
                <Text style={styles.itemText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    highPriorityItem: {
        backgroundColor: '#dc143c',
        padding: 20,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 15,
    },
    mediumPriorityItem: {
        backgroundColor: '#f69709',
        padding: 20,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 15,
    },
    lowPriorityItem: {
        backgroundColor: '#2eb82e',
        padding: 20,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 15,
    },
    itemText: {
        fontWeight: 'bold',
    },
})

export default CreateTask;