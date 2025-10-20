import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import images from '../../constants/images';
import DropDownList from '../DropDownList';

export default function Production({ state, level }) {
    const [contentHeight, setContentHeight] = useState(0)
    const [openIndex, setOpenIndex] = useState(null);
    const [data, setData] = useState([1, 2])

    return (
        <View>
            <DropDownList
                title='Remplissage camion'
                fieldStyle={styles.listfield}
                list={true}
                duration={500}
                isOpen={openIndex === 1}
                onToggle={() =>
                    setOpenIndex(openIndex === 1 ? null : 1) // close others
                }
                checked={level == 2 && state >= 1}
                waiting={!!level}
            >
                <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }} style={styles.menu}>
                    <View>
                        <View style={styles.details}>
                            <Text style={{ fontWeight: 'bold' }} >Poid total :</Text>
                            <Text>1261 kg</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={{ fontWeight: 'bold' }} >Nombre de palettes :</Text>
                            <Text> 2</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={{ fontWeight: 'bold' }} >Poid par palette:</Text>
                            <Text> 631 kg</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={{ fontWeight: 'bold' }} >Cloturé le:</Text>
                            <Text>--/--/----</Text>
                        </View>

                        <View style={styles.details}>
                            <Text style={{ fontWeight: 'bold' }} >Responsable:</Text>
                            <Text>Terry Martin le bonoit allegro</Text>
                        </View>
                    </View>
                    <Image source={images.camion} style={{ width: '100%', height: 300 }} />

                </View>
            </DropDownList>
            <DropDownList
                title='Envois a l’usine'
                fieldStyle={styles.listfield}
                lsit={false}
                duration={500}
                // isOpen={openIndex === 2}
                // onToggle={() =>
                //     setOpenIndex(openIndex === 2 ? null : 2) // close others
                // }
                waiting={level == 2 && state >= 1}
                checked={level == 2 && state >= 2}

            />
            <DropDownList
                title='Expédition'
                fieldStyle={styles.listfield}
                lsit={false}
                duration={500}
                // isOpen={openIndex === 3}
                // onToggle={() =>
                //     setOpenIndex(openIndex === 3 ? null : 3) // close others
                // }
                waiting={level == 2 && state >= 2}
                checked={level == 2 && state >= 3}
            />
            <DropDownList
                title='Réception validé'
                fieldStyle={styles.listfield}
                lsit={false}
                duration={500}
                // isOpen={openIndex === 4}
                // onToggle={() =>
                //     setOpenIndex(openIndex === 4 ? null : 4) // close others
                // }
                waiting={level == 2 && state >= 3}
                checked={level == 2 && state >= 4}
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
    details: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    btn: {
        padding: 5,
        backgroundColor: '#1C84C6',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center'
    }
})