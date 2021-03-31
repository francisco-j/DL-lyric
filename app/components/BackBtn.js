import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TouchableOpacity} from 'react-native';

// BackBtn - functional component
export default ({navigation}) => {
  return (
    <TouchableOpacity
      style={St.backBtn}
      onPress={navigation.goBack}
    >
      <FontAwesomeIcon
        style={{color: 'white'}}
        size={26}
        icon="arrow-left"
      />
    </TouchableOpacity>
  )
}

const St = StyleSheet.create({
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
  }
});

