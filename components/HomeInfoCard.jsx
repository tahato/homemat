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
        <TouchableOpacity style={styles.cardContainer} >

            <View style={styles.cardHeader}>
                <Text style={{ fontFamily: 'jura', fontWeight: 'bold', fontSize: 17 }}>Project <Text style={{ color: 'black', fontWeight: 'semibold', fontSize: 13 }}>  001-0925</Text> </Text>
                <Text style={{ fontSize: 12 }}>Terry Martin le bonoit allegro</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.cardInfo}>
                    <View style={styles.infoLine}>
                        <Text className="text-xl font-mainFont mt-1">ddddddddddddd DA</Text>
                        <Text className="text-sm text-gray-500 mt-1">{date}</Text>
                    </View>
                </View>
                <View style={styles.svg}>

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
                    </Svg>
                    <Text style={styles.percentage}>55</Text>
                </View>


            </View>
            <View style={styles.client}>
                <Text>Client</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'red',
        gap: 50,
        paddingHorizontal: 10
    },
    svg: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100px'
    },
    // className="absolute text-lg font-semibold text-gray-800"
    percentage: {
        position: 'absolute',
        fontFamily: 'Jura',
        color: 'black'
    },
    cardInfo: {
        display: 'flex',
        justifyContent: 'center',

    },
    client: {
        alignItems: 'center'
    }
})