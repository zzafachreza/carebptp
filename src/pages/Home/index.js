import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  StatusBar,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyTerbaik2 from '../../components/MyTerbaik2';
import MyTerbaik3 from '../../components/MyTerbaik3';
import MyDashboard from '../../components/MyDashboard';
import PushNotification from 'react-native-push-notification';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [tipe, setTipe] = useState('');
  const [company, setCompany] = useState({});







  useEffect(() => {
    getData('user').then(users => {
      console.log(users);
      setUser(users);
    });


  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({ item, index }) => {
    return (
      <Image
        resizeMode="contain"
        source={{ uri: item.image }}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };

  const DataKategori = ({
    icon,
    nama,
    nama2,
    onPress,
    warna = colors.primary,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginVertical: 5,
          backgroundColor: warna,
          padding: 5,
          flex: 1,
          margin: 10,
          borderRadius: 10,
          height: windowHeight / 5,
          elevation: 5,
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.white}
            size={windowWidth / 6}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 32,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 32,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      // source={require('../../assets/back.png')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      {/* <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'transparent'}
      /> */}

      <ScrollView>
        {/* bagian untuk point dan redeem */}

        <View
          style={{
            height: windowHeight / 9,
            padding: 5,
            marginBottom: 5,
            backgroundColor: colors.white,
            flexDirection: 'row',
          }}>

          <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row' }}>
            <View style={{ paddingLeft: 10, flex: 2, }}>

              <Text
                style={{
                  fontSize: windowWidth / 30,
                  color: colors.black,
                  fontFamily: fonts.secondary[400],
                }}>
                Selamat datang, <Text
                  style={{
                    left: 10,
                    fontSize: windowWidth / 30,
                    color: colors.black,
                    fontFamily: fonts.secondary[600],
                  }}>
                  {user.nama_lengkap}
                </Text>
              </Text>

              <Text
                style={{

                  fontSize: windowWidth / 25,
                  color: colors.primary,
                  fontFamily: fonts.secondary[800],
                }}>
                CARE BPTP  <Text
                  style={{

                    fontSize: windowWidth / 25,
                    color: colors.secondary,
                    fontFamily: fonts.secondary[600],
                  }}>
                  Sulawesi Tengah
                </Text>
              </Text>



            </View>
            <View
              style={{
                padding: 10,
                justifyContent: 'center'

              }}>
              <Image
                source={require('../../assets/logo_utama.png')}
                style={{ width: windowWidth / 7, height: windowWidth / 7 }}
              />
            </View>

          </View>

        </View>

        <MyCarouser />

        {/* <MyDashboard tipe={tipe} /> */}

        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            marginTop: 5,
          }}>

          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu1_konsultasi')}
            icon="hardware-chip-outline"
            nama="Konsultasi dan Rekomendasi"
            nama2="Inovasi Teknologi Pertanian"
          />
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu2_lab')}
            icon="flask-outline"
            nama="Layanan"
            nama2="Uji Tanah dan Pupuk"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            marginTop: 5,
          }}>

          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu3_study')}
            icon="school-outline"
            nama="Layanan Study banding"
            nama2="dan kunjungan edukatif"
          />
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu4_magang')}
            icon="ribbon-outline"
            nama="Layanan Magang"
            nama2="PKL/Prakerin"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            marginTop: 5,
          }}>

          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu5_perpus')}
            icon="library-outline"
            nama="Layanan"
            nama2="Perpustakaan"
          />
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu6_upbs')}
            icon="file-tray-stacked-outline"
            nama="Layanan Penyediaan"
            nama2="Benih Sumber Melalui UPBS"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            marginTop: 5,
          }}>


          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu7_alat')}
            icon="cube-outline"
            nama="Layanan Peminjaman"
            nama2="Alat Mesin Pertanian"
          />
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu8_kebun')}
            icon="flower-outline"
            nama="Layanan"
            nama2="IP2TP"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            marginTop: 5,
          }}>


          {/* <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu9_pinjam')}
            icon="color-fill-outline"
            nama="Layanan Peminjaman"
            nama2="Alat Mesin Pertanian"
          /> */}
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu10_radio')}
            icon="radio-outline"
            nama="Layanan"
            nama2="Radio RCP-SIGI"
          />
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Menu11_kerjasama')}
            icon="search-outline"
            nama="Layanan"
            nama2="Kerjasama"
          />
        </View>


        {/*  */}

      </ScrollView>
    </ImageBackground>
  );
}
