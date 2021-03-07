export function secondsToTimeString(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);

  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }

  return `${min}:${sec}`;
}

export const getSongName = (obj) => {
  // currentSong props: album, artist, duration, id, path, title, url
  if (!obj?.title && !obj?.artist) return '-';
  return `${obj.title || ''} - ${obj.artist || ''}`;
};
