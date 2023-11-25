import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/component/MainFile';
//import AuthNavigator from './src/component/MainFile';

import Log from './src/screen/Log';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {userLoggedIn ? (
          <DrawerNavigator />
        ) : (
          <Log setUserLoggedIn={setUserLoggedIn} />
        )}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set the background color as needed
  },
});

export default App;
