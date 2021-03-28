import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default () => {
  console.log('PermissionDenied')
  return (
    <View style={St.container}>
      <Text style={St.text}>oops...</Text>
      <Text style={St.text}>DL player requires special permitions.</Text>
      <Text style={St.text}>Enable app permitions on phone settings.</Text>
      <Text style={[St.text, {fontSize: 16}]}>{"\nsettings > apps > DL_player > app permitions"}</Text>
      <Text style={St.text}>{"\n\n\n\n"}you might need to fully close and reopen the app</Text>
    </View>
  )
}

const St = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: 'white',
    margin: 7,
    fontSize: 24,
    textAlign: 'center'
  }
});

