import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackBtn from '../components/BackBtn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

// LyricVew - functional component
export default ({navigation}) => {
  return (
    <View style={[St.container]}>
      <BackBtn navigation={navigation}/>

      <Text style={{color: '#fff', fontSize: 30, marginBottom: 17, marginTop: 50}}>
        This app is an open source project developed by the community for the community
      </Text>
      <Text style={{color: '#fff', fontSize: 19, marginBottom: 5}}>
        Para reporte de errores y contribuciones vea el proyecto en github:
      </Text>
      <FontAwesomeIcon
        style={{color: 'white'}}
        size={31}
        icon={["fab", "github"]}
      />

      <Text style={{color: '#fff', fontSize: 20, marginTop: 85}}>
        Apps complementarias:
      </Text>
      <Text style={{color: '#fff', fontSize: 15}}>
        (sin afiliacion)
      </Text>

      <View style={[St.resourse]}>
        <Text style={{color: '#fff', fontSize: 15}}>
          https://www.lyricfinder.org/
        </Text>
      </View>
      <View style={[St.resourse]}>
        <Text style={{color: '#fff', fontSize: 15}}>
          play.google/apps?id=lyriceditor
        </Text>
      </View>

    </View>
  );
};

const St = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#151515',
    alignItems: 'center',
    padding: 12
  },
  resourse: {
    display: 'flex',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    height: 75,
    width: '100%',
    marginTop: 10
  },
});
