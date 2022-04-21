import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';

import { getData, storeData } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton, MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts, windowWidth } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Cart({ navigation, route }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [buka, setbuka] = useState(true);
  const [tipe, setTipe] = useState('DI ANTAR');
  const [alamat, setAlamat] = useState('');

  const isFocused = useIsFocused();
  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    if (isFocused) {

      getData('token').then(res => {
        __getDataBarang(res.token);
      });

      getData('user').then(rx => {
        console.log(rx)
        setUser(rx);
      });

    }
  }, [isFocused]);

  const __getDataBarang = (zz) => {
    axios.post('https://carebptp.zavalabs.com/api/cart.php', {
      token: zz
    }).then(x => {
      setData(x.data);
    })

  }

  const hanldeHapus = (x) => {
    axios.post('https://carebptp.zavalabs.com/api/cart_hapus.php', {
      id_cart: x
    }).then(x => {
      getData('token').then(tkn => {
        __getDataBarang(tkn.token);
        axios
          .post('https://carebptp.zavalabs.com/api/1_cart.php', {
            token: tkn.token
          })
          .then(res => {
            console.log('car', res.data);
            setCart(res.data);
          });
      });

      getData('cart').then(xx => {
        storeData('cart', xx - 1)
      })
    })
  };




  var sub = 0;
  data.map((item, key) => {
    sub += parseFloat(item.total);

    console.log(sub);
  });

  const __renderItem = ({ item, index }) => {
    return (
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                hanldeHapus(item.id)

              }}>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  //   backgroundColor: 'blue',
                  // padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="ionicon"
                  name="trash"
                  size={40}
                  color={colors.danger}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        }}>
        <View
          style={{
            marginVertical: 10,
            borderRadius: 10,
            padding: 10,
            elevation: 2,
            backgroundColor: colors.white,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              resizeMode="contain"
              style={{
                width: 70,
                borderRadius: 20,
                aspectRatio: 1,
              }}
              source={{ uri: item.foto }}
            />
            <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 30,
                }}>
                {item.nama_barang}
              </Text>

              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  flex: 1,
                  fontSize: windowWidth / 30,
                }}>
                {new Intl.NumberFormat().format(item.harga)} x {item.qty}
              </Text>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.warning,
                    fontSize: windowWidth / 25,
                  }}>
                  {new Intl.NumberFormat().format(item.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <View style={{ padding: 10, flex: 1 }}>
        <FlatList data={data} renderItem={__renderItem} />
      </View>
      <View style={{
        padding: 10,
      }}>
        <MyPicker
          onValueChange={x => {

            () => setTipe(x);

            if (x == "AMBIL DITEMPAT") {
              setAlamat('Ambil Produk Ke Lokasi');
              setbuka(false);
            } else {
              setAlamat('');
              setbuka(true);
            }
          }
          }
          iconname="list"
          label="Jenis Pengiriman"
          data={[
            {
              label: 'DI ANTAR',
              value: 'DI ANTAR',
            },
            {
              label: 'AMBIL DITEMPAT',
              value: 'AMBIL DITEMPAT',
            },
          ]}
        />
        {buka &&

          <MyInput label="Alamat Pengiriman" multiline onChangeText={val => setAlamat(val)} value={alamat} />
        }

      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: windowWidth / 20,
              fontFamily: fonts.secondary[600],
              color: colors.black,
              left: 10,
            }}>
            Rp. {new Intl.NumberFormat().format(sub)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {

            getData('token').then(res => {


              axios.post('https://carebptp.zavalabs.com/api/wa.php', {
                token: res.token,
                nama: user.nama_lengkap,
                profesi: user.profesi,
                tipe: tipe,
                alamat: alamat
              }).then(rr => {
                console.log(rr.data)
                Linking.openURL(rr.data);
              })


            });



          }}
          style={{

            backgroundColor: colors.primary,
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
          <Icon type='ionicon' name="logo-whatsapp" color={colors.white} size={windowWidth / 20} />
          <Text
            style={{
              fontSize: windowWidth / 20,
              left: 5,
              fontFamily: fonts.secondary[600],
              color: colors.white,

            }}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
