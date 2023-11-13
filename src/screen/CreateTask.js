import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal, ScrollView } from 'react-native';

/*TODO 
    Fix modal styles
    Due date
    Editing
*/

export default CreateTask = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    //change the task style based on its priority
    let priority = styles.item;
    if (props.priority == 'high')
        priority = styles.highPriorityItem
    else if (props.priority == 'medium')
        priority = styles.mediumPriorityItem
    else if (props.priority == 'low')
        priority = styles.lowPriorityItem
    return (
        <View>
            <Modal
                animationType='slide'
                style={styles.centeredView}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
                <View style={styles.modalView}>
                    <Text style={styles.taskCategory}>{props.category}</Text>
                    <Text style={styles.taskTitle}>{props.title}</Text>
                    <Text style={styles.taskDescription}>{props.description}</Text>
                    <Text>{props.notes}</Text>
                    {/* <Text>
                        Due Date: {props.dueDate}
                        Time Remaining: {props.dueDate - (new Date())}
                    </Text> */}
                    <Button 
                        title='Close'
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
            </Modal>
            <TouchableOpacity 
                style={priority} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.itemText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
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
    item: {
        backgroundColor: '#808080',
        padding: 20,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 15,
    },
    itemText: {
        fontWeight: 'bold',
    },
    taskCategory: {
        fontSize: 24,
    },
    taskTitle: {
        fontSize: 28,
        textAlign: 'center'
    },
    taskDescription: {
        textAlign: 'left',
        justifyContent: 'flex-start'
    }
})