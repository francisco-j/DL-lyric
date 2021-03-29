import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// LyricVew - functional component
export default ({navigation}) => {
  return (
    <View style={[St.container, St.main]}>
      <TouchableOpacity
        style={St.backBtn}
        onPress={() =>{
          navigation.goBack()
        }}
      >
        <FontAwesomeIcon
          style={St.icon}
          size={26}
          icon="arrow-left"
        />
      </TouchableOpacity>
      <Text style={St.text}>Help screen</Text>
    </View>
  );
};

const St = StyleSheet.create({
  main: {
    flex: 9,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 12,
    left: 10,
    height: 37,
    width: 37,
    borderRadius: 15,
    zIndex: 1,
  },
  icon: {
    color: 'white',
  },
  text: {
    color: '#fff'
  },
});
