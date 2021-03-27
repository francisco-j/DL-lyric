import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {getLyricsFromFile} from '../providers/lyric';
import {useActiveLyric} from '../customHooks/lyrycs';
import {Picker} from '@react-native-picker/picker';

const LyricContainer = ({lrcFiePath, filesOptions, selectOption}) => {
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

  return (
    <View>
      <View style={St.pickerWraper}>
        <Picker
          dropdownIconColor='#ffffff'
          style={St.Picker}
          selectedValue={lrcFiePath}
          onValueChange={selectOption}>
          {filesOptions.map(opt => 
            <Picker.Item label={opt.name} value={opt.path} key={opt.path}/>
          )}
        </Picker>
      </View>
      <ScrollView>
        <View style={St.scrollPading} />
        {renderLines()}
        <View style={St.scrollPading} />
      </ScrollView>
    </View>
  );
};

const St = StyleSheet.create({
  scrollPading: {
    height: 135,
  },
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
  pickerWraper: {
    color: 'red',
    backgroundColor: '#000000',
    position: 'absolute',
    top: 5,
    right: 4,
    width: 120,
    height: 25,
    zIndex: 1,
  },
  Picker: {
    height: 25,
    color: 'white',
  },
});

export default React.memo(LyricContainer);
