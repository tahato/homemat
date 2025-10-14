import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DropDownList from '../DropDownList'

export default function Estimation() {

    const [contentHeight, setContentHeight] = useState(0)
    const [data, setData] = useState([1, 2])
    const [openIndex, setOpenIndex] = useState(null);



    return (
        <View>
            <DropDownList
                title='Initialisation'
                fieldStyle={styles.listfield}
                list={true}
                duration={500}
                isOpen={openIndex === 1}
                onToggle={() =>
                    setOpenIndex(openIndex === 1 ? null : 1) // close others
                }
            >
                <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }} style={styles.menu}>
                    {data.map((i) => (
                        <View style={styles.datafield} key={i} >
                            <Text>Estimation n° 00004546</Text>
                            <Text>3400€</Text>
                        </View>
                    ))}
                    <View>

                        <TouchableOpacity style={styles.btn}>
                            <Text style={{ color: '#ffffff', fontWeight: "semibold" }} > Envoyé au client</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DropDownList>
            <DropDownList
                title='Envois au client'
                fieldStyle={styles.listfield}
                lsit={false}

            >
            </DropDownList>
           
            <DropDownList
                title='Validation'
                fieldStyle={styles.listfield}
                lsit={false}
            >
            </DropDownList>
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
        gap: 5,
        // justifyContent:'center',
        // alignItems:'center'
        // width:'100%',
        paddingHorizontal: 20,
    },
    datafield: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        padding: 5,
        borderRadius: 10
    },
    btn: {
        padding: 5,
        backgroundColor: '#1C84C6',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center'
    }
})