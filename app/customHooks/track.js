import {useState} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';

// constants
const PLAYBACK_TRACK_CHANGED = TrackPlayerEvents.PLAYBACK_TRACK_CHANGED;

export const useCurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useTrackPlayerEvents([PLAYBACK_TRACK_CHANGED], async (event) => {
    if (!event?.nextTrack) return setCurrentTrack(null);

    let trackObj = await TrackPlayer.getTrack(event.nextTrack);
    if (!trackObj) return setCurrentTrack(null);

    return setCurrentTrack(trackObj);
  });

  const fireRefresh = async() => {
    const trackId = await TrackPlayer.getCurrentTrack();
    if (!trackId) return

    const trackObj = await TrackPlayer.getTrack(trackId);
    if (!trackObj) return setCurrentTrack(null);

    return setCurrentTrack(trackObj);
  }

  return [currentTrack, fireRefresh];
};
