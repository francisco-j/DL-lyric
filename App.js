import React, {useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MusicFiles, {Constants} from 'react-native-get-music-files-v3dev-test';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

// import fontawesome icons, only in app.js
// https://www.npmjs.com/package/@fortawesome/react-native-fontawesome
// https://fontawesome.com/icons?d=gallery&p=2&c=audio-video
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPause, faPlay, faCoffee} from '@fortawesome/free-solid-svg-icons';
library.add(faPause, faPlay, faCoffee);

const App = () => {
  const requestFilesPermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      console.log('permited', granted);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSongs = () =>
    MusicFiles.getAll({
      cover: false,
      batchSize: 0,
      batchNumber: 0,
      sortBy: Constants.SortBy.Title,
      sortOrder: Constants.SortOrder.Ascending,
    });

  const setupTrackplayer = async () => {
    try {
      let {length, songs} = await getAllSongs();
      songs = songs.map((song) => ({...song, url: song.path}));
      console.log('tracks: ', length);
      await TrackPlayer.setupPlayer();
      const desiredCapabilities = [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ];
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: desiredCapabilities,
        notificationCapabilities: desiredCapabilities,
        compactCapabilities: desiredCapabilities,
      });
      await TrackPlayer.add(songs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    requestFilesPermission();
    setupTrackplayer();
    console.log('mounted');

    return () => TrackPlayer.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={[styles.SafeAreaView, styles.fill]}>
        <View style={styles.container}>
          <View style={[styles.container, styles.fill]}>
            <Text style={styles.title}>ES lytic</Text>
          </View>
          <View style={styles.nusicData}>
            <Text style={styles.title}>artist - song</Text>
          </View>
          <View style={[styles.container, styles.fill]}>
            <Text style={styles.title}>EN lytic</Text>
          </View>
        </View>
        <View style={styles.playerControls}>
          <FontAwesomeIcon
            style={styles.FontAwesomeIcon}
            size={25}
            icon="pause"
          />
          <FontAwesomeIcon
            style={styles.FontAwesomeIcon}
            size={25}
            icon="coffee"
          />
          <FontAwesomeIcon
            style={styles.FontAwesomeIcon}
            size={25}
            icon="play"
          />
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
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    flex: 9,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nusicData: {
    backgroundColor: '#b0b0b0',
    width: '96%',
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
  btn: {
    borderRadius: 15,
    backgroundColor: 'red',
    width: 200,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  FontAwesomeIcon: {
    color: 'white',
  },
});

export default App;
