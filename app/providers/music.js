import {PermissionsAndroid} from 'react-native';
import MusicFiles, {Constants} from 'react-native-get-music-files-v3dev-test';
import TrackPlayer from 'react-native-track-player';

/** private
 * @returns {Object[]} array of objetcts representing each file
 */
const getAllSongs = () =>
  MusicFiles.getAll({
    cover: false,
    batchSize: 0,
    batchNumber: 0,
    sortBy: Constants.SortBy.Title,
    sortOrder: Constants.SortOrder.Ascending,
  });

export const requestFilesPermission = async () => {
  try {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    console.log('permited', granted);
  } catch (err) {
    console.log(err);
  }
};

export const setupTrackplayer = async () => {
  try {
    let {length, results: songs} = await getAllSongs();
    console.log('tracks: ', length);

    songs = songs.map((song) => ({...song, url: song.path}));

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
