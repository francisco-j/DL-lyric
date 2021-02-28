import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';
// docs: https://www.npmjs.com/package/@fortawesome/react-native-fontawesome
// icons: https://fontawesome.com/icons?d=gallery&p=2&c=audio-video
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

// import fontAwesome icons, only in app.js
import {
  faPause,
  faPlay,
  faEllipsisH,
  faStepForward,
  faStepBackward,
} from '@fortawesome/free-solid-svg-icons';
import {library as fontAwesome} from '@fortawesome/fontawesome-svg-core';
fontAwesome.add(faPause, faPlay, faEllipsisH, faStepForward, faStepBackward);

import {secondsToTimeString} from './app/utils';
import {requestFilesPermission, setupTrackplayer} from './app/providers/music';

const App = () => {
  const [currentSongIdStr, setcurrentSongIdStr] = useState(null);
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], (event) => {
    console.log('event.', event);
    setcurrentSongIdStr(event.nextTrack);
  });

  // on mount
  useEffect(() => {
    requestFilesPermission();
    setupTrackplayer();
    console.log('mounted');

    return () => TrackPlayer.destroy();
  }, []);

  const {position, duration} = useTrackPlayerProgress();
  const percentageProgress = `${(position * 100) / duration}%`;

  return (
    <>
      <StatusBar />
      <SafeAreaView style={[styles.SafeAreaView, styles.fill]}>
        <View style={styles.container}>
          <View style={[styles.container, styles.fill]}>
            <Text style={styles.title}>{secondsToTimeString(duration)}</Text>
          </View>
          <View style={styles.nusicData}>
            <Text style={styles.songName}>{currentSongIdStr}</Text>
            <FontAwesomeIcon
              style={styles.FontAwesomeIcon}
              size={22}
              icon="ellipsis-h"
            />
          </View>
          <View style={[styles.container, styles.fill]}>
            <Text style={styles.title}>{secondsToTimeString(position)}</Text>
          </View>
        </View>

        <View style={styles.progresBar}>
          <View style={[styles.progress, {width: percentageProgress}]} />
        </View>
        <View style={styles.playerControls}>
          <TouchableOpacity
            onPress={() => TrackPlayer.skipToPrevious()}
            style={styles.btnWraper}>
            <FontAwesomeIcon
              style={styles.FontAwesomeIcon}
              size={25}
              icon="step-backward"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => TrackPlayer.pause()}
            style={styles.btnWraper}>
            <FontAwesomeIcon
              style={styles.FontAwesomeIcon}
              size={25}
              icon="pause"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => TrackPlayer.play()}
            style={styles.btnWraper}>
            <FontAwesomeIcon
              style={styles.FontAwesomeIcon}
              size={25}
              icon="play"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => TrackPlayer.skipToNext()}
            style={styles.btnWraper}>
            <FontAwesomeIcon
              style={styles.FontAwesomeIcon}
              size={25}
              icon="step-forward"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

/** check:
 * https://thoughtbot.com/blog/structure-for-styling-in-react-native
 */
const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  SafeAreaView: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flex: 9,
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

export default App;
