import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTrackPlayerProgress} from 'react-native-track-player';
import {useCurrentTrack} from '../customHooks/track';
import {getSongName} from '../utils';
import {getLyricFiles} from '../providers/lyric';
// components
import LyricContainer from '../components/LyricContainer';

// LyricVew - functional component
export default () => {
  const [currentSongOBJ] = useCurrentTrack();
  const {position: seconds} = useTrackPlayerProgress(100);
  const milliseconds = seconds * 1000;
  const [lyricFiles, setLyricFiles] = useState([]);

  useEffect(() => {
    getLyricFiles(currentSongOBJ?.path).then(setLyricFiles);
  }, [currentSongOBJ]);

  return (
    <View style={[St.container, St.main]}>
      <View style={[St.container]}>
        <LyricContainer lrcFiePath={lyricFiles[0]} millisecond={milliseconds} />
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
        <LyricContainer lrcFiePath={lyricFiles[1]} millisecond={milliseconds} />
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
  songName: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  FontAwesomeIcon: {
    color: 'white',
  },
});
