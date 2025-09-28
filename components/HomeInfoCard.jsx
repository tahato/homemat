import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function HomeInfoCard({ key }) {

    let percentPayed = 0
    let percentDelay = 0
    if (20 > 0) {
        percentPayed = ((50 / 100) * 100).toFixed(2);
    }
    if (10 > 0) {
        percentDelay = ((20 / 100) * 100).toFixed(2);
    }

    const date = '28/06/2025';

    const radius = 40;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentPayed) / 100;
    const strokeDashoffsetDelay = circumference - (circumference * (percentPayed + percentDelay)) / 100;

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => router.push('/project')} >

            {/* <View style={styles.cardHeader}>
                <Text style={{ fontFamily: 'jura', fontSize: 17 }}>Projet  </Text>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>  001-0925</Text>
                <Text style={{ fontSize: 12 }}>Terry Martin le bonoit allegro</Text>
            </View> */}

            <View style={styles.infoContainer}>
                <View style={styles.cardInfo}>
                    <View style={styles.details}>
                        <Text>Client: </Text>
                        <Text style={{ fontWeight: 'bold' }}>Leroy Merlin Vourles</Text>
                    </View>
                    <View style={styles.details}>
                        <Text  >Créer le:</Text>
                        <Text style={{ fontWeight: 'bold' }}>13/07/2016</Text>
                    </View>
                    <View style={styles.details}>
                        <Text  >Modifié le:</Text>
                        <Text style={{ fontWeight: 'bold' }}> 13/07/2016</Text>
                    </View>

                    <View style={styles.details}>
                        <Text  >Cloturé le:</Text>
                        <Text style={{ fontWeight: 'bold' }}>--/--/----</Text>
                    </View>


                </View>
                <View style={styles.svg}>
                    <View >
                        <Text style={{ fontFamily: 'jura', fontSize: 15 }}>Projet  </Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>001-0925</Text>
                    </View>
                    <Svg width={90} height={90} viewBox="0 0 100 100">
                        <Circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#E5E5E5"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                        <Circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#F66161"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffsetDelay}
                            strokeLinecap="round"
                            rotation="-90"
                            origin="50,50"
                        />
                        <Circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#00C853"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            rotation="-90"
                            origin="50,50"
                        />
                    <Text style={styles.percentage}>55</Text>
                    </Svg>
                </View>


            </View>

            <View style={styles.details}>
                <Text style={{ fontWeight: 'semibold' }} >Responsable:</Text>
                <Text> Terry Martin le bonoit allegro</Text>
            </View>


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '100%'
    },
    infoContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    svg: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100px',
        position:'relative'
    },
    // className="absolute text-lg font-semibold text-gray-800"
    percentage: {
        position: 'absolute',
        fontFamily: 'Jura',
        color: 'black',
        top:35,
        left:35
    },
    cardInfo: {
        display: 'flex',
        // justifyContent: 'center',

    },
  
    details: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
})