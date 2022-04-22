import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Modal from "react-native-modal";
import { MyPicker, MyGap, MyInput, MyButton } from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { Image } from 'react-native';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import MyCarouser from '../../components/MyCarouser';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import { Icon } from 'react-native-elements';
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
        telepon: '',

        foto: '',

    });

    const [rating, setRating] = useState({
        nama_layanan: 'Layanan Radio RCP-SIGI',
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

    const [path, setPath] = useState('');

    //   kirim ke server

    const kirim = async () => {
        // setLoading(true);

        setRating({
            ...rating,
            nama_user: data.nama
        })


        // console.log('kirim to server', data);
        if (data.nama.length === 0) { showMessage({ message: 'Maaf nama masih kosong !' }); }
        else if (data.instansi.length === 0) { showMessage({ message: 'Maaf instansi masih kosong !' }); }
        else if (data.jenis_instansi.length === 0) { showMessage({ message: 'Maaf jenis instansi masih kosong !' }); }
        else if (data.alamat.length === 0) { showMessage({ message: 'Maaf alamat masih kosong !' }); }
        else if (data.email.length === 0) { showMessage({ message: 'Maaf email masih kosong !' }); }
        else if (data.jenis_layanan.length === 0) { showMessage({ message: 'Maaf jenis layanan masih kosong !' }); }
        else if (data.telepon.length === 0) { showMessage({ message: 'Maaf telepon masih kosong !' }); }
        // else if (data.jenis_iklan.length === 0) { showMessage({ message: 'Maaf jenis_iklan masih kosong !' }); }
        // else if (data.iklan_konmersial.length === 0) { showMessage({ message: 'Maaf iklan_konmersial masih kosong !' }); }
        // else if (data.iklan_nonkomersial.length === 0) { showMessage({ message: 'Maaf iklan_nonkomersial masih kosong !' }); }
        // else if (data.tarif_layanan.length === 0) { showMessage({ message: 'Maaf tarif_layanan masih kosong !' }); }
        else {
            // setLoading(true);
            // console.log('kirim ke server : ', data);

            const formData = new FormData();
            formData.append('nama', data.nama);
            formData.append('instansi', data.instansi);
            formData.append('jenis_instansi', data.jenis_instansi);
            formData.append('alamat', data.alamat);
            formData.append('email', data.email);
            formData.append('jenis_layanan', data.jenis_layanan);
            formData.append('nama_pdf', path.name);
            formData.append('file_attachment', path);

            // console.log(formData);

            let zavalabs = await fetch(
                'https://carebptp.zavalabs.com/api/1add_radio.php',
                {
                    method: 'post',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data; ',
                    },
                }
            );

            // let responseJson = await zavalabs.json();
            console.error(zavalabs);

            showMessage({
                type: 'success',
                message: 'Data Kamu Berhasil Di Kirim'
            })

            setVis(true);
            // axios
            //     .post('https://carebptp.zavalabs.com/api/1add_radio.php', { data: formData }, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     })
            //     .then(x => {
            //         console.log('response server : ', x.data)

            //         // setLoading(false);

            //     });


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

                <MyCarouser jenis='radio' />


                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 17,
                    marginVertical: 10,
                }}>Layanan Radio RCP-SIGI</Text>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,

                }}>
                    <TouchableOpacity onPress={() => Linking.openURL('http://rcpsulteng.caster.fm/')} style={{
                        backgroundColor: colors.secondary,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 10,

                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[400],
                            fontSize: windowWidth / 25,
                            color: colors.white,
                        }}>klik disini untuk mendengarkan streaming kami</Text>
                        <Icon type='ionicon' name='wifi-outline' color={colors.white} size={windowWidth / 25} />
                    </TouchableOpacity>
                </View>
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
                    value={data.jenis_instansi}
                    data={[

                        {
                            label: '',
                            value: '',
                        },
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
                <MyInput value={data.telepon} keyboardType="number-pad" onChangeText={x => setData({ ...data, telepon: x, })} label='No Whatsapp' iconname='create-outline' />
                {/* <MyPicker
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
 */}


                <MyInput value={data.jenis_layanan} multiline onChangeText={x => setData({ ...data, jenis_layanan: x, })} label='Layanan Publikasi dan Diseminasi' label2="(Naskah Siaran Radio)" iconname='create-outline' />



                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                }}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://carebptp.zavalabs.com/naskah-siaran.pdf')} style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: '#c0392b'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: colors.white
                        }}>Download Contoh Naskah file PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://carebptp.zavalabs.com/naskah-siaran.docx')} style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: '#2980b9'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: colors.white
                        }}>Download Contoh Naskah file WORD</Text>
                    </TouchableOpacity>
                </View>



                <MyGap jarak={20} />
                <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, textAlign: 'center' }}>(Dokumen PDF maksimal 5 Mb)</Text>


                <MyButton
                    warna={colors.danger}
                    title="Upload Dokumen PDF"
                    onPress={async () => {

                        try {
                            const res = await DocumentPicker.pick({
                                // Provide which type of file you want user to pick
                                type: [DocumentPicker.types.pdf],
                                // There can me more options as well
                                // DocumentPicker.types.allFiles
                                // DocumentPicker.types.images
                                // DocumentPicker.types.plainText
                                // DocumentPicker.types.audio
                                // DocumentPicker.types.pdf
                            });
                            // Printing the log realted to the file
                            console.log('res : ' + JSON.stringify(res));
                            // Setting the state to show single file attributes
                            console.log('sizw', res[0].size)
                            if (res[0].size > 5000000) {
                                alert('Maaf dokumen pdf maksimal 5 Mb')
                            } else {
                                setPath(res[0]);
                            }


                        } catch (err) {
                            setSingleFile(null);
                            // Handling any exception (If any)
                            if (DocumentPicker.isCancel(err)) {
                                // If user canceled the document selection
                                alert('Canceled');
                            } else {
                                // For Unknown Error
                                alert('Unknown Error: ' + JSON.stringify(err));
                                throw err;
                            }
                        }

                    }}
                />
                <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12, textAlign: 'center' }}>{path.name}</Text>


                {/* <UploadFoto
                    onPress1={() => getCamera(1)}
                    onPress2={() => getGallery(1)}
                    label="Upload Foto Dokumen"
                    foto={foto}
                /> */}


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
