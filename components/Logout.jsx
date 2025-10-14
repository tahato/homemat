import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem } from '../tools/AsyncStorage';
import { router } from 'expo-router';
import axios from 'axios'
export default function Logout() {
    const [modalVisible, setModalVisible] = useState(false);

    const handlLogout = async () => {
        try {
            const token = await getItem("token");
            // console.log(token);
                        await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/logout?company_app=homemat`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    console.log('logout !');
                    AsyncStorage.removeItem('token');
                    setModalVisible(false)
                    router.replace('/login')

                }).catch((e) => console.log('errrrrorrr', e.message))
        } catch (error) {
            console.warn('Logout API failed:', error);
        }

    }
    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
            <Modal transparent={true} visible={modalVisible} animationType="slide" >
                <View style={styles.modalContainer}>
                    <View style={styles.containerr}>
                        <Text style={styles.message}>voulez-vous vraiment partir?</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity onPress={handlLogout} activeOpacity={1} style={[styles.button, { backgroundColor: "#71BD78" }]}>
                                <Text style={[styles.buttonText, { color: "#fff" }]}>Oui</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={[styles.button, { backgroundColor: "#CB7A7A" }]} onPress={() => setModalVisible(false)}>
                                <Text style={[styles.buttonText, { color: "#383838" }]}>Non</Text>
                            </TouchableOpacity>
                            <Text style={{ color: "#D7BD96", fontSize: 12, position: "absolute", top: "98%", right: "2%" }}>V0.0.5</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    containerr: {
        width: "90%",
        marginHorizontal: "5%",
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
        backgroundColor: 'white',
        elevation: 5,
        marginVertical: 20
    },
    message: {
        color: 'black',
        fontSize: 14,
        // fontFamily: fonts.bold,
        textAlign: "center"
    },
    btns: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        gap: 20,
        marginTop: 30,
        marginBottom: 10
    },
    button: {
        // width: "60%", 
        padding: 10,
        borderRadius: 5,
        flex: 1
    },
    buttonText: {
        // color: colors.mainBlack, 
        fontSize: 14,
        // fontFamily: fonts.bold,
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
})