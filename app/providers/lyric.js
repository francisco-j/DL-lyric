import RNFS from 'react-native-fs';
import {splitPath} from '../utils';
const LYRIC_REGEX = /^\[\d\d:\d\d.\d\d\]/;

/**
 * @param {string} path of the song, inluding path and filename
 * @returns array of paths to the corresponding lyrics
 */
export const getLyricFiles = async (path) => {
  if (!path) return [];

  const {dirname: basePath, filename} = splitPath(path);

  try {
    let files = await RNFS.readdir(basePath);

    let lrcRegex = new RegExp(`${filename}.*.lrc$`);
    let matchingFiles = files.filter((fileName) => lrcRegex.test(fileName));
    return matchingFiles.map((lrFileName) => basePath + lrFileName);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const isValidLyricString = (line) =>
  line && line.length && LYRIC_REGEX.test(line);

const lrStringToObject = (line, index) => {
  const milliseconds =
    line.substring(1, 3) * 60000 + // minutes
    line.substring(4, 6) * 1000 + // seconds
    line.substring(7, 9) * 10; // hundredths of sec

  const text = line.substring(10);

  return {
    id: index,
    milliseconds,
    text,
  };
};

/**
 * @param {string} filePath path to the lyric file
 * @returns {object[]} array of lrc objects
 */
export const getLyricsFromFile = async (filePath) => {
  if (!filePath) return [];

  try {
    const content = await RNFS.readFile(filePath);
    let Lyrics = content
      .split('\n')
      .filter(isValidLyricString)
      .map(lrStringToObject);

    return Lyrics;
  } catch (err) {
    console.log(err);
    return [];
  }
};
