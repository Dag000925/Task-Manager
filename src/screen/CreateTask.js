//import React, { useState } from 'react';
//import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal } from 'react-native';
//import PromptTask from './TaskInfo';

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


/* const Task = () => {
  const [tasks, setTask] = useState([]);

  const addTask = (title, description, notes) => {
    const counter = tasks.length;
    setTask([...tasks, {title, description, notes}]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <PromptTask addTask={addTask} />
        <Text style = {styles.sectionTitle}>Tasks</Text>
        <ScrollView>
          {tasks.map((task, key) => (
            <CreateTask 
              key={key} 
              title={task.title}
              description={task.description}
              notes={task.notes}
            />
          ))}
        </ScrollView>
      </View>
      <MainFile />
    </View>
  );
}

/* const CreateTask = (props) => {
    //const [properties, setProps] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const title = props.title;
    const description = props.description;
    const notes = props.notes;
    // const category = props.category;
    // const completed = props.completed;
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
                    <Text>{props.title}</Text>
                    <Text>{props.description}</Text>
                    <Text>{props.notes}</Text>
                    <Button 
                        title='Close'
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
            </Modal>
            <TouchableOpacity 
                style={styles.highPriorityItem} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.itemText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
} */
/*
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
        backgroundColor: '#818080',
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

export default Task;
*/