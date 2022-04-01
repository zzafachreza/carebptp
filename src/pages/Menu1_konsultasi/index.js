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
        nama: '',
        instansi: '',
        alamat: '',
        info_dibutuhkan: '',
        pengguna_informasi: '',
        jenis_dokumen: '',
        hal_konsultasi: '',
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

        if (data.nama.length === 0) {
            showMessage({
                message: 'Maaf nama masih kosong !',
            });
        } else if (data.email.length === 0) {
            showMessage({
                message: 'Maaf nama masih kosong !',
            });
        } else if (data.instansi.length === 0) { showMessage({ message: 'Maaf instansi masih kosong !' }); }
        else if (data.alamat.length === 0) { showMessage({ message: 'Maaf alamat masih kosong !' }); }
        else if (data.info_dibutuhkan.length === 0) { showMessage({ message: 'Maaf info_dibutuhkan masih kosong !' }); }
        else if (data.pengguna_informasi.length === 0) { showMessage({ message: 'Maaf pengguna_informasi masih kosong !' }); }
        else if (data.jenis_dokumen.length === 0) { showMessage({ message: 'Maaf jenis_dokumen masih kosong !' }); }
        else if (data.hal_konsultasi.length === 0) { showMessage({ message: 'Maaf hal_konsultasi masih kosong !' }); }
        else if (data.foto.length === 0) { showMessage({ message: 'Maaf foto masih kosong !' }); }
        else {
            setLoading(true)
            axios
                .post('https://carebptp.zavalabs.com/api/1add_konsultasi.php', data)
                .then(x => {

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

                <MyCarouser jenis='konsul' />

                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 17,
                    marginVertical: 10,
                }}>Konsultasi dan Rekomendasi Inovasi Teknologi Pertanian</Text>

                <MyInput value={data.email} onChangeText={x => setData({ ...data, email: x, })} label='Email' iconname='create-outline' />
                <MyInput value={data.nama} onChangeText={x => setData({ ...data, nama: x, })} label='Nama' iconname='create-outline' />
                <MyInput value={data.instansi} onChangeText={x => setData({ ...data, instansi: x, })} label='Instansi' iconname='create-outline' />
                <MyInput value={data.alamat} onChangeText={x => setData({ ...data, alamat: x, })} label='Alamat' iconname='create-outline' />

                <MyPicker
                    onValueChange={x => {

                        if (x == 'Lainnya') {
                            setBuka1(true);
                            setData({
                                ...data,
                                info_dibutuhkan: '',
                            })

                        } else {
                            setBuka1(false);
                            setData({
                                ...data,
                                info_dibutuhkan: x,
                            })

                        }
                    }
                    }
                    iconname="list"
                    label="Informasi Yang Dibutuhkan"
                    data={[
                        {
                            label: 'Budidaya Tanaman',
                            value: 'Budidaya Tanaman',
                        },
                        {
                            label: 'Peternakan',
                            value: 'Peternakan',
                        },
                        {
                            label: 'Teknologi Pasca Panen',
                            value: 'Teknologi Pasca Panen',
                        },
                        {
                            label: 'Sosial Ekonomi Pertanian',
                            value: 'Sosial Ekonomi Pertanian',
                        },
                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />

                {buka1 && <MyInput value={data.info_dibutuhkan} onChangeText={x => setData({ ...data, info_dibutuhkan: x, })} label='Lainnya : ' iconname='create-outline' />}

                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka2(true);
                            setData({
                                ...data,
                                pengguna_informasi: '',
                            })
                        } else {
                            setBuka2(false);
                            setData({
                                ...data,
                                pengguna_informasi: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Pengguna Informasi"
                    data={[
                        {
                            label: 'Penelitian',
                            value: 'Penelitian',
                        },
                        {
                            label: 'Skripsi',
                            value: 'Skripsi',
                        },
                        {
                            label: 'Disertasi',
                            value: 'Disertasi',
                        },
                        {
                            label: 'Karya Tulis Ilmiah',
                            value: 'Karya Tulis Ilmiah',
                        },
                        {
                            label: 'Karya Tulis Populer',
                            value: 'Karya Tulis Populer',
                        },


                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />

                {buka2 && <MyInput value={data.pengguna_informasi} onChangeText={x => setData({ ...data, pengguna_informasi: x, })} label='Lainnya : ' iconname='create-outline' />}

                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka3(true);
                            setData({
                                ...data,
                                jenis_dokumen: '',
                            })
                        } else {
                            setBuka3(false);
                            setData({
                                ...data,
                                jenis_dokumen: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Jenis dokumen yang diinginkan"
                    data={[
                        {
                            label: 'Artikel Majalah',
                            value: 'Artikel Majalah',
                        },
                        {
                            label: 'Artikel Jurnal',
                            value: 'Artikel Jurnal',
                        },
                        {
                            label: 'Brosur/Booklet',
                            value: 'Brosur/Booklet',
                        },
                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },

                    ]}
                />


                {buka3 && <MyInput value={data.jenis_dokumen} onChangeText={x => setData({ ...data, jenis_dokumen: x, })} label='Lainnya : ' iconname='create-outline' />}
                <MyInput value={data.hal_konsultasi} multiline onChangeText={x => setData({ ...data, hal_konsultasi: x, })} label='Jika ada hal yang ingin dikonsultasikan, silahkan mengisi kolom berikut :' iconname='create-outline' />



                <MyGap jarak={5} />

                <UploadFoto
                    onPress1={() => getCamera(1)}
                    onPress2={() => getGallery(1)}
                    label="Upload Surat Permohonan"
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
