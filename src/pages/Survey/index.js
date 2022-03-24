import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fonts } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { getData } from '../../utils/localStorage'
import { MyButton } from '../../components'
import axios from 'axios'

export default function Survey() {

    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(res => setData({
            ...data,
            fid_user: res.id
        }))
    }, [])

    const [pilih1, setPilih1] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
    })


    const [pilih2, setPilih2] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
    })


    const [pilih3, setPilih3] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
    })


    const [pilih4, setPilih4] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
    })

    const [data, setData] = useState({
        sarana_prasarana: '',
        penyelenggara: '',
        layanan_inti: '',
        layanan_pendukung: '',


    })
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            flexDirection:
                'column',
            justifyContent: 'space-between'
        }}>

            {/* sarana_prasarana  */}
            <View style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 10,
            }}>
                <View style={{

                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                    }}>SARANA PRASARANAN</Text>

                </View>
                <View style={{
                    padding: 5,

                    flexDirection: 'row',
                    justifyContent: 'space-evenly',

                }}>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih1({
                                ...pilih1,
                                a: true,
                                b: false,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                sarana_prasarana: 'TIDAK PUAS'
                            })

                        }
                        } style={{
                            backgroundColor: '#FF0000', borderWidth: pilih1.a ? 3 : 0,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                        }} /><Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>TIDAK PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih1({
                                ...pilih1,
                                a: false,
                                b: true,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                sarana_prasarana: 'KURANG PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#FFFF00', borderWidth: pilih1.b ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} /><Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>KURANG PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih1({
                                ...pilih1,
                                a: false,
                                b: false,
                                c: true,
                                d: false

                            })

                            setData({
                                ...data,
                                sarana_prasarana: 'PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#92D050',
                            borderWidth: pilih1.c ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} /><Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih1({
                                ...pilih1,
                                a: false,
                                b: false,
                                c: false,
                                d: true

                            })
                            setData({
                                ...data,
                                sarana_prasarana: 'SANGAT PUAS'
                            })
                        }
                        } style={{
                            backgroundColor: '#00B050', borderWidth: pilih1.d ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} /><Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>SANGAT PUAS</Text>
                    </View>
                </View>
            </View>

            {/* penyelenggara  */}
            <View style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 10,
            }}>
                <View style={{

                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                    }}>PENYELENGGARA</Text>

                </View>
                <View style={{
                    padding: 5,

                    flexDirection: 'row',
                    justifyContent: 'space-evenly',

                }}>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih2({
                                ...pilih2,
                                a: true,
                                b: false,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                penyelenggara: 'TIDAK PUAS'
                            })

                        }
                        } style={{
                            backgroundColor: '#FF0000', borderWidth: pilih2.a ? 3 : 0,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>TIDAK PUAS</Text>
                    </View>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih2({
                                ...pilih2,
                                a: false,
                                b: true,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                penyelenggara: 'KURANG PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#FFFF00', borderWidth: pilih2.b ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>KURANG PUAS</Text>
                    </View>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih2({
                                ...pilih2,
                                a: false,
                                b: false,
                                c: true,
                                d: false

                            })

                            setData({
                                ...data,
                                penyelenggara: 'PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#92D050',
                            borderWidth: pilih2.c ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>PUAS</Text>
                    </View>


                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih2({
                                ...pilih2,
                                a: false,
                                b: false,
                                c: false,
                                d: true

                            })
                            setData({
                                ...data,
                                penyelenggara: 'SANGAT PUAS'
                            })
                        }
                        } style={{
                            backgroundColor: '#00B050', borderWidth: pilih2.d ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>SANGAT PUAS</Text>
                    </View>



                </View>
            </View>

            {/* layanan_inti  */}
            <View style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 10,
            }}>
                <View style={{

                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                    }}>LAYANAN INTI</Text>

                </View>
                <View style={{
                    padding: 5,

                    flexDirection: 'row',
                    justifyContent: 'space-evenly',

                }}>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih3({
                                ...pilih3,
                                a: true,
                                b: false,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                layanan_inti: 'TIDAK PUAS'
                            })

                        }
                        } style={{
                            backgroundColor: '#FF0000', borderWidth: pilih3.a ? 3 : 0,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>TIDAK PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih3({
                                ...pilih3,
                                a: false,
                                b: true,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                layanan_inti: 'KURANG PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#FFFF00', borderWidth: pilih3.b ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>KURANG PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih3({
                                ...pilih3,
                                a: false,
                                b: false,
                                c: true,
                                d: false

                            })

                            setData({
                                ...data,
                                layanan_inti: 'PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#92D050',
                            borderWidth: pilih3.c ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>PUAS</Text>
                    </View>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih3({
                                ...pilih3,
                                a: false,
                                b: false,
                                c: false,
                                d: true

                            })
                            setData({
                                ...data,
                                layanan_inti: 'SANGAT PUAS'
                            })
                        }
                        } style={{
                            backgroundColor: '#00B050', borderWidth: pilih3.d ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>SANGAT PUAS</Text>
                    </View>


                </View>
            </View>

            {/* layanan_pendukung  */}
            <View style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 10,
            }}>
                <View style={{

                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                    }}>LAYANAN PENDUKUNG</Text>

                </View>
                <View style={{
                    padding: 5,

                    flexDirection: 'row',
                    justifyContent: 'space-evenly',

                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih4({
                                ...pilih4,
                                a: true,
                                b: false,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                layanan_pendukung: 'TIDAK PUAS'
                            })

                        }
                        } style={{
                            backgroundColor: '#FF0000', borderWidth: pilih4.a ? 3 : 0,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>TIDAK PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih4({
                                ...pilih4,
                                a: false,
                                b: true,
                                c: false,
                                d: false

                            })

                            setData({
                                ...data,
                                layanan_pendukung: 'KURANG PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#FFFF00', borderWidth: pilih4.b ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>KURANG PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih4({
                                ...pilih4,
                                a: false,
                                b: false,
                                c: true,
                                d: false

                            })

                            setData({
                                ...data,
                                layanan_pendukung: 'PUAS'
                            })
                        }

                        } style={{
                            backgroundColor: '#92D050',
                            borderWidth: pilih4.c ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>PUAS</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            setPilih4({
                                ...pilih4,
                                a: false,
                                b: false,
                                c: false,
                                d: true

                            })
                            setData({
                                ...data,
                                layanan_pendukung: 'SANGAT PUAS'
                            })
                        }
                        } style={{
                            backgroundColor: '#00B050', borderWidth: pilih4.d ? 3 : 0,
                            width: 60,
                            height: 60,

                            borderRadius: 30,
                        }} />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 10,
                            top: 5,
                            textAlign: 'center'
                        }}>SANGAT PUAS</Text>
                    </View>


                </View>
            </View>


            <MyButton title="KIRIM INDEKS KEPUASAN" warna={colors.primary} Icons="create-outline" onPress={() => {

                console.log('data kriim', data);
                axios.post('https://carebptp.zavalabs.com/api/1add_nilai.php', data).then(res => {
                    console.log(res.data);
                    alert('Terima kasih Penilaian Anda Sudah terkirim !')
                })
            }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})