import { useGlobalContext } from '@/context/GlobaleProvider';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HeaderProject() {
     const navigation = useNavigation();
         const {projectName}=useGlobalContext();

    return (
        <SafeAreaView edges={['top']}>
            <View style={styles.headerLeftContainer}>
                <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back-circle-sharp" size={30} color="white" onPress={navigation.goBack} />
                    </TouchableOpacity>
                    <Text style={{ color: "white" }} > {projectName}</Text>

                </View>
                {/* <Image source={images.logo} style={{width:50,height:50}}></Image> */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: '#293846',
        padding: 10
    },
})