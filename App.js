import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {faPause, faPlay, faEllipsisH, faStepForward, faStepBackward, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {library as fontAwesome} from '@fortawesome/fontawesome-svg-core';
import { NavigationContainer } from '@react-navigation/native';
import {requestFilesPermission, setupTrackplayer} from './app/providers/music';
import PermissionDenied from './app/components/PermissionDenied';
import PlayerControlls from './app/components/PlayerControlls';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// screens
import SongsList from './app/screens/SongsList';
import LyricVew from './app/screens/Lyrics';

// globally add icons to use anywhere
fontAwesome.add(faPause, faPlay, faEllipsisH, faStepForward, faStepBackward, faArrowLeft);

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


  const Stack = createStackNavigator();
  return (
    <SafeAreaView style={St.SafeAreaView}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen name="SongsList" component={SongsList} />
          <Stack.Screen 
            name="LyricVew"
            component={LyricVew}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}          
          />
        </Stack.Navigator>
      </NavigationContainer>
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
