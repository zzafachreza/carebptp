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
        nama: '',
        instansi: '',
        jenis_instansi: '',
        alamat: '',
        email: '',
        jenis_layanan: '',
        jenis_iklan: '',
        iklan_konmersial: '',
        iklan_nonkomersial: '',
        tarif_layanan: '',

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
        if (data.nama.length === 0) { showMessage({ message: 'Maaf nama masih kosong !' }); }
        else if (data.instansi.length === 0) { showMessage({ message: 'Maaf instansi masih kosong !' }); }
        else if (data.jenis_instansi.length === 0) { showMessage({ message: 'Maaf jenis_instansi masih kosong !' }); }
        else if (data.alamat.length === 0) { showMessage({ message: 'Maaf alamat masih kosong !' }); }
        else if (data.email.length === 0) { showMessage({ message: 'Maaf email masih kosong !' }); }
        else if (data.jenis_layanan.length === 0) { showMessage({ message: 'Maaf jenis_layanan masih kosong !' }); }
        else if (data.jenis_iklan.length === 0) { showMessage({ message: 'Maaf jenis_iklan masih kosong !' }); }
        else if (data.iklan_konmersial.length === 0) { showMessage({ message: 'Maaf iklan_konmersial masih kosong !' }); }
        else if (data.iklan_nonkomersial.length === 0) { showMessage({ message: 'Maaf iklan_nonkomersial masih kosong !' }); }
        else if (data.tarif_layanan.length === 0) { showMessage({ message: 'Maaf tarif_layanan masih kosong !' }); }
        else {
            setLoading(true);
            console.log('kirim ke server : ', data)
            axios
                .post('https://carebptp.zavalabs.com/api/1add_radio.php', data)
                .then(x => {
                    console.log('response server : ', x.data)

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

                <MyCarouser jenis='radio' />


                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 17,
                    marginVertical: 10,
                }}>Layanan Radio</Text>

                <MyInput value={data.nama} onChangeText={x => setData({ ...data, nama: x, })} label='Nama' iconname='create-outline' />
                <MyInput value={data.instansi} onChangeText={x => setData({ ...data, instansi: x, })} label='Nama Instansi' iconname='create-outline' />

                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka1(true);
                            setData({
                                ...data,
                                jenis_instansi: '',
                            })
                        } else {
                            setBuka1(false);
                            setData({
                                ...data,
                                jenis_instansi: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Jenis Instansi"
                    data={[
                        {
                            label: 'Perusahaan / Biro Iklan',
                            value: 'Perusahaan / Biro Iklan',
                        },
                        {
                            label: 'Perusahaan Media Massa',
                            value: 'Perusahaan Media Massa',
                        },
                        {
                            label: 'Organisasi',
                            value: 'Organisasi',
                        },
                        {
                            label: 'Instansi Pemerintah',
                            value: 'Instansi Pemerintah',
                        },


                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />
                {buka1 && <MyInput value={data.jenis_instansi} onChangeText={x => setData({ ...data, jenis_instansi: x, })} label='Lainnya : ' iconname='create-outline' />}

                <MyInput value={data.alamat} onChangeText={x => setData({ ...data, alamat: x, })} label='alamat' iconname='create-outline' />
                <MyInput value={data.email} onChangeText={x => setData({ ...data, email: x, })} label='email' iconname='create-outline' />

                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka2(true);
                            setData({
                                ...data,
                                jenis_layanan: '',
                            })
                        } else {
                            setBuka2(false);
                            setData({
                                ...data,
                                jenis_layanan: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Jenis Layanan"
                    data={[

                        {
                            label: 'Pengumuman / Himbauan',
                            value: 'Pengumuman / Himbauan',
                        },
                        {
                            label: 'Layanan Informasi',
                            value: 'Layanan Informasi',
                        },
                        {
                            label: 'Layanan Iklan',
                            value: 'Layanan Iklan',
                        },


                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />
                {buka2 && <MyInput value={data.jenis_layanan} onChangeText={x => setData({ ...data, jenis_layanan: x, })} label='Lainnya : ' iconname='create-outline' />}



                <MyPicker
                    onValueChange={x => {



                        setData({
                            ...data,
                            jenis_iklan: x,
                        })

                    }
                    }
                    iconname="list"
                    label="Jenis Iklan"
                    data={[

                        {
                            label: 'Komersial',
                            value: 'Komersial',
                        },

                        {
                            label: 'Non Komersial',
                            value: 'Non Komersial',
                        },
                    ]}
                />

                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka3(true);
                            setData({
                                ...data,
                                iklan_konmersial: '',
                            })
                        } else {
                            setBuka3(false);
                            setData({
                                ...data,
                                iklan_konmersial: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Iklan Komersial"
                    data={[
                        {
                            label: 'Spot Radio',
                            value: 'Spot Radio',
                        },
                        {
                            label: 'Adlibs Radio',
                            value: 'Adlibs Radio',
                        },
                        {
                            label: 'Time Signal Radio',
                            value: 'Time Signal Radio',
                        },
                        {
                            label: 'Insert Radio',
                            value: 'Insert Radio',
                        },
                        {
                            label: 'Talkshow Radio',
                            value: 'Talkshow Radio',
                        },

                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />
                {buka3 && <MyInput value={data.iklan_konmersial} onChangeText={x => setData({ ...data, iklan_konmersial: x, })} label='Lainnya : ' iconname='create-outline' />}

                <MyInput value={data.iklan_nonkomersial} onChangeText={x => setData({ ...data, iklan_nonkomersial: x, })} label='Iklan Non Komersial' iconname='create-outline' />
                <MyInput value={data.tarif_layanan} onChangeText={x => setData({ ...data, tarif_layanan: x, })} label='Tarif Jasa Layanan Iklan Tahun 2015 sesuai dengan PP No 5' iconname='create-outline' />











                <MyGap jarak={5} />

                <UploadFoto
                    onPress1={() => getCamera(1)}
                    onPress2={() => getGallery(1)}
                    label="Upload Foto Dokumen"
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
