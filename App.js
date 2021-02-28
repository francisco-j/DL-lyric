import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import TrackPlayer from 'react-native-track-player';

// docs: https://www.npmjs.com/package/@fortawesome/react-native-fontawesome
// icons: https://fontawesome.com/icons?d=gallery&p=2&c=audio-video
import {
  faPause,
  faPlay,
  faEllipsisH,
  faStepForward,
  faStepBackward,
} from '@fortawesome/free-solid-svg-icons';
import {library as fontAwesome} from '@fortawesome/fontawesome-svg-core';
fontAwesome.add(faPause, faPlay, faEllipsisH, faStepForward, faStepBackward);

import {requestFilesPermission, setupTrackplayer} from './app/providers/music';

import LyricVew from './app/screens/Lyrics';
import PlayerControlls from './app/components/PlayerControlls';

export default () => {
  // on mount
  useEffect(() => {
    requestFilesPermission();
    setupTrackplayer();
    console.log('mountedddd');

    return () => TrackPlayer.destroy();
  }, []);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.SafeAreaView}>
        <LyricVew />
        <PlayerControlls />
      </SafeAreaView>
    </>
  );
};

/** check:
 * https://thoughtbot.com/blog/structure-for-styling-in-react-native
 */
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
