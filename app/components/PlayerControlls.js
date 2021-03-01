import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import TrackPlayer, {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {secondsToTimeString} from '../utils';

export default () => {
  const {position, duration} = useTrackPlayerProgress();
  const percentageProgress = `${(position * 100) / duration}%`;

  const [playing, setPlaying] = useState(false);
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
    setPlaying(
      event.state === TrackPlayer.STATE_PLAYING ||
      event.state === TrackPlayer.STATE_BUFFERING
    );
  });


  return (
    <>
      <View style={styles.progresBar}>
        <View style={[styles.progress, {width: percentageProgress}]} />
      </View>
      <View style={styles.timesBar}>
        <Text style={styles.time}>{secondsToTimeString(position)}</Text>
        <Text style={styles.time}>{secondsToTimeString(duration)}</Text>
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
          onPress={() => {
            playing ? TrackPlayer.pause() : TrackPlayer.play();
          }}
          style={styles.btnWraper}>
          <FontAwesomeIcon
            style={styles.FontAwesomeIcon}
            size={25}
            icon={playing ? 'pause' : 'play'}
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
    </>
  );
};

/** check:
 * https://thoughtbot.com/blog/structure-for-styling-in-react-native
 */
const styles = StyleSheet.create({
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
    backgroundColor: '#575757',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingTop: 8,
    paddingBottom: 24,
  },
  timesBar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#575757',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  time: {
    fontSize: 11,
    color: 'white',
  },
  btnWraper: {
    padding: 6,
  },
  FontAwesomeIcon: {
    color: 'white',
  },
});
