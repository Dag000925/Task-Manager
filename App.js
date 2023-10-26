import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CreatTask from './components/CreateTask';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style = {styles.sectionTitle}>Tasks</Text>
        <View style={styles.items}>      
          <CreatTask text={'Finish Sprint 1'}/>
          <CreatTask text={'GUI Assignment 23'}/>
          <CreatTask text={'C & C++ Programming Assignment'}/>
          <CreatTask text={'Work out'}/>
        </View>
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
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});
