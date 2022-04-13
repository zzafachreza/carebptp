import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    Image,
    Animated,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { color, asin } from 'react-native-reanimated';
import { getData, storeData } from '../../utils/localStorage';
import { PermissionsAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';

export default function ({ navigation }) {
    const Panjang = new Animated.Value(0);
    const [buka, setBuka] = useState(false);


    Animated.timing(Panjang, {
        toValue: windowWidth,
        duration: 2000,
    }).start(val => {
        if (val.finished) {
            navigation.navigate('Visimisi3')
        }
    });





    useEffect(() => {

    }, []);

    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            // paddingHorizontal: 10,
            flex: 1,

        }}>
            <Animated.View style={{
                width: Panjang,
                height: 10,
                backgroundColor: colors.border
            }} />
            <TouchableOpacity activeOpacity={1} onPress={() => {

                Animated.timing(Panjang).stop();






            }} style={{
                flex: 1,
                padding: 10,
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,

                }}>
                    <Image source={require('../../assets/logo_utama.png')} style={{
                        width: 100,
                        height: 100,
                    }} />
                </View>
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 20,
                        color: colors.black
                    }}>Visi</Text>
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: windowWidth / 25,
                        textAlign: 'justify',
                        color: colors.black
                    }}>Menjadi Lembaga penyedia dan penyebar teknologi pertanian spesifik lokasi untuk mendukung pembangunan pertanian yang Tangguh dan peningkatan kesejahteraan masyarakat petani Provinsi Sulawesi Tengah
                    </Text>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 20,
                        color: colors.black
                    }}>Misi</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: windowWidth / 25,
                            color: colors.black
                        }}>1.</Text>
                        {/* <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} /> */}
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: windowWidth / 22,
                            left: 5,
                            flex: 1,
                            textAlign: 'justify',
                            color: colors.black
                        }}>Mewujudkan Upaya Regionalisasi Dan Desentralisasi kegiatan pengkajian berdasarkan keragaman agroekosistem wilayah
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: windowWidth / 25,
                            color: colors.black
                        }}>2.</Text>
                        {/* <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} /> */}
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: windowWidth / 25,
                            left: 5,
                            flex: 1,
                            textAlign: 'justify',
                            color: colors.black
                        }}>Mendorong Percepatan Pembangunan Pertanian dalam mendukung ketahanan pangan yang berorientasi agribisnis
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: windowWidth / 25,
                            color: colors.black
                        }}>3.</Text>
                        {/* <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} /> */}
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: windowWidth / 22,
                            left: 5,
                            flex: 1,
                            textAlign: 'justify',
                            color: colors.black
                        }}>Mengidentifikasi Umpan Balik bagi manajemen pengguna pengkajian di wilayah Sulawesi Tengah
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: windowWidth / 25,
                            color: colors.black
                        }}>4.</Text>
                        {/* <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} /> */}
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: windowWidth / 22,
                            left: 5,
                            flex: 1,
                            textAlign: 'justify',
                            color: colors.black
                        }}>Mempercepat Transfer Teknologi Kepada Pengguna dengan memperkuat keterpaduan antar peneliti, penyuluh dan pengguna
                        </Text>
                    </View>


                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://sulteng.litbang.pertanian.go.id/ind/index.php/profil/misi-visi')} style={{
                padding: 10,
                // backgroundColor: colors.primary,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 22,
                    textAlign: 'left',
                    color: colors.secondary,
                    right: 5,
                }}>Selengkapnya</Text>
                <Icon type='ionicon' name='open-outline' color={colors.secondary} size={windowWidth / 22} />
            </TouchableOpacity>

            <View style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: 10,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Visimisi3')} style={{
                    padding: 10,
                    // backgroundColor: colors.primary,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 22,
                        textAlign: 'left',
                        color: colors.primary,
                        right: 5,
                    }}>Selanjutnya</Text>
                    <Icon type='ionicon' name='arrow-forward-outline' color={colors.primary} size={windowWidth / 22} />
                </TouchableOpacity>
            </View>

        </ImageBackground >
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
