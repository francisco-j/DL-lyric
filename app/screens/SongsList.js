import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// LyricVew - functional component
export default ({navigation}) => {
  return (
    <View style={[St.container, St.main]}>
      <Text style={St.text}>here goes the list of songs</Text>
      <TouchableOpacity
        style={St.btn}
        onPress={() =>{
          navigation.navigate('LyricVew')
        }}
      >
        <Text style={St.text}>go to lrc</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={St.btn}
        onPress={() =>{
          navigation.navigate('Info')
        }}
      >
        <Text style={St.text}>info</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={St.btn}
        onPress={() =>{
          navigation.navigate('Help')
        }}

        >
        <Text style={St.text}>help</Text>
      </TouchableOpacity>
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
  btn: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  text: {
    color: '#fff'
  },
});
