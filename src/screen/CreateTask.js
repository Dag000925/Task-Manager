import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal, ScrollView } from 'react-native';

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

    //convert and parse due date
    const due = new Date(props.dueDate);
    //for filtering
    props.dueDate = due;
    
    //FIXME 
    //formats a date object into a string without seconds and timezone
    const format = (date) => {
        dtString = date.toDateString() + ", ";
        dtString += (date.getHours() % 12) + 1;
        dtString += ":" + date.getMinutes();
        dtString += (date.getHours() > 11 ? "PM" : "AM");
        return dtString;
    }

    //format string for time remaining/overdue of task
    const difference = (time) => {
        days = Math.abs(Math.floor(time / (1000 * 60 * 60 * 24)));
        hours = Math.abs(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        minutes = Math.abs(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        ret = (time > 0 ? "Time Remaining: " : "Overdue: ");
        ret += (days > 0 ? days + " day(s) " : "");
        ret += (hours > 0 ? hours + " hour(s) " : "");
        ret += (minutes > 0 ? minutes + " minute(s)" : "");
        return ret;
    }
    
    //TODO - NOT YET IMPLEMENTED
    //save current for  cancelling edits
    const saveProps = props;
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
                    <Text>Due Date: {format(due)}</Text>
                    <Text>{difference(due - new Date())}</Text>
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