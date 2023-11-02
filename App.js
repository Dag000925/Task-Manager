import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import React from 'react';
import CreateTask from './components/CreateTask';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style = {styles.sectionTitle}>Tasks</Text>
        <ScrollView>
          <CreateTask title={'Finish Sprint 1'}/>
          <CreateTask title={'GUI Assignment 23'}/>
          <CreateTask title={'C & C++ Programming Assignment'}/>
          <CreateTask title={'Work out'}/>
          <CreateTask title={'Stats hw'}/>
          <CreateTask title={'Assignment E'}/>
          <CreateTask title={'Lab pack 8'}/>
          <CreateTask title={'Project Checkpoint 3'}/>
          <CreateTask title={'Sprint 2'}/>
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
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});
