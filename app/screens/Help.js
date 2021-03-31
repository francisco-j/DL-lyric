import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackBtn from '../components/BackBtn';

// LyricVew - functional component
export default ({navigation}) => {
  return (
    <View style={[St.container, St.main]}>
      <BackBtn navigation={navigation}/>
      <Text style={St.text}>Help screen</Text>
    </View>
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
  text: {
    color: '#fff'
  },
});
