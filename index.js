import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// docs: https://react-native-track-player.js.org/
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

// register the playback service
TrackPlayer.registerPlaybackService(() => require('./service.js'));
