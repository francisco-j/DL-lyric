import RNFS from 'react-native-fs';
import {splitPath} from '../utils';

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
    console.log(err.message, err.code);
    return [];
  }
};

/**
 * @param {string} path of the lyric file
 * @returns {string} content of the lrc file
 */
export const getLyricContent = async (path) => {
  if (!path) return '';

  try {
    let content = await RNFS.readFile(path);
    return content;
  } catch (err) {
    console.log(err.message, err.code);
    return '';
  }
};
