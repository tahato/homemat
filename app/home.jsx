import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import HomeInfoCard from '../components/HomeInfoCard';
import { SearchBar } from 'react-native-screens';
import SearchInput from '../components/SearchInput';

export default function home() {
    const [refreshing, setRefreshing] = useState();
    const projects = [1, 2, 3]

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // fetchData()
        setRefreshing(false);
    }, []);
    return (
        <View style={{backgroundColor:'white'}}>
           <SearchInput/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                scrollEnabled={false}
            >

                <View style={styles.container}>

                    {
                        projects.map((i) => (
                            <HomeInfoCard
                                key={i}
                            />
                        ))
                    }
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical:5,
        paddingHorizontal:15,
        display: 'flex',
        gap: 10,
    }
})