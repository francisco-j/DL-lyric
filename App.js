import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';

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
  let [permissionGranted, setPermissionState] = useState(null)

  // on mount
  useEffect(() => {
    async function asyncEffectBehavior() {
      let perm = await requestFilesPermission();
      setPermissionState(perm)
    }

    console.log('mounted');
    asyncEffectBehavior()
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      setupTrackplayer();
      return () => TrackPlayer.destroy();
    }
  }, [permissionGranted]);

  if (permissionGranted === false)
    return (
      <View style={St.permissionError}>
        <Text style={St.permissionErrorText}>oops...</Text>
        <Text style={St.permissionErrorText}>DL player requires special permitions.</Text>
        <Text style={St.permissionErrorText}>Enable app permitions on phone settings.</Text>
        <Text style={[St.permissionErrorText, {fontSize: 16}]}>{"\n"}settings > apps > DL_player > app permitions</Text>
        <Text style={St.permissionErrorText}>{"\n\n\n\n"}you might need to fully close and reopen the app</Text>
      </View>
    )

  return (
    <>
      <StatusBar />
      <SafeAreaView style={St.SafeAreaView}>
        <LyricVew />
        <PlayerControlls />
      </SafeAreaView>
    </>
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
  permissionError: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  permissionErrorText: {
    color: 'white',
    margin: 7,
    fontSize: 24,
    textAlign: 'center'
  },
});
