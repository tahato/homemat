import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getItem } from '../tools/AsyncStorage';
import { useGlobalContext } from '../context/GlobaleProvider';


export default function index() {
    const {setToken}=useGlobalContext();
    const getToken = async () => {
        const token = await getItem("token");
        setToken(token);
        router.replace(!!token ? "/home" : "/login")
    }
    useEffect(() => {
        getToken()

    }, []);

    return (
        null
    )
}
