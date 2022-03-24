import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  Linking,
} from 'react-native';
import axios from 'axios';
import { fonts, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MyButton } from '../../components';
import { getData } from '../../utils/localStorage';

export default function ListDetail({ navigation, route }) {
  const item = route.params;
  navigation.setOptions({ title: item.kode });
  const [data, setData] = useState([]);

  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
    })
  }, [])

  const DataPesanan = () => {
    return (
      <ScrollView
        style={{
          backgroundColor: colors.white,
        }}>


        <Text
          style={{
            fontFamily: fonts.secondary[600],
            backgroundColor: colors.primary,
            padding: 10,
            color: colors.white,
          }}>
          Pengaduan
        </Text>
        {/* --- */}
        <View style={{ flexDirection: 'row' }}>

          <View
            style={{
              flex: 1,
            }}>
            <Image source={{ uri: item.foto_pengaduan }} style={{
              width: '100%',
              resizeMode: 'contain',
              aspectRatio: 1,
              // height: 200,
            }} />
          </View>
        </View>
        {/* ---- */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Tanggal dan Jam
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.tanggal_pengaduan} {item.jam_pengaduan}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Deskripsi
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.deskripsi_pengaduan}
            </Text>
          </View>
        </View>
        {/* --tindakan-- */}


        {item.status == "SUDAH DI TANGGAPI" && <><Text
          style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            backgroundColor: colors.tertiary,
            padding: 10,
            color: colors.black,
          }}>
          Tindakan
        </Text>
          {/* --- */}
          <View style={{ flexDirection: 'row' }}>

            <View
              style={{
                flex: 1,
              }}>
              <Image source={{ uri: item.foto_tindakan }} style={{
                width: '100%',
                resizeMode: 'contain',
                aspectRatio: 1,
                // height: 200,
              }} />
            </View>
          </View>
          {/* ---- */}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, padding: 10 }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  backgroundColor: colors.white,

                  color: colors.black,
                }}>
                Tanggal dan Jam
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flex: 2,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  backgroundColor: colors.white,
                  fontSize: 14,
                  padding: 10,
                  color: colors.black,
                }}>
                {item.tanggal_tindakan} {item.jam_tindakan}
              </Text>
            </View>
          </View>
          {/* ---- */}

          {/* --- */}
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: '#EEEEEE',
            }}>
            <View style={{ flex: 1, padding: 10 }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  backgroundColor: colors.white,

                  color: colors.black,
                }}>
                Deskripsi
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flex: 2,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  backgroundColor: colors.white,
                  fontSize: 14,
                  padding: 10,
                  color: colors.black,
                }}>
                {item.deskripsi_tindakan}
              </Text>
            </View>
          </View></>}



      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          fontFamily: fonts.secondary[600],
          backgroundColor: colors.white,
          padding: 10,
          textAlign: 'center',
          color: item.status == "SUDAH DI TANGGAPI" ? colors.primary : colors.secondary,
        }}>
        {item.status}
      </Text>
      <View style={{ flex: 1 }}>
        <DataPesanan />

        {item.status == "BELUM DI TANGGAPI" && user.tipe == "ADMIN" && <View style={{
          padding: 10,
        }}>
          <MyButton onPress={() => navigation.navigate('PengaduanUpdate', item)} title="TANGGAPI PENGADUAN" iconColor={colors.black} Icons="create-outline" warna={colors.tertiary} colorText={colors.black} />
        </View>}

        {item.status == "SUDAH DI TANGGAPI" && user.tipe == "ADMIN" && <View style={{
          padding: 10,
        }}>
          <MyButton onPress={() => {
            // navigation.navigate('PengaduanPrint', item)
            Linking.openURL('https://carebptp.zavalabs.com/survey/pengaduan_print?kode=' + item.kode);
          }} title="PRINT PENGADUAN" iconColor={colors.white} Icons="print-outline" warna={colors.secondary} colorText={colors.white} />
        </View>}

      </View>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: 20,
          backgroundColor: colors.white,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.warning,
          }}>
          Rp. {item.total}
        </Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
