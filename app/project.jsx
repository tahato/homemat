import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropDownList from '../components/DropDownList'
import BonCommande from '../components/listMenus/BonCommande'
import Estimation from '../components/listMenus/Estimation'
import Production from '../components/listMenus/Production'
import Livraison from '../components/listMenus/Livraison'

export default function project() {
    const [contentHeight, setContentHeight] = useState(0)
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <Text style={styles.title}>Road Map</Text>
            <ScrollView style={styles.container} contentContainerStyle={{ gap: 5 }}>

                <DropDownList
                    fieldStyle={styles.listfield}
                    title='Estimation'
                    list={true}
                    duration={700}
                    isOpen={openIndex === 1}
                    onToggle={() =>
                        setOpenIndex(openIndex === 1 ? null : 1) // close others
                    }
                >
                    <Estimation />
                </DropDownList>
                <DropDownList
                    fieldStyle={styles.listfield}
                    title='Bon de commande'
                    list={true}
                    duration={300}
                    isOpen={openIndex === 2}
                    onToggle={() =>
                        setOpenIndex(openIndex === 2 ? null : 2) // close others
                    }
                >
                    <BonCommande />
                </DropDownList>
                <DropDownList
                    fieldStyle={styles.listfield}
                    title='Productiont'
                    list={true}
                    isOpen={openIndex === 3}
                    onToggle={() =>
                        setOpenIndex(openIndex === 3 ? null : 3) // close others
                    }
                >
                  <Production/>
                </DropDownList>
                <DropDownList
                    fieldStyle={styles.listfield}
                    title='Livraison'
                    list={true}
                    isOpen={openIndex === 4}
                    onToggle={() =>
                        setOpenIndex(openIndex === 4 ? null : 4) // close others
                    }
                >
                    <Livraison/>
                </DropDownList>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:20
    },
    container: {
        flexGrow: 1,
        paddingTop:10,
        paddingHorizontal: 20,
        paddingBottom:20
    },
    listfield: {
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})