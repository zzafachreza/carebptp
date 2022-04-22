import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Modal from "react-native-modal";
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
        email: '',
        telepon: '',
        jenis_layanan: '',
        foto: '',

    });
    const [rating, setRating] = useState({
        nama_layanan: 'Layanan Kerjasama',
        rating1: '',
        rating2: '',
        rating3: '',
        nama_user: data.nama
    })
    const [vis, setVis] = useState(false);


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

        setRating({
            ...rating,
            nama_user: data.nama
        })


        if (data.nama.length === 0) { showMessage({ message: 'Maaf nama masih kosong !' }); }
        else if (data.email.length === 0) { showMessage({ message: 'Maaf email masih kosong !' }); }
        else if (data.telepon.length === 0) { showMessage({ message: 'Maaf telepon masih kosong !' }); }
        else if (data.jenis_layanan.length === 0) { showMessage({ message: 'Maaf jenis layanan masih kosong !' }); }
        else {
            setLoading(true);
            console.log('kirim ke server : ', data)
            axios
                .post('https://carebptp.zavalabs.com/api/1add_kerjasama.php', data)
                .then(x => {
                    console.log('response server : ', x)

                    setLoading(false);
                    showMessage({
                        type: 'success',
                        message: 'Data Kamu Berhasil Di Kirim'
                    })

                    setVis(true);
                });
        }


    };
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Modal isVisible={vis}>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    padding: 10
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginBottom: 10,
                    }}>
                        <TouchableOpacity onPress={() => setVis(false)} style={{
                            backgroundColor: colors.primary,
                            width: 50,
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 25,
                                color: colors.white
                            }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        textAlign: 'center',
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderBottomColor: '#CDCDCD'
                    }}>{rating.nama_layanan}</Text>
                    <MyGap jarak={10} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        textAlign: 'center',

                    }}>Mohon untuk mengisi survey kepuasan masyarakat  </Text>
                    <MyGap jarak={10} />

                    {/* Pertanyaan 1 */}
                    <View style={{
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text>1. </Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,

                            }}>Bagaimana Pendapat Saudara tentang persyaratan pelayanan dan jenis pelayanannya ?</Text>

                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating1: 'Tidak sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating1 == "Tidak sesuai" ? colors.primary : colors.white
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating1 == "Tidak sesuai" ? colors.white : colors.primary

                                }}>Tidak sesuai</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating1: 'Sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating1 == "Sesuai" ? colors.primary : colors.white
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating1 == "Sesuai" ? colors.white : colors.primary
                                }}>Sesuai</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating1: 'Kurang sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating1 == "Kurang sesuai" ? colors.primary : colors.white

                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating1 == "Kurang sesuai" ? colors.white : colors.primary

                                }}>Kurang sesuai</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    setRating({
                                        ...rating,
                                        rating1: 'Sangat sesuai'
                                    })
                                }
                                style={{
                                    width: windowWidth / 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    backgroundColor: rating.rating1 == "Sangat sesuai" ? colors.primary : colors.white
                                }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating1 == "Sangat sesuai" ? colors.white : colors.primary
                                }}>Sangat Sesuai</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* pertanyaan 1 */}


                    {/* Pertanyaan 2 */}
                    <View style={{
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text>2. </Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,

                            }}>Bagaimana Pemahaman Saudara tentang kemudahan prosedur pelayanan di unit ini ?</Text>

                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating2: 'Tidak sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating2 == "Tidak sesuai" ? colors.primary : colors.white
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating2 == "Tidak sesuai" ? colors.white : colors.primary

                                }}>Tidak sesuai</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating2: 'Sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating2 == "Sesuai" ? colors.primary : colors.white
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating2 == "Sesuai" ? colors.white : colors.primary
                                }}>Sesuai</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating2: 'Kurang sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating2 == "Kurang sesuai" ? colors.primary : colors.white

                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating2 == "Kurang sesuai" ? colors.white : colors.primary

                                }}>Kurang sesuai</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    setRating({
                                        ...rating,
                                        rating2: 'Sangat sesuai'
                                    })
                                }
                                style={{
                                    width: windowWidth / 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    backgroundColor: rating.rating2 == "Sangat sesuai" ? colors.primary : colors.white
                                }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating2 == "Sangat sesuai" ? colors.white : colors.primary
                                }}>Sangat Sesuai</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* pertanyaan 2 */}

                    {/* Pertanyaan 3 */}
                    <View style={{
                        paddingVertical: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text>3. </Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,

                            }}>Bagaimana pendapat Saudara tentang kecepatan waktu dalam memberikan pelayanan ?</Text>

                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating3: 'Tidak sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating3 == "Tidak sesuai" ? colors.primary : colors.white
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating3 == "Tidak sesuai" ? colors.white : colors.primary

                                }}>Tidak sesuai</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating3: 'Sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating3 == "Sesuai" ? colors.primary : colors.white
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating3 == "Sesuai" ? colors.white : colors.primary
                                }}>Sesuai</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <TouchableOpacity onPress={() =>
                                setRating({
                                    ...rating,
                                    rating3: 'Kurang sesuai'
                                })
                            } style={{
                                width: windowWidth / 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: rating.rating3 == "Kurang sesuai" ? colors.primary : colors.white

                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating3 == "Kurang sesuai" ? colors.white : colors.primary

                                }}>Kurang sesuai</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    setRating({
                                        ...rating,
                                        rating3: 'Sangat sesuai'
                                    })
                                }
                                style={{
                                    width: windowWidth / 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    backgroundColor: rating.rating3 == "Sangat sesuai" ? colors.primary : colors.white
                                }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: rating.rating3 == "Sangat sesuai" ? colors.white : colors.primary
                                }}>Sangat Sesuai</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* pertanyaan 3 */}
                </View>
                <MyButton title="Kirim survey" warna={colors.secondary} onPress={() => {
                    console.warn(rating)
                    axios.post('https://carebptp.zavalabs.com/api/1add_rating.php', rating).then(res => {
                        console.error(res.data);
                        alert('Terima kasih atas partisipasi Anda dalam survey ini');
                        setVis(false);
                        navigation.navigate('MainApp');
                    })

                }} radius={0} />
            </Modal>
            <ScrollView
                style={{
                    padding: 10,
                }}>

                <MyCarouser jenis='kerjasama' />


                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 17,
                    marginVertical: 10,
                }}>Layanan Kerjasama</Text>

                <MyInput value={data.nama} onChangeText={x => setData({ ...data, nama: x, })} label='Nama' iconname='create-outline' />
                <MyInput value={data.email} onChangeText={x => setData({ ...data, email: x, })} label='Email' iconname='create-outline' />
                <MyInput value={data.telepon} keyboardType="number-pad" onChangeText={x => setData({ ...data, telepon: x, })} label='No Whatsapp' iconname='create-outline' />
                <MyPicker
                    onValueChange={x => {


                        if (x == 'Lainnya') {
                            setBuka1(true);
                            setData({
                                ...data,
                                jenis_layanan: '',
                            })
                        } else {
                            setBuka1(false);
                            setData({
                                ...data,
                                jenis_layanan: x,
                            })
                        }
                    }
                    }
                    iconname="list"
                    label="Jenis Layanan"
                    value={data.jenis_layanan}
                    data={[

                        {
                            label: '',
                            value: '',
                        },


                        {
                            label: 'Kerjasama Penelitian',
                            value: 'Kerjasama Penelitian',
                        },

                        {
                            label: 'Narasumber',
                            value: 'Narasumber',
                        },
                        {
                            label: 'Pendampingan Teknologi',
                            value: 'Pendampingan Teknologi',
                        },

                        {
                            label: 'Lainnya',
                            value: 'Lainnya',
                        },
                    ]}
                />
                {buka1 && <MyInput value={data.jenis_layanan} onChangeText={x => setData({ ...data, jenis_layanan: x, })} label='Lainnya : ' iconname='create-outline' />}






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
