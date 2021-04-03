import React, {useContext}  from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Song from '../components/Song';
import {Context} from "../store/useGlobalState";

// LyricVew - functional component
export default ({navigation}) => {
  const {globalState} = useContext(Context)

  const renderSongs = () => globalState.queue.map(track =>
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
