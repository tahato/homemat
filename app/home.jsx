import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeInfoCard from '../components/HomeInfoCard';
import SearchInput from '../components/SearchInput';
import { useGlobalContext } from '../context/GlobaleProvider';

export default function home() {
    const [refreshing, setRefreshing] = useState();
    const [projects, setProjects] = useState([]);
    const { token } = useGlobalContext();


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);
    useEffect(() => {
        fetchData();
    }, [token])

    const fetchData = async () => {
        await axios
            .get(`${process.env.EXPO_PUBLIC_API_URL}/api/homemat/projects?company_code=${process.env.EXPO_PUBLIC_COMPANY_CODE}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setProjects(res?.data.data)
            })
            .catch(err => {
                console.log(err);

            });
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingTop: 0 }} edges={['bottom', 'top']} >
            <SearchInput />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, gap: 20, paddingBottom: 40 }}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >



                {
                    projects.map((project) => (
                        <HomeInfoCard
                            key={project.id}
                            project={project}
                        />
                    ))
                }

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        display: 'flex',
        gap: 20,
    },

})