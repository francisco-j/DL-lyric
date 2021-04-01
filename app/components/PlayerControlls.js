import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
} from 'react-native-track-player';
import Slider from 'react-native-sliders';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {secondsToTimeString} from '../utils';
import { navigate } from '../screens/rootNavigation';

export default () => {
  const {position, duration} = useTrackPlayerProgress(100);
  const [sliding, setSliding] = useState(false);

  const trackState = usePlaybackState();
  const playing =
    trackState === TrackPlayer.STATE_PLAYING ||
    trackState === TrackPlayer.STATE_BUFFERING;

  const dropSlider = ([secondsValue]) => {
    setSliding(false);
    TrackPlayer.seekTo(secondsValue);
  };

  return (
    <>
      <Slider
        style={St.slider}
        trackStyle={St.trackStyle}
        thumbStyle={St.thumbStyle}
        thumbTouchSize={{width: 60, height: 50}}
        value={sliding ? null : position}
        maximumValue={duration || 100}
        minimumTrackTintColor="#6e89f5"
        onSlidingStart={() => setSliding(true)}
        onSlidingComplete={dropSlider}
        // debugTouchArea
      />
      <View style={St.timesBar}>
        <Text style={St.time}>{secondsToTimeString(position)}</Text>
        <Text style={St.time}>{secondsToTimeString(duration)}</Text>
      </View>

      <View style={St.playerControls}>
        <TouchableOpacity
          onPress={() => navigate('LyricVew')}
          style={[St.btnWraper, St.floatingIcon]}>
          <FontAwesomeIcon
            style={St.FontAwesomeIcon}
            size={20}
            icon="music"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => TrackPlayer.skipToPrevious()}
          style={St.btnWraper}>
          <FontAwesomeIcon
            style={St.FontAwesomeIcon}
            size={25}
            icon="step-backward"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            playing ? TrackPlayer.pause() : TrackPlayer.play();
          }}
          style={St.btnWraper}>
          <FontAwesomeIcon
            style={St.FontAwesomeIcon}
            size={25}
            icon={playing ? 'pause' : 'play'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => TrackPlayer.skipToNext()}
          style={St.btnWraper}>
          <FontAwesomeIcon
            style={St.FontAwesomeIcon}
            size={25}
            icon="step-forward"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const St = StyleSheet.create({
  slider: {
    width: '100%',
    position: 'absolute',
    bottom: 84,
    marginBottom: -18,
    zIndex: 10,
    backgroundColor: null,
  },
  trackStyle: {
    borderRadius: 0,
  },
  thumbStyle: {
    height: 10,
    width: 2,
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
    backgroundColor: '#575757',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingTop: 6,
    paddingBottom: 24,
  },
  timesBar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#575757',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingHorizontal: 3,
  },
  time: {
    fontSize: 11,
    color: 'white',
  },
  btnWraper: {
    padding: 6,
  },
  floatingIcon: {
    padding: 6,
    color: 'white',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  FontAwesomeIcon: {
    color: 'white',
  },
});
