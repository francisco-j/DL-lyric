import RNFS from 'react-native-fs';
import {splitPath} from '../utils';

export const getLyricFiles = (path) => {
  console.log({path});
  if (!path) return null;

  const {dirname, filename, extension} = splitPath(path);
  console.log({dirname, filename, extension});

  RNFS.readdir(dirname)
    .then((files) => {
      console.log('GOT RESULT', files);

      let regex = new RegExp(`${filename}.*\.lrc$`);
      let lyricFiles = files.filter((fName) => regex.test(fName));
      console.log({lyricFiles});

      return lyricFiles.length ? lyricFiles : null;
    })
    .catch((err) => {
      console.log(err.message, err.code);
      return null;
    });
};
