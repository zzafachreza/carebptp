import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { MyPicker, MyGap, MyInput, MyButton } from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { Image } from 'react-native';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import MyCarouser from '../../components/MyCarouser';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default function Tagrimart({ navigation, route }) {

    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(0);

    const getDataBarang = () => {

        axios
            .post('https://carebptp.zavalabs.com/api/barang.php')
            .then(res => {
                // console.log('barang', res.data);
                setData(res.data);
            });

        getData('cart').then(re => {
            setCart(re);
        })

    };

    useEffect(() => {
        if (isFocused) {
            getDataBarang();
        }
    }, [isFocused]);
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Barang', item)}
                activeOpacity={1.0}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.foto,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    }}>
                    <Text style={styles.subTitle}>{item.jenis_barang}</Text>
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            flex: 1,
                            paddingHorizontal: 5,
                            color: colors.black,
                        }}>
                        {item.nama_barang}
                    </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View
                        style={{
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,
                                color: colors.primary,
                            }}>
                            {' '}
                            Rp. {new Intl.NumberFormat().format(item.harga_barang)}
                        </Text>


                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                padding: 20,
                marginBottom: 10,
                backgroundColor: colors.primary,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1.
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 20
                    }}>Selamat Datang</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: windowWidth / 25
                    }}>Tagimart - Silahkan pilih produk dan lakukan checkout</Text>
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
            <ScrollView>
                <MyCarouser jenis='tagimart' />
                <View style={{
                    padding: 20,
                    marginBottom: 10,
                    backgroundColor: colors.primary
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: windowWidth / 25
                    }}>Silahkan Pilih produk</Text>
                </View>
                <FlatList
                    numColumns={2}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
    },
    card: {
        flex: 0.5,

        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginBottom: 20,

        marginHorizontal: 5,
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        aspectRatio: 1,
    },
    detailsContainer: {
        // padding: 10,
        flex: 1,
    },
    detailsContainerButton: {
        paddingHorizontal: 5,
    },
    title: {
        marginBottom: 7,
        fontFamily: fonts.secondary[800],
        fontSize: 15,
        color: colors.warning,
    },
    subTitle: {
        // flex: 1,
        // backgroundColor: 'red',
        paddingHorizontal: 5,
        fontFamily: fonts.secondary[400],
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 5,
    },
});