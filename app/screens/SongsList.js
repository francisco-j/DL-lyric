import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

// LyricVew - functional component
export default ({navigation}) => {
  return (
    <View style={[St.container, St.main]}>
      <Button
        title="go to lrc"
        onPress={() =>{
          navigation.navigate('LyricVew')
        }}
      />
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
});
