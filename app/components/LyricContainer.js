import React, {useCallback, useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Lrc} from 'react-native-lrc';
import {getLyricContent} from '../providers/lyric';

export default ({lrcFiePath, time}) => {
  if (!lrcFiePath) return <Text style={St.title}>-- no lyric --</Text>;

  const [lrc, setLrc] = useState('[00:00.00]loading...');
  useEffect(() => {
    getLyricContent(lrcFiePath).then((cont) => {
      setLrc(cont);
    });
  }, [lrcFiePath]);

  const lineRenderer = useCallback(
    ({lrcLine: {content}, active}) => (
      <Text style={[St.lrcLyne, active ? St.active : null]}>{content}</Text>
    ),
    [],
  );

  return (
    <Lrc
      lrc={lrc}
      lineHeight={45}
      activeLineHeight={60}
      lineRenderer={lineRenderer}
      currentTime={time}
    />
  );
};

const St = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  lrcLyne: {
    fontSize: 19,
    textAlign: 'center',
    color: '#8f8f8f',
  },
  active: {
    fontSize: 24,
    color: 'white',
  },
});
