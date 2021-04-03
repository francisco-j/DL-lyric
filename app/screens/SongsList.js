import React, {useEffect, useState}  from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import TrackPlayer from 'react-native-track-player';
import Song from '../components/Song';

// LyricVew - functional component
export default ({navigation}) => {
  let [queue, setQueue] = useState([])

  const refreshQueue = async () => {
    let Q = await TrackPlayer.getQueue();
    setQueue(Q)
  }

  useEffect(() => {
    refreshQueue()
  }, []);

  const renderSongs = () => queue.map(track =>
    <Song navigation={navigation} track={track} key={track.id}/>
  )

  return (
    <View style={[St.container]}>
      <View style={[St.icons]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Info')}>
          <FontAwesomeIcon
            style={{color: 'white', marginHorizontal: 15}}
            size={26}
            icon="info-circle"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Help')}>
          <FontAwesomeIcon
            style={{color: 'white', marginHorizontal: 5}}
            size={26}
            icon="question"
          />
        </TouchableOpacity>
      </View>

      {renderSongs()}
      
      <TouchableOpacity
        onPress={refreshQueue}
        style={{marginTop: 100}}
      >
        <FontAwesomeIcon
          style={{color: 'white', marginHorizontal: 5}}
          size={26}
          icon="sync"
        />
      </TouchableOpacity>
    </View>
  );
};

const St = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20
  },
  text: {
    color: '#fff'
  },
});
