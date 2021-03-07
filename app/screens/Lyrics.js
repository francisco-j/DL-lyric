import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useCurrentTrack} from '../customHooks/track';
import {getSongName} from '../utils';
import {getLyricFiles} from '../providers/lyric';

// LyricVew - functional component
export default () => {
  const [currentSongOBJ] = useCurrentTrack();
  const lyricFiles = getLyricFiles(currentSongOBJ?.path);

  return (
    <View style={[St.container, St.main]}>
      <View style={[St.container]}>
        <Text style={St.title}>LR 1</Text>
      </View>
      <View style={St.nusicData}>
        <Text style={St.songName}>{getSongName(currentSongOBJ)}</Text>
        <FontAwesomeIcon
          style={St.FontAwesomeIcon}
          size={22}
          icon="ellipsis-h"
        />
      </View>
      <View style={[St.container]}>
        <Text style={St.title}>LR 2</Text>
      </View>
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
  nusicData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 1,
    backgroundColor: '#b0b0b0',
    width: '96%',
    borderRadius: 2,
  },
  progresBar: {
    display: 'flex',
    height: 4,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  progress: {
    height: '100%',
    backgroundColor: '#6e89f5',
  },
  playerControls: {
    display: 'flex',
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#575757',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  btnWraper: {
    padding: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  songName: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  FontAwesomeIcon: {
    color: 'white',
  },
});
