import { FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function DropDownList({ children, title, fieldStyle, list, duration, onToggle, isOpen, waiting, checked }) {
    const [open, setOpen] = useState(false)
    const [contentHeight, setContentHeight] = useState(0)
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        
        // if (open && contentHeight) {
        Animated.timing(anim, {
            toValue: isOpen ? contentHeight : 0,
            duration: duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();
        // }
    }, [contentHeight, isOpen])

    // const toggle = () => {

    //     const toValue = isOpen ? 0 : contentHeight;
    //     Animated.timing(anim, {
    //         toValue,
    //         duration: 500,
    //         easing: Easing.out(Easing.cubic),
    //         useNativeDriver: false, // height animation — cannot use native driver
    //     }).start();
    //     setOpen(!open);

    // }
    return (

        <View style={styles.container} >
            <TouchableOpacity
                style={fieldStyle}
                onPress={onToggle}
            >
                <View style={styles.listTitle}>
                    {waiting ?
                        (
                            <MaterialCommunityIcons name='clock-time-eight-outline' size={20} />
                        ) : checked ? (
                            <FontAwesome5 name='check-circle' size={15} color={'green'} />
                        ) :
                            < Fontisto name='locked' size={15} color={'lightgray'} />
                    }
                    <Text>{title}</Text>
                </View>
                {list ?
                    <MaterialIcons name={!open ? 'keyboard-arrow-right' : 'keyboard-arrow-down'} size={20} />
                    : <View></View>
                }
            </TouchableOpacity>

            <Animated.ScrollView style={{ height: anim, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }}>
                    {children}
                </View>
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    listTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})