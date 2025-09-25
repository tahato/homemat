import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropDownList from '../components/DropDownList'
import Estimation from '../components/listMenus/Estimation'

export default function project() {
    const [contentHeight, setContentHeight] = useState(0)
    const loadHeight = (e) => {
        setContentHeight(e.nativeEvent.layout.height)
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <Text style={styles.title}>Road Map</Text>
            <ScrollView style={styles.container} contentContainerStyle={{ gap: 5 }}>

                <DropDownList
                    fieldStyle={styles.listfield}
                    title='Estimation'
                    list={true}

                >
                    <View onLayout={(e) => loadHeight(e)}>
                        <Estimation />
                    </View>
                </DropDownList>
                <DropDownList
                    fieldStyle={styles.listfield}
                    title='Bon de commande'
                    list={true}

                >
                    <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }}>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                    </View>
                </DropDownList>
                <DropDownList
                    fieldStyle={styles.listfield}
                    title='EsProductiontimation'
                    list={true}

                >
                    <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }}>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                    </View>
                </DropDownList>
                <DropDownList
                    fieldStyle={styles.listfield}
                    title='Livraison'
                    list={true}

                >
                    <View onLayout={(e) => { setContentHeight(e.nativeEvent.layout.height) }}>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                        <Text>taha</Text>
                    </View>
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
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
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