import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownList from '../DropDownList';

export default function Livraison({state,level}) {
    const [contentHeight, setContentHeight] = useState(0)
    const [openIndex, setOpenIndex] = useState(null);
    const [data, setData] = useState([1, 2])



    return (
        <View>
            <DropDownList
                title='Dispatch'
                fieldStyle={styles.listfield}
                list={false}
                duration={500}
                isOpen={openIndex === 1}
                onToggle={() =>
                    setOpenIndex(openIndex === 1 ? null : 1) // close others
                }
            >
                {/* <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }} style={styles.menu}>
                    {data.map((i) => (
                        <View style={styles.datafield} key={i} >
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Garde du corp Droit</Text>
                                <Image></Image>
                            </View>
                            <View style={styles.detailsBetween}>
                                <Text>Gamme excellence</Text>
                                <Text style={{ fontWeight: '300' }}>12m</Text>
                            </View>
                            <View style={styles.detailsBetween}>
                                <Text>3400€</Text>
                                <Text style={{ fontWeight: '300' }}>3 Conceptions</Text>
                            </View>

                        </View>
                    ))}
                    <View>

                        <TouchableOpacity style={styles.btn}>
                            <Text style={{ color: '#ffffff', fontWeight: "semibold" }} > Envoyé au client</Text>
                        </TouchableOpacity>
                    </View>

                </View> */}
            </DropDownList>
            <DropDownList
                title='Envois au client'
                fieldStyle={styles.listfield}
                lsit={false}

            />
            <DropDownList
                title='Validation'
                fieldStyle={styles.listfield}
                lsit={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listfield: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',

    },
    menu: {
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flex: 1,
        gap: 15,
        // justifyContent:'center',
        // alignItems:'center'
        // width:'100%',
        paddingHorizontal: 20,
    },
  
})