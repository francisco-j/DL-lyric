import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';

// BackBtn - functional component
export default ({navigation, track}) => {
  return (
    <View style={St.container}>
      <TouchableOpacity
        style={St.backBtn}
        onPress={() => {
          TrackPlayer.skip(track.id)
          TrackPlayer.play()
          navigation.navigate('LyricVew')
        }}
      >
        <FontAwesomeIcon
          style={{color: 'white', margin: 10}}
          size={40}
          icon="play"
        />
      </TouchableOpacity>
      <View style={St.info}>
        <Text style={St.title}>{track.title || 'unknown'}</Text>
        <Text style={St.artist}>{track.artist || 'unknown'}</Text>
      </View>
    </View>
  )
}

const St = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    width: '100%'
  },
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
  artist: {
    color: 'white',
    fontSize: 16,
  },
});

