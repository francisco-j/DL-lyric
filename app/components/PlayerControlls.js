import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';
// docs: https://www.npmjs.com/package/@fortawesome/react-native-fontawesome
// icons: https://fontawesome.com/icons?d=gallery&p=2&c=audio-video
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default () => {
  const {position, duration} = useTrackPlayerProgress();
  const percentageProgress = `${(position * 100) / duration}%`;

  return (
    <>
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
    </>
  );
};

/** check:
 * https://thoughtbot.com/blog/structure-for-styling-in-react-native
 */
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 9,
    flexDirection: 'column',
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
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
  FontAwesomeIcon: {
    color: 'white',
  },
});
