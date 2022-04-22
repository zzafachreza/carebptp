import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, storeData } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Account({ navigation, route }) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');

  const getWa = () => {
    axios.get('https://zavalabs.com/niagabusana/api/company.php').then(res => {
      setCom(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(user);
      });
      getWa();
    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('Login');
  };

  const kirimWa = x => {
    Linking.openURL(
      'https://api.whatsapp.com/send?phone=' +
      x +
      '&text=Halo%20NIAGA%20BUSANA',
    );
  };

  return (
    <SafeAreaView style={{ padding: 10, flex: 1, }}>

      <View style={{
        flex: 1
      }}>
        <View
          style={{
            marginVertical: 10,
            padding: 10,
            backgroundColor: colors.white,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.black,
            }}>
            Nama Pengguna
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.primary,
            }}>
            {user.nama_lengkap}
          </Text>
        </View>


        <View
          style={{
            marginVertical: 10,
            padding: 10,
            backgroundColor: colors.white,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.black,
            }}>
            Profesi
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.primary,
            }}>
            {user.profesi}
          </Text>
        </View>
        <MyGap jarak={10} />
        <MyButton
          onPress={btnKeluar}
          title="Keluar"
          colorText={colors.white}
          iconColor={colors.white}
          warna={colors.secondary}
          Icons="log-out-outline"
        />
      </View>







      <View style={{
        flex: 1
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}>
          <Text style={{
            fontSize: windowWidth / 20,
            fontFamily: fonts.secondary[600],
            color: colors.black
          }}>Kontak Kami</Text>
        </View>
        <MyButton onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=6281388038822')} Icons="logo-whatsapp" title="0813-8803-8822" warna={colors.primary} />
        <MyGap jarak={10} />
        <MyButton onPress={() => Linking.openURL('mailto:care.bptpsulawesitengah@gmail.com?subject=Hello%20Care%20BTPT')} Icons="mail-outline" title="care.bptpsulawesitengah@gmail.com" warna={colors.secondary} />
      </View>


    </SafeAreaView >
  );
}

const styles = StyleSheet.create({});
