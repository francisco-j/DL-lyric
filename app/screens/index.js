import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// screens
import SongsList from './SongsList';
import LyricVew from './Lyrics';
import Help from './Help';
import Info from './Info';

// LyricVew - functional component
export default () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
        }}>
          <Stack.Screen name="home" component={SongsList} />
          <Stack.Screen name="LyricVew" component={LyricVew}/>
          <Stack.Screen name="Help" component={Help}/>
          <Stack.Screen name="Info" component={Info}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const St = StyleSheet.create({
  main: {
    flex: 9,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
