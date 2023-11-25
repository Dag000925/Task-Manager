import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Course from '../screen/Course'
import TaskView from '../screen/TaskView';
import Event from '../screen/Event'
import Log from '../screen/Log'
import Profile from '../screen/Profile'
import LogOut from '../screen/LogOut'

import Ionicons from '@expo/vector-icons/Ionicons';
import PromptTask from '../screen/PromptTask';
// import { onAuthStateChanged } from 'firebase/auth';
// import { FIREBASE_AUTH } from '../../FirebaseConfig';
// import { User } from 'firebase/auth';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ProfileIcon = ({focused, color, size}) => <Ionicons name='md-body' size={size} color={color} />
const CourseIcon = ({focused, color, size}) => <Ionicons name='md-documents' size={size} color={color} />
const CreateTaskIcon = ({focused, color, size}) => <Ionicons name='md-calendar' size={size} color={color} />
const EventIcon = ({focused, color, size}) => <Ionicons name='md-bulb' size={size} color={color} />
const LogIcon = ({focused, color, size}) => <Ionicons name='md-log-in' size={size} color={color} />

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerIcon: ProfileIcon }}
      />
      <Drawer.Screen
        name="Course"
        component={Course}
        options={{ drawerIcon: CourseIcon }}
      />
      <Drawer.Screen
        name="Tasks"
        component={TaskView}
        options={{ drawerIcon: CreateTaskIcon }}
      />
      <Drawer.Screen
        name="Event"
        component={Event}
        options={{ drawerIcon: EventIcon }}
      />
      <Drawer.Screen
        name="Log Out"
        component={()=> <LogOut navigation={navigation}/>}
        options={{ drawerIcon: LogIcon }}
      />
    </Drawer.Navigator>
  );
};

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

export default DrawerNavigator;