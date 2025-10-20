import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownList from '../DropDownList';

export default function BonCommande({quotation_level,order_level,count_conceptions,gamme,ttc}) {
    const [contentHeight, setContentHeight] = useState(0)
    const [openIndex, setOpenIndex] = useState(null);
    const [data, setData] = useState([1, 2])



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
                waiting={(quotation_level==1 && !order_level)?true:false}
                checked={order_level && true}
            >
                <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }} style={styles.menu}>
                  
                        <View style={styles.datafield} >
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Garde du corp Droit</Text>
                                {/* <Image></Image> */}
                            </View>
                            <View style={styles.detailsBetween}>
                                <Text>Gamme {gamme}</Text>
                                <Text style={{ fontWeight: '300' }}>12m</Text>
                            </View>
                            <View style={styles.detailsBetween}>
                                <Text>{ttc} €</Text>
                                <Text style={{ fontWeight: '300' }}>{count_conceptions} Conception(s)</Text>
                            </View>

                        </View>
                  
                    {/* <View>

                        <TouchableOpacity style={styles.btn}>
                            <Text style={{ color: '#ffffff', fontWeight: "semibold" }} > Envoyé au client</Text>
                        </TouchableOpacity>
                    </View> */}

                </View>
            </DropDownList>
            <DropDownList
                title='Envois au client'
                fieldStyle={styles.listfield}
                lsit={false}
                waiting={(quotation_level==1 && !order_level)?true:false}
                checked={order_level && true}

            />
            <DropDownList
                title='Validation'
                fieldStyle={styles.listfield}
                lsit={false}
                waiting={(quotation_level==1 && !order_level)?true:false}
                checked={order_level && true}
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
    datafield: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 5,
        borderRadius: 10,
    },
    detailsBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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