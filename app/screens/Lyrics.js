import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
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

import {secondsToTimeString} from '../utils';

// LyricVew component
export default () => {
  const [currentSongIdStr, setcurrentSongIdStr] = useState(null);
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], (event) => {
    console.log('event.', event);
    setcurrentSongIdStr(event.nextTrack);
  });

  const {position, duration} = useTrackPlayerProgress();

  return (
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
  );
};

/** check:
 * https://thoughtbot.com/blog/structure-for-styling-in-react-native
 */
const styles = StyleSheet.create({
  fill: {
    flex: 1,
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
