import React, {useContext}  from 'react';
import {StyleSheet, View, TouchableOpacity, Animated, Easing} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Song from '../components/Song';
import {Context} from "../store/useGlobalState";

// LyricVew - functional component
export default ({navigation}) => {
  const {globalState} = useContext(Context)
  
  spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  
  const renderSongs = () => globalState.queue.map(track =>
    <Song navigation={navigation} track={track} key={track.id}/>
  )

  const Loading = <Animated.View
    style={{
      transform: [{rotate: spin}],
      marginTop: 200
    }}
  >
    <FontAwesomeIcon
      style={{color: '#fff'}}
      size={26}
      icon="spinner"
    />
  </Animated.View>


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

      {globalState.loadingSongs ? Loading : renderSongs()}
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
