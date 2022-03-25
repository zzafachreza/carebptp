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
            navigation.navigate('Visimisi4')
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
                <View>
                    {/*  */}
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 17,
                        color: colors.black
                    }}>Tugas</Text>
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: windowWidth / 22,
                        textAlign: 'left',
                        color: colors.black
                    }}>Melaksanakan pengkajian, perakitan, pengembangan dan diseminasi teknologi pertanian tepat guna spesifik lokasi.
                    </Text>
                    {/*  */}
                </View>
            </TouchableOpacity>
            <View style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: 10,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Visimisi4')} style={{
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
