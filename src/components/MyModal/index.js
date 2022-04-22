import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
import MyButton from '../MyButton';
import { colors } from '../../utils/colors';
export default function MyModal({
    vis = false
}) {

    const [buka, setBuka] = useState(false);

    useEffect(() => {
        setBuka(vis);
    }, [])

    return (
        <View>
            <Modal isVisible={!buka ? vis : buka}>
                <View style={{ flex: 1, backgroundColor: 'red' }}>
                    <Text>I am the modal content!</Text>
                </View>
                <MyButton title="close" warna={colors.primary} onPress={() => setBuka(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({})