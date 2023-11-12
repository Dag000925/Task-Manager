import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal, ScrollView } from 'react-native';
import PromptTask from './PromptTask';
import CreateTask from './CreateTask';

export default function TaskView() {
  const [tasks, setTask] = useState([]);

  const addTask = (title, description, notes) => {
    setTask([...tasks, { title, description, notes }]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <PromptTask addTask={addTask} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9370db',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
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