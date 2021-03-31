import {useState, useEffect} from 'react';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

const useInterval = (callback, delay) => {
  useEffect(() => {
    if (!delay) return;
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [delay, callback]);
};

export const useActiveLyric = (lrcLines) => {
  const [activeLine, setActiveLine] = useState(null);
  const trackState = usePlaybackState();

  const playing =
    trackState === TrackPlayer.STATE_PLAYING ||
    trackState === TrackPlayer.STATE_BUFFERING;

  const handleTik = async () => {
    const seconds = await TrackPlayer.getPosition();
    const millisecond = seconds * 1000;
    let active = null;

    for (let i = active || 0; i < lrcLines.length; i++) {
      // if condition can't be switched because millisecond is not continuous
      if (lrcLines[i].milliseconds <= millisecond) {
        active = i;
        continue;
      }
      else break;
    }

    if (activeLine !== active)
      setActiveLine(active);
  };

  useInterval(handleTik, playing ? 100 : null);

  return [activeLine];
};
