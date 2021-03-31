import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {library as fontAwesome} from '@fortawesome/fontawesome-svg-core';
import {requestFilesPermission, setupTrackplayer} from './app/providers/music';
import PermissionDenied from './app/components/PermissionDenied';
import PlayerControlls from './app/components/PlayerControlls';
import Screens from './app/screens';

// globally add icons to use anywhere
import {faPause, faPlay, faEllipsisH, faStepForward, faStepBackward, faArrowLeft, faInfoCircle, faQuestion} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons'
fontAwesome.add(faPause, faPlay, faEllipsisH, faStepForward, faStepBackward, faArrowLeft, faGithub, faInfoCircle, faQuestion);

export default () => {
  // refresh on reopen: https://stackoverflow.com/questions/59637462
  let [permissionGranted, setPermissionState] = useState(null)

  // on mount
  useEffect(() => {
    async function asyncEffectBehavior() {
      let perm = await requestFilesPermission();
      setPermissionState(perm)
    }
    asyncEffectBehavior()
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      setupTrackplayer();
      return () => TrackPlayer.destroy();
    }
  }, [permissionGranted]);

  if (permissionGranted === false)
    return <PermissionDenied />


  return (
    <SafeAreaView style={St.SafeAreaView}>
      <Screens />
      <PlayerControlls />
    </SafeAreaView>
  );
};

/** check:
 * https://thoughtbot.com/blog/structure-for-styling-in-react-native
 */
const St = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
