import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { storeData, getData } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import MyButton from '../../components/MyButton';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataBarang();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = () => {
    getData('user').then(res => {

      if (res.tipe == "ADMIN") {
        axios
          .post('https://carebptp.zavalabs.com/api/1pengaduan_admin.php', {
            id_user: res.id,
          })
          .then(x => {
            console.log(x.data);
            setData(x.data);
          });
      } else {
        axios
          .post('https://carebptp.zavalabs.com/api/1pengaduan.php', {
            id_user: res.id,
          })
          .then(x => {
            console.log(x.data);
            setData(x.data);
          });
      }

    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ListDetail', item)}
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        elevation: 1,
        flexDirection: 'row'
      }}>
      <Image source={{ uri: item.foto_pengaduan }} style={{ width: 100, height: 100 }} />

      <View style={{
        paddingLeft: 10,
        flex: 1,
      }}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            fontSize: windowWidth / 28
          }}>
            Kode
          </Text>
          <Text style={{

            fontFamily: fonts.secondary[400],
            color: colors.black,
            fontSize: windowWidth / 28
          }}>
            {item.kode}
          </Text>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            fontSize: windowWidth / 28
          }}>
            Tanggal dan Jam Pengaduan
          </Text>
          <Text style={{

            fontFamily: fonts.secondary[400],
            color: colors.black,
            fontSize: windowWidth / 28
          }}>
            {item.tanggal_pengaduan} Pukul {item.jam_pengaduan}
          </Text>
        </View>
        <View style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: item.status == "SUDAH DI TANGGAPI" ? colors.primary : colors.secondary
        }}>
          <Icon type='ionicon' name={item.status == "SUDAH DI TANGGAPI" ? 'shield-checkmark' : 'close-circle'} color={colors.white} />
          <Text style={{
            left: 5,
            fontFamily: fonts.secondary[600],
            color: colors.white,
            fontSize: windowWidth / 28
          }}>{item.status}</Text>
        </View>
      </View>

    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        style={{
          padding: 10,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

      </ScrollView>
      <MyButton onPress={() => Linking.openURL('https://carebptp.zavalabs.com/survey/laporan')} title="PRINT LAPORAN PENGADUAN" warna={colors.secondary} Icons="print" radius={0} />
    </>
  );
}

const styles = StyleSheet.create({});
