import React, {useCallback, useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {getLyricsFromFile} from '../providers/lyric';

export default ({lrcFiePath, millisecond}) => {
  if (!lrcFiePath) return <Text style={St.title}>-- no lyric --</Text>;

  const [loading, setLoading] = useState(true);
  const [lrcLines, setLlrcLines] = useState([]);
  const [activeLine, setActiveLine] = useState(null);

  useEffect(() => {
    if (!lrcFiePath) return setLoading(false);

    setLoading(true);
    getLyricsFromFile(lrcFiePath).then((arr) => {
      setLlrcLines(arr);
      setLoading(false);
    });
  }, [lrcFiePath]);

  useEffect(() => {
    let active = null;

    for (let i = 0; i < lrcLines.length; i++) {
      // if condition can't be switched because millisecond is not continuous
      if (lrcLines[i].milliseconds <= millisecond) {
        active = i;
        continue;
      }
      else break;
    }

    setActiveLine(active);
  }, [lrcLines, millisecond]);

  const renderLines = () => {
    console.log('renderLines(');
    return lrcLines.map((line) => {
      let style = line.id === activeLine ? [St.lrcLyne, St.active] : St.lrcLyne;
      return (
        <Text style={style} key={line.id}>
          {line.text}
        </Text>
      );
    });
  };

  if (loading) return <Text style={St.title}>loading ...</Text>;

  return <ScrollView>{renderLines()}</ScrollView>;
};

const St = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  lrcLyne: {
    marginVertical: 3,
    marginHorizontal: 2,
    fontSize: 19,
    textAlign: 'center',
    color: '#8f8f8f',
  },
  active: {
    fontSize: 24,
    color: 'white',
  },
});
