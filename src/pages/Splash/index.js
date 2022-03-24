import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { color, asin } from 'react-native-reanimated';
import { getData, storeData } from '../../utils/localStorage';
import { PermissionsAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function Splash({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scaleLogo = new Animated.Value(0.1);
  const scaleLogo2 = new Animated.Value(0.1);
  const scaleText = new Animated.Value(100);

  Animated.timing(scaleLogo, {
    toValue: 1,
    duration: 1000,
  }).start();

  Animated.timing(scaleLogo2, {
    toValue: 2,
    duration: 1000,
  }).start();

  Animated.timing(scaleText, {
    toValue: 0,
    duration: 1000,
  }).start();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Untuk Akses Lokasi',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();

    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('MainApp');
        }, 1500);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View
        style={{
          flex: 1,
          paddingTop: windowHeight / 7,
          backgroundColor: colors.primary,
          justifyContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Image
            source={require('../../assets/logo_utama.png')}
            style={{
              resizeMode: 'contain',
              // resizeMode: 'center',

              height: 200,
              aspectRatio: scaleLogo,
            }}
          />
        </View>
        <Animated.View
          style={{
            top: scaleText,
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 7,
              color: colors.white,
              textAlign: 'center',
            }}>
            CARE BPTP
          </Text>
          <Text
            style={{
              fontFamily: fonts.tertiary[600],
              fontSize: windowWidth / 10,
              color: colors.tertiary,
              textAlign: 'center',
            }}>
            Sulawesi Tengah
          </Text>
          <Animated.Image
            source={require('../../assets/cek.png')}
            style={{
              resizeMode: 'contain',
              // resizeMode: 'center',

              height: 300,
              // width: 300,
              aspectRatio: scaleLogo2,
            }}
          />

        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: 250,
    height: 250,
  },
});
