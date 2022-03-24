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
    Alert,
    ImageBackground,
} from 'react-native';
import { storeData, getData } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
export default function ({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Visimisi3');
        }, 1000)
    }, [])

    return (
        <ImageBackground source={require('../../assets/back.png')} style={{
            padding: 10,
            flex: 1,

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
            <View style={{ flex: 1 }}>

                <Text style={{
                    marginTop: 10,
                    fontFamily: fonts.primary[600],
                    fontSize: windowWidth / 17,
                    color: colors.black
                }}>Misi</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} />
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: windowWidth / 22,
                        left: 5,
                        textAlign: 'justify',
                        color: colors.black
                    }}>Mewujudkan ketahanan pangan dan gizi
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} />
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: windowWidth / 22,
                        left: 5,
                        textAlign: 'justify',
                        color: colors.black
                    }}>Meningkatkan Nilai Tambah dan Daya Saing Komoditas Pertanian
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} />
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: windowWidth / 22,
                        left: 5,
                        textAlign: 'justify',
                        color: colors.black
                    }}>Mewujudkan kesejahteraan petani
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Icon type="ionicon" name='checkbox' color={colors.primary} size={windowWidth / 22} />
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: windowWidth / 22,
                        left: 5,
                        textAlign: 'justify',
                        color: colors.black
                    }}>Mewujudkan Kementerian Pertanian yang transparan, akuntabel, profesional dan berintegritas tinggi
                    </Text>
                </View>

            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({})