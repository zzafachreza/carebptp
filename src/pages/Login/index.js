import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { storeData, getData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import CheckBox from '@react-native-community/checkbox';

export default function Login({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const [token, setToken] = useState('');
  const [data, setData] = useState({
    nama_lengkap: '',
    profesi: '',
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    if (data.nama_lengkap.length === 0 && data.profesi.length === 0) {
      showMessage({
        message: 'Maaf nama dan profesi masih kosong !',
      });
    } else if (data.nama_lengkap.length === 0) {
      showMessage({
        message: 'Maaf nama masih kosong !',
      });
    } else if (data.profesi.length === 0) {
      showMessage({
        message: 'Maaf profesi masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      setTimeout(() => {

        setLoading(false);
        storeData('user', data);
        navigation.replace('Visimisi');


      }, 1200);
    }
  };
  return (
    <ImageBackground source={require('../../assets/back.png')} style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 20,
        }}>
        <View
          style={{
            height: 220,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            padding: 10,
            borderRadius: 10,
          }}>
          <Image
            source={require('../../assets/logo_utama.png')}
            style={{
              width: 100,
              height: 100
            }}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 10,
              color: colors.primary,
              // maxWidth: 230,
              textAlign: 'center',
            }}>
            CARE BPTP
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 15,
              color: colors.secondary,
              // maxWidth: 230,
              textAlign: 'center',
            }}>
            Sulawesi Tengah
          </Text>
        </View>
        <View style={styles.page}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: colors.primary,
              // maxWidth: 230,
              // textAlign: 'center',
            }}>
            Silahkan Masukan Nama dan Profesi untuk masuk ke aplikasi
          </Text>

          <MyGap jarak={10} />
          <MyInput
            label="Masukan Nama"
            iconname="person"
            value={data.nama_lengkap}
            onChangeText={value =>
              setData({
                ...data,
                nama_lengkap: value,
              })
            }
          />

          <MyGap jarak={20} />
          <MyInput
            label="Masukan Profesi"
            iconname="business"
            onChangeText={value =>
              setData({
                ...data,
                profesi: value,
              })
            }
          />

          <View style={{

            paddingVertical: 5,
          }}>

            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: colors.black,
            }}>Kami berkomitmen untuk menjaga privasi semua pengguna aplikasi CARE BPTP.</Text>

          </View>

          <MyGap jarak={10} />
          {valid && (
            <MyButton
              warna={colors.primary}
              title="SIGN IN"
              Icons="log-in"
              onPress={masuk}
            />
          )}
        </View>
      </ScrollView>
      {
        loading && (
          <LottieView
            source={require('../../assets/animation.json')}
            autoPlay
            loop
            style={{ backgroundColor: colors.primary }}
          />
        )
      }
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: colors.white,
    padding: windowWidth / 25,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
