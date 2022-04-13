import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { MyButton, MyGap } from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Modalize } from 'react-native-modalize';
import { showMessage } from 'react-native-flash-message';
import { getData, storeData } from '../../utils/localStorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { sha1 } from 'react-native-sha1';

export default function Barang({ navigation, route }) {
  const item = route.params;
  navigation.setOptions({
    headerShown: false,
  });

  const isFocused = useIsFocused();

  const [jumlah, setJumlah] = useState(1);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        console.log('data user', res);
        setUser(res);
      });

      getData('token').then(tkn => {
        setToken(tkn.token);
        axios
          .post('https://carebptp.zavalabs.com/api/1_cart.php', {
            token: tkn.token
          })
          .then(res => {
            console.log('car', res.data);
            setCart(res.data);
          });

      });


    }
  }, [isFocused]);

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };



  const addToCart = () => {


    const kirim = {
      fid_barang: item.id,
      qty: jumlah,
      harga: item.harga_barang,
      total: jumlah * item.harga_barang,
      token: token
    };




    console.log('send to server', kirim);

    setCart(cart + 1);
    storeData('cart', cart + 1);

    axios.post('https://carebptp.zavalabs.com/api/1add_cart.php', kirim).then(x => {
      console.log('response : ', x)
    })











    modalizeRef.current.close();








  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          height: 50,
          // padding: 10,
          paddingRight: 10,
          backgroundColor: colors.primary,

          flexDirection: 'row',
        }}>
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="arrow-back" color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
            }}>
            {item.nama_barang}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {



            // storeData('myCart', [])
            navigation.navigate('Cart')
          }}
          style={{
            padding: 10,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="cart-outline" color={colors.white} />

          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.white,
              position: 'absolute',
              right: 0,
              top: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                fontSize: windowWidth / 35,
              }}>
              {cart}
            </Text>
          </View>

        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            aspectRatio: 1.5,
          }}
          source={{
            uri: item.foto,
          }}
        />

        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
          }}>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                color: colors.primary,
              }}>
              {item.nama_barang}
            </Text>
            <Text
              style={{
                marginVertical: 5,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.secondary,
              }}>
              Rp. {new Intl.NumberFormat().format(item.harga_barang)} / {item.uom_barang}
            </Text>

          </View>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 20,
                color: colors.secondary,
              }}>
              {item.jenis_barang}
            </Text>
          </View>
        </View>
      </View>

      <MyButton
        fontWeight="bold"
        radius={0}
        title="TAMBAH KERANJANG"
        warna={colors.primary}
        onPress={onOpen}
      />



      <Modalize
        withHandle={false}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        snapPoint={275}
        HeaderComponent={
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 100,
                    borderRadius: 20,
                    aspectRatio: 1,
                  }}
                  source={{ uri: item.foto }}
                />
              </View>
              <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.primary,
                  }}>
                  Rp. {new Intl.NumberFormat().format(item.harga_barang * jumlah)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <Icon type="ionicon" name="close-outline" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }
        withHandle={false}
        ref={modalizeRef}>
        <View style={{ flex: 1, height: windowWidth / 2 }}>
          <View style={{ padding: 10, flex: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                  }}>
                  Jumlah
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setJumlah(jumlah - 1);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    width: '30%',
                    borderRadius: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Icon type="ionicon" name="remove" color={colors.white} />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontSize: 16, fontFamily: fonts.secondary[600] }}>
                    {jumlah}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {

                    setJumlah(jumlah + 1);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    width: '30%',
                    borderRadius: 10,
                    marginLeft: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon type="ionicon" name="add" color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>


            <View style={{ marginTop: 15 }}>
              <TouchableOpacity
                onPress={addToCart}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  padding: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 22,
                    color: colors.white,
                  }}>
                  TAMBAH KERANJANG
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});