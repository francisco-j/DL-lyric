import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackBtn from '../components/BackBtn';

// LyricVew - functional component
export default ({navigation}) => {
  return (
    <View style={[St.container]}>
      <BackBtn navigation={navigation}/>

      <Text style={{color: '#fff', fontSize: 36, marginTop: 50}}>
        Intuctions:
      </Text>

      <Text style={{color: '#fff', fontSize: 20, marginTop: 45}}>
        Songs must be locally stored on your device
      </Text>
      <Text style={{color: '#fff', fontSize: 20, marginTop: 70}}>
        Lyric files must be stored on same location as the corresponding song
      </Text>
      <Text style={{color: '#fff', fontSize: 20, marginTop: 70}}>
        Lyric file names must start with the name of the corresponding song, then a dot and language.
      </Text>
      <Text style={{color: '#fff', fontSize: 15}}>
        <Text style={{color: '#fff', fontSize: 18}}>
          Example:{"\n"}
        </Text>
        Song file name:  michael jackson - thriller.mp3{"\n"}
        Lyric file name: michael jackson - thriller.korean.lrc
      </Text>

    </View>
  );
};

const St = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515',
    alignItems: 'center',
    padding: 12
  },
  text: {
    color: '#fff'
  },
});
