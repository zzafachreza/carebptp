import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
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
export default function ({ navigation }) {
    const [data, setData] = useState({
        email: '',
        nama_group: '',
        instansi: '',
        alamat: '',
        telepon: '',
        materi_teknologi: '',
        tujuan: '',
        jumlah_peserta: '',
        foto: '',

    });
    const [loading, setLoading] = useState(false);
    const [buka1, setBuka1] = useState(false);
    const [buka2, setBuka2] = useState(false);
    const [buka3, setBuka3] = useState(false);
    const [date, setDate] = useState(new Date());
    const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');




    const options = {
        includeBase64: true,
        quality: 0.5,
        maxWidth: 1000,
        maxHeight: 1000,
    };

    const getCamera = xyz => {
        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                let source = { uri: response.uri };
                switch (xyz) {
                    case 1:
                        setData({
                            ...data,
                            foto: `data:${response.type};base64, ${response.base64}`,
                        });
                        setfoto(`data:${response.type};base64, ${response.base64}`);
                        break;
                }
            }
        });
    };

    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                let source = { uri: response.uri };
                switch (xyz) {
                    case 1:
                        setData({
                            ...data,
                            foto: `data:${response.type};base64, ${response.base64}`,
                        });
                        setfoto(`data:${response.type};base64, ${response.base64}`);
                        break;
                }
            }
        });
    };

    const UploadFoto = ({ onPress1, onPress2, label, foto }) => {
        return (
            <View
                style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    elevation: 2,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                    }}>
                    {label}
                </Text>
                <Image
                    source={{
                        uri: foto,
                    }}
                    style={{
                        width: '100%',
                        aspectRatio: 2,
                        resizeMode: 'contain',
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                        <MyButton
                            onPress={onPress1}
                            colorText={colors.white}
                            title="KAMERA"
                            warna={colors.primary}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                        <MyButton
                            onPress={onPress2}
                            title="GALLERY"
                            colorText={colors.white}
                            warna={colors.secondary}
                        />
                    </View>
                </View>
            </View>
        );
    };


    //   kirim ke server

    const kirim = () => {
        // setLoading(true);
        console.log('kirim to server', data);

        if (data.email.length === 0) { showMessage({ message: 'Maaf email masih kosong !' }); }
        else if (data.nama_group.length === 0) { showMessage({ message: 'Maaf nama_group masih kosong !' }); }
        else if (data.instansi.length === 0) { showMessage({ message: 'Maaf instansi masih kosong !' }); }
        else if (data.alamat.length === 0) { showMessage({ message: 'Maaf alamat masih kosong !' }); }
        else if (data.telepon.length === 0) { showMessage({ message: 'Maaf telepon masih kosong !' }); }
        else if (data.materi_teknologi.length === 0) { showMessage({ message: 'Maaf tujuan masih kosong !' }); }
        else if (data.tujuan.length === 0) { showMessage({ message: 'Maaf tujuan masih kosong !' }); }
        else if (data.jumlah_peserta.length === 0) { showMessage({ message: 'Maaf jumlah_peserta masih kosong !' }); }
        else if (data.foto.length === 0) { showMessage({ message: 'Maaf foto masih kosong !' }); }
        else {
            setLoading(true);
            console.log('kirim ke server : ', data)
            axios
                .post('https://carebptp.zavalabs.com/api/1add_study.php', data)
                .then(x => {
                    console.log('response server : ', x)

                    setLoading(false);
                    showMessage({
                        type: 'success',
                        message: 'Data Kamu Berhasil Di Kirim'
                    })

                    navigation.navigate('MainApp');
                });
        }


    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{
                    padding: 10,
                }}>

                <MyCarouser jenis='study' />


                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 17,
                    marginVertical: 10,
                }}>Layanan Study banding dan Kunjungan Edukatif</Text>

                <MyInput value={data.email} onChangeText={x => setData({ ...data, email: x, })} label='Email' iconname='create-outline' />
                <MyInput value={data.nama_group} onChangeText={x => setData({ ...data, nama_group: x, })} label='Nama/Group' iconname='create-outline' />
                <MyInput value={data.instansi} onChangeText={x => setData({ ...data, instansi: x, })} label='Instansi' iconname='create-outline' />
                <MyInput value={data.alamat} onChangeText={x => setData({ ...data, alamat: x, })} label='Alamat' iconname='create-outline' />
                <MyInput value={data.telepon} keyboardType="number-pad" onChangeText={x => setData({ ...data, telepon: x, })} label='No Whatsapp' iconname='create-outline' />
                <MyInput value={data.materi_teknologi} onChangeText={x => setData({ ...data, materi_teknologi: x, })} label='Materi yang dibutuhkan' iconname='create-outline' />


                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka2(true);
                            setData({
                                ...data,
                                tujuan: '',
                            })
                        } else {
                            setBuka2(false);
                            setData({
                                ...data,
                                tujuan: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Tujuan"
                    data={[
                        {
                            label: 'Studi Banding',
                            value: 'Studi Banding',
                        },
                        {
                            label: 'Kunjungan Edukatif',
                            value: 'Kunjungan Edukatif',
                        },
                        {
                            label: 'Pelatihan',
                            value: 'Pelatihan',
                        },



                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />
                {buka2 && <MyInput value={data.tujuan} onChangeText={x => setData({ ...data, tujuan: x, })} label='Lainnya : ' iconname='create-outline' />}


                <MyInput value={data.jumlah_peserta} onChangeText={x => setData({ ...data, jumlah_peserta: x, })} label='Jumlah Peserta' iconname='create-outline' />




                <MyGap jarak={5} />

                <UploadFoto
                    onPress1={() => getCamera(1)}
                    onPress2={() => getGallery(1)}
                    label="Upload Identitas / Dokumen"
                    foto={foto}
                />


                <MyGap jarak={20} />
                <MyButton
                    onPress={kirim}
                    title="KIRIM"
                    iconColor={colors.white}
                    Icons="cloud-upload-outline"
                    warna={colors.primary}
                    colorText={colors.white}
                />
                <MyGap jarak={20} />
            </ScrollView>
            {loading && (
                <LottieView
                    source={require('../../assets/animation.json')}
                    autoPlay
                    loop
                    style={{
                        flex: 1,
                        backgroundColor: colors.primary,
                    }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
