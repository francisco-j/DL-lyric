import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {requestFilesPermission, setupTrackplayer} from './app/providers/music';
import PermissionDenied from './app/components/PermissionDenied';
import PlayerControlls from './app/components/PlayerControlls';
import Screens from './app/screens';
import useGlobalState, {Context} from "./app/store/useGlobalState";

// globally add icons to use anywhere
import {library as fontAwesome} from '@fortawesome/fontawesome-svg-core';
import {faPause, faPlay, faEllipsisH, faStepForward, faStepBackward, faArrowLeft, faInfoCircle, faQuestion, faMusic, faSync, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons'
fontAwesome.add(faPause, faPlay, faEllipsisH, faStepForward, faStepBackward, faArrowLeft, faGithub, faInfoCircle, faQuestion, faMusic, faSync, faSpinner);

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
    async function asyncEffectBehavior() {
      let songs = await setupTrackplayer();
      store.globalDispatch({type: 'UPDATE_QUEUE', payload: songs})
    }

    if (permissionGranted) {
      asyncEffectBehavior()
      return () => TrackPlayer.destroy();
    }
  }, [permissionGranted]);

  if (permissionGranted === false)
    return <PermissionDenied />

  const store = useGlobalState()
  return (
    <Context.Provider value={store}>
      <SafeAreaView style={St.SafeAreaView}>
        <Screens />
        <PlayerControlls />
      </SafeAreaView>
    </Context.Provider>
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
