import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropDownList from '../components/DropDownList'
import BonCommande from '../components/listMenus/BonCommande'
import Estimation from '../components/listMenus/Estimation'
import Livraison from '../components/listMenus/Livraison'
import Production from '../components/listMenus/Production'
import { useGlobalContext } from '../context/GlobaleProvider'

export default function project() {
    const { project } = useLocalSearchParams();
    const id = parseInt(project);
    const { token } = useGlobalContext();
    const [openIndex, setOpenIndex] = useState(null);
    const [projectInfo, setProjectInfo] = useState([]);

    useEffect(() => {
        getProject()
    }, [])

    const getProject = async () => {
        await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/homemat/projectById?company_code=${process.env.EXPO_PUBLIC_COMPANY_CODE}`,
            { id },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            .then((res) => {
                setProjectInfo(res.data.data)
                console.log(res.data.data);
                

            })
            .catch(err => {
                console.log(err.message);

            });
    }
                console.log('hichem ', projectInfo.quotation_level,    projectInfo.quotation_number, projectInfo.quotation_ttc );


    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }} edges={['top', 'bottom']}>
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
                    waiting={!projectInfo?.quotation_level && true}
                    checked={projectInfo.quotation_level && true}
                >
                    <Estimation
                        level={projectInfo.quotation_level}
                        number={projectInfo.quotation_number}
                        ttc={projectInfo.quotation_ttc}
                    />
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
                    <Production />
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
                    <Livraison />
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
        marginBottom: 20
    },
    container: {
        flexGrow: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20
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