import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {getLyricsFromFile} from '../providers/lyric';
import {useActiveLyric} from '../customHooks/lyrycs';

const LyricContainer = ({lrcFiePath}) => {
  const [loading, setLoading] = useState(true);
  const [lrcLines, setLlrcLines] = useState([]);
  const [activeLine] = useActiveLyric(lrcLines);

  useEffect(() => {
    if (!lrcFiePath) return setLoading(false);

    setLoading(true);
    getLyricsFromFile(lrcFiePath).then((arr) => {
      setLlrcLines(arr);
      setLoading(false);
    });
  }, [lrcFiePath]);

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

  if (!lrcFiePath) return <Text style={St.title}>-- no lyric --</Text>;
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

export default React.memo(LyricContainer);
