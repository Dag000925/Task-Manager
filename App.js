import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import React from 'react';
import CreateTask from './src/screen/CreateTask';
import MainFile from './src/component/MainFile'


export default function App() {
  const [tasks, setTask] = useState([]);

  const addTask = (title, description, notes) => {
    const counter = tasks.length;
    setTask([...tasks, {title, description, notes}]);
  };
  return (
   <>
    <MainFile />
   </>
  );
}