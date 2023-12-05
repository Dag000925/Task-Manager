import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/component/MainFile';

import Log from './src/screen/Log';
import SignUpScreen from './src/screen/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const AuthStack = createStackNavigator();
  const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName='Log' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Log">
        {props => <Log {...props} setUserLoggedIn={setUserLoggedIn} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp">
        {props => <SignUpScreen {...props} setUserLoggedIn={setUserLoggedIn} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {userLoggedIn ? (
          <DrawerNavigator onLogout={handleLogout}/>
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;