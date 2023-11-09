import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Class from '../screen/Class'
import CreateTask from '../screen/CreateTask'
import Event from '../screen/Event'
import Log from '../screen/Log'
import Profile from '../screen/Profile'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.tasksWrapper}>
        
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

      </View> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="MainMenu">
                    {()=>(
                        <Drawer.Navigator>
                            <Drawer.Screen name="Profile" component={Profile}/>
                            <Drawer.Screen name="Class" component={Class}/>
                            <Drawer.Screen name="CreateTask" component={CreateTask}/>
                            <Drawer.Screen name="Event" component={Event}/>
                            <Drawer.Screen name="Log" component={Log}/>
                        </Drawer.Navigator>
                    )

                    }
                </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
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