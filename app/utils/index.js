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

/**
 * @typedef {Object} SplitPath
 * @property {string} dirname
 * @property {string} filename
 * @property {string} extension
 * @property {string} params
 */
/**
 * The ultimate split path. source: https://gist.github.com/nopjia/e94b5f822744b60cd106
 * Extracts dirname, filename, extension, and trailing URL params.
 * @param  {string} path
 * @return {SplitPath} Object containing fields "dirname", "filename", "extension", and "params"
 */
export const splitPath = (path) => {
  let [dirname = '', filename = '', extension = '', params = ''] = path
    .replace(/\\/g, '/')
    .match(/(.*\/)?(\..*?|.*?)(\.[^.]*?)?(#.*$|\?.*$|$)/)
    .slice(1);

  return {
    dirname,
    filename,
    extension,
    params,
  }
};
