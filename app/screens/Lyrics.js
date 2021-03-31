import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useCurrentTrack} from '../customHooks/track';
import {getSongName} from '../utils';
import {getLyricFiles} from '../providers/lyric';
// components
import LyricContainer from '../components/LyricContainer';
import BackBtn from '../components/BackBtn';

// Lyrics - functional component
export default ({navigation}) => {
  const [currentSongOBJ, fireCurrentSongRefresh] = useCurrentTrack();
  const [lyricFiles, setLyricFiles] = useState([]);
  const [firstLrc, setFirstLrc] = useState(null);
  const [secondLrc, setSecondLrc] = useState(null);

  useEffect(() => {
    fireCurrentSongRefresh()
  }, []);

  useEffect(() => {
    getLyricFiles(currentSongOBJ?.path).then((lrcFiles) => {
      setLyricFiles(lrcFiles)
      if (lrcFiles[0])
        setFirstLrc(lrcFiles[0].path)
      if (lrcFiles[1])
        setSecondLrc(lrcFiles[1].path)
    });
  }, [currentSongOBJ]);

  const changeLrc = (path, index) => {
    if (index === 0)
      setFirstLrc(path)
    else
      setSecondLrc(path)
  }

  return (
    <View style={[St.container, St.main]}>
      <BackBtn navigation={navigation}/>
      <View style={[St.container]}>
        <LyricContainer
          lrcFiePath={firstLrc}
          filesOptions={lyricFiles}
          selectOption={(lrcPath) => changeLrc(lrcPath, 0)} // react-native-picker method signature: (itemValue, itemIndex) => {}
        />
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
        <LyricContainer
          lrcFiePath={secondLrc}
          filesOptions={lyricFiles}
          selectOption={(lrcPath) => changeLrc(lrcPath, 1)} // react-native-picker method signature: (itemValue, itemIndex) => {}
        />
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
