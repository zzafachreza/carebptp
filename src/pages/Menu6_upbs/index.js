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
        telepon: '',
        instansi: '',
        email: '',
        alamat: '',
        agroekosistem: '',
        luas_tanah: '',
        jenis_tanaman: '',
        tanaman_padi: '',
        tanaman_jagung: '',
        kelas_benih: '',
        kebutuhan_benih: '',
        waktu_dibutuhkan: '',
        transaksi_pembayaran: '',
        komentar: '',
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
        else if (data.telepon.length === 0) { showMessage({ message: 'Maaf telepon masih kosong !' }); }
        else if (data.instansi.length === 0) { showMessage({ message: 'Maaf instansi masih kosong !' }); }
        else if (data.email.length === 0) { showMessage({ message: 'Maaf email masih kosong !' }); }
        else if (data.alamat.length === 0) { showMessage({ message: 'Maaf alamat masih kosong !' }); }
        else if (data.agroekosistem.length === 0) { showMessage({ message: 'Maaf agroekosistem masih kosong !' }); }
        else if (data.luas_tanah.length === 0) { showMessage({ message: 'Maaf luas_tanah masih kosong !' }); }
        else if (data.jenis_tanaman.length === 0) { showMessage({ message: 'Maaf jenis_tanaman masih kosong !' }); }
        else if (data.tanaman_padi.length === 0) { showMessage({ message: 'Maaf tanaman_padi masih kosong !' }); }
        else if (data.tanaman_jagung.length === 0) { showMessage({ message: 'Maaf tanaman_jagung masih kosong !' }); }
        else if (data.kelas_benih.length === 0) { showMessage({ message: 'Maaf kelas_benih masih kosong !' }); }
        else if (data.kebutuhan_benih.length === 0) { showMessage({ message: 'Maaf kebutuhan_benih masih kosong !' }); }
        else if (data.waktu_dibutuhkan.length === 0) { showMessage({ message: 'Maaf waktu_dibutuhkan masih kosong !' }); }
        else if (data.transaksi_pembayaran.length === 0) { showMessage({ message: 'Maaf transaksi_pembayaran masih kosong !' }); }
        else if (data.komentar.length === 0) { showMessage({ message: 'Maaf komentar masih kosong !' }); }
        else {
            setLoading(true);
            console.log('kirim ke server : ', data)
            axios
                .post('https://carebptp.zavalabs.com/api/1add_upbs.php', data)
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

                <MyCarouser jenis='upbs' />


                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 17,
                    marginVertical: 10,
                }}>Unit Pengelola Benih Sumber</Text>

                <MyInput value={data.nama} onChangeText={x => setData({ ...data, nama: x, })} label='Nama' iconname='create-outline' />
                <MyInput value={data.telepon} keyboardType="number-pad" onChangeText={x => setData({ ...data, telepon: x, })} label='No. Telepon' iconname='create-outline' />
                <MyInput value={data.instansi} onChangeText={x => setData({ ...data, instansi: x, })} label='Instansi' iconname='create-outline' />
                <MyInput value={data.email} onChangeText={x => setData({ ...data, email: x, })} label='Email' iconname='create-outline' />
                <MyInput value={data.alamat} onChangeText={x => setData({ ...data, alamat: x, })} label='Alamat' iconname='create-outline' />
                <MyPicker
                    onValueChange={x =>

                        setData({
                            ...data,
                            agroekosistem: x,
                        })


                    }
                    iconname="list"
                    label="Agroekosistem"
                    data={[
                        {
                            label: 'Lahan Sawah',
                            value: 'Lahan Sawah',
                        },

                        {
                            label: 'Tadah Hujan/Ladang',
                            value: 'Tadah Hujan/Ladang',
                        },

                        {
                            label: 'Rawa',
                            value: 'Rawa',
                        },
                    ]}
                />


                <MyInput value={data.luas_tanah} onChangeText={x => setData({ ...data, luas_tanah: x, })} label='Luas Tanah' iconname='create-outline' />

                <MyPicker
                    onValueChange={x =>

                        setData({
                            ...data,
                            jenis_tanaman: x,
                        })


                    }
                    iconname="list"
                    label="Jenis Tanaman"
                    data={[
                        {
                            label: 'Padi',
                            value: 'Padi',
                        },

                        {
                            label: 'Jagung',
                            value: 'Jagung',
                        },

                        {
                            label: 'Kedelai',
                            value: 'Kedelai',
                        },
                    ]}
                />

                <MyPicker
                    onValueChange={x =>

                        setData({
                            ...data,
                            tanaman_padi: x,
                        })


                    }
                    iconname="list"
                    label="Varietas Tanaman Padi"
                    data={[
                        {
                            label: 'Inpari 43',
                            value: 'Inpari 43',
                        },

                        {
                            label: 'Inpari 40',
                            value: 'Inpari 40',
                        },

                        {
                            label: 'Inpago 12',
                            value: 'Inpago 12',
                        },
                    ]}
                />

                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka1(true);
                            setData({
                                ...data,
                                tanaman_jagung: '',
                            })
                        } else {
                            setBuka1(false);
                            setData({
                                ...data,
                                tanaman_jagung: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Varietas Tanaman Jagung"
                    data={[
                        {
                            label: 'Varietas Lamuru',
                            value: 'Varietas Lamuru',
                        },


                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />
                {buka1 && <MyInput value={data.tanaman_jagung} onChangeText={x => setData({ ...data, tanaman_jagung: x, })} label='Lainnya : ' iconname='create-outline' />}


                <MyPicker
                    onValueChange={x =>

                        setData({
                            ...data,
                            kelas_benih: x,
                        })


                    }
                    iconname="list"
                    label="Kelas Benih"
                    data={[
                        {
                            label: 'Benih Dasar (Label Putih)',
                            value: 'Benih Dasar (Label Putih)',
                        },

                        {
                            label: 'Benih Pokok (Label Ungu)',
                            value: 'Benih Pokok (Label Ungu)',
                        },

                        {
                            label: 'Benih Sebar (Label Biru)',
                            value: 'Benih Sebar (Label Biru)',
                        },
                    ]}
                />


                <MyPicker
                    onValueChange={x =>

                        setData({
                            ...data,
                            kebutuhan_benih: x,
                        })


                    }
                    iconname="list"
                    label="Kebutuhan Benih"
                    data={[
                        {
                            label: '5 kg',
                            value: '5 kg',
                        },

                        {
                            label: '25 kg',
                            value: '25 kg',
                        },

                        {
                            label: 'Benih Sebar (Label Biru)',
                            value: 'Benih Sebar (Label Biru)',
                        },
                    ]}
                />


                <MyInput value={data.waktu_dibutuhkan} onChangeText={x => setData({ ...data, waktu_dibutuhkan: x, })} label='Waktu dibutuhkan (Proses penyediaan benih satu minggu)' iconname='create-outline' />

                <MyPicker
                    onValueChange={x =>

                        setData({
                            ...data,
                            transaksi_pembayaran: x,
                        })


                    }
                    iconname="list"
                    label="Transaksi Pembayaran"
                    data={[
                        {
                            label: 'Tunai/Cash',
                            value: 'Tunai/Cash',
                        },

                        {
                            label: 'Transfer Bank (No Rek BRI)',
                            value: 'Transfer Bank (No Rek BRI)',
                        },


                    ]}
                />

                <MyInput value={data.komentar} onChangeText={x => setData({ ...data, komentar: x, })} label='Komentar dan Saran' iconname='create-outline' />






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