import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Task from '../screen/CreateTask';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Class from '../screen/Class'
import CreateTask from '../screen/CreateTask'
import Event from '../screen/Event'
import Log from '../screen/Log'
import Profile from '../screen/Profile'
//import TaskInfo from '../screen/TaskInfo'

import Ionicons from '@expo/vector-icons/Ionicons';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { User } from 'firebase/auth';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ProfileIcon = ({focused, color, size}) => <Ionicons name='md-body' size={size} color={color} />
const ClassIcon = ({focused, color, size}) => <Ionicons name='md-documents' size={size} color={color} />
const CreateTaskIcon = ({focused, color, size}) => <Ionicons name='md-calendar' size={size} color={color} />
const EventIcon = ({focused, color, size}) => <Ionicons name='md-bulb' size={size} color={color} />
const LogIcon = ({focused, color, size}) => <Ionicons name='md-log-in' size={size} color={color} />

export default function MainFile() {

  /* const [user, setUser] = useState<User | null>(null);
  const [initialRouteName, setInitialRouteName] = useState('Log');

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
      if (user) {
        // User is logged in, so change the initial route to 'MainMenu'
        setInitialRouteName('MainMenu');
      }
    });
  }, []); */
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="MainMenu">
                    {()=>(
                        <Drawer.Navigator>
                            <Drawer.Screen name="Profile" component={Profile} options={{drawerIcon:ProfileIcon}}/>
                            <Drawer.Screen name="Class" component={Class} options={{drawerIcon:ClassIcon}}/>
                            <Drawer.Screen name="CreateTask" component={CreateTask} options={{drawerIcon:CreateTaskIcon}}/>
                            <Drawer.Screen name="Event" component={Event} options={{drawerIcon:EventIcon}}/>
                            <Drawer.Screen name="Log" component={Log} options={{drawerIcon:LogIcon}}/>
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