import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getItem } from '../tools/AsyncStorage';


export default function index() {
    const getToken = async () => {
        const token = await getItem("token");
        // console.log(token);
        router.replace(!!token ? "/home" : "/login")
    }
    useEffect(() => {
        getToken()

    }, []);

    return (
        null
    )
}
