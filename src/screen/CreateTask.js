import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CreateTask from './components/CreateTask';
import PromptTask from './components/TaskInfo';

export default function App() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9370db',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flex: 1
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});