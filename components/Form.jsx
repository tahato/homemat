import { Image } from 'expo-image';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import images from '../constants/images';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';


export default function Form() {
    const [showPassword, setShowPassword] = useState(false)




    return (

        // <View className='bg-white w-[75%] flex flex-col items-center justify-center px-5 m-5 gap-5 max-w-600 rounded-[20] '>
        <View style={styles.form}>
            <Image source={images.logo} style={styles.logoImage} />
            <Text style={styles.welcomText}>Bienvenue</Text>
            <View style={styles.logform}>
                <View style={styles.formField}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        keyboardType='email'
                        style={styles.input}
                    // onChangeText={e => setEmail(e)}

                    />
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={styles.input}
                    // value={password}
                    // onChangeText={e => setPassword(e)}
                    // secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity style={styles.eye}
                    onPress={() => setShowPassword(!showPassword)} 
                    >
                        <FontAwesome5 name={showPassword ?'eye-slash': 'eye'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}></Text>
                    <TextInput />
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={styles.btnConnect}  >
                <Text style={styles.btnText}>login</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>

            </Text>
        </View>

    )
}
const styles = StyleSheet.create({
    form: {
        width: "85%",
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 20
    },

    logoImage: {
        width: 150,
        height: 150,
    },
    welcomText: {
        fontSize: 16,
        color: "black",
        // fontFamily: fonts.mainFont
    },

    logform: {
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        marginVertical: 20

    },
    formField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10
    },
    input: {
        paddingHorizontal: 10,
        borderColor: "#D9D9D9",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
        height: 35,
        fontSize: 12,
        paddingVertical: 0,
        fontFamily: "semibold",
        flex: 1,
        backgroundColor: "white",
        color: 'black'
    },
    label: {
        textTransform: 'capitalize',
        color: "#293846",
        fontSize: 12,
        width: "35%",
        fontFamily:'bold',
        textAlign: "right",
    },
    btnConnect: {
        marginTop: 10,
        width: "100%",
        padding: 10,
        backgroundColor: "#293846",
        borderRadius: 5,
    },
    btnText: {
        color: "#ffffff",
        fontSize: 14,
        // fontFamily: fonts.mainFont,
        textAlign: 'center'
    },
    bottomText: {
        // color: colors.bigTitleGray,
        fontSize: 10,
        // fontFamily: fonts.mainFont,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 10
    },
    inputs: {
        // paddingHorizontal: 5, 
        // borderColor: colors.titleGray,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
        width: 152,
        height: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 3,
    },

    // errorMessage: {
    //     color: "red",
    //     fontSize: 10,
    //     fontFamily: fonts.mainFont,
    //     alignSelf: "flex-end",
    //     paddingRight: "10%"
    // },
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    headerLeftText: {
        fontSize: 10,
        // fontFamily: fonts.mainFont,
        // color: colors.mainGolden,
        fontWeight: 'bold',
        marginLeft: 10,
        zIndex: 999,
        elevation: 7
    },
    eye:{
        position:"absolute",
        right:5
    }
})