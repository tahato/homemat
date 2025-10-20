import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeInfoCard from '../components/HomeInfoCard';
import SearchInput from '../components/SearchInput';
import { useGlobalContext } from '../context/GlobaleProvider';

export default function home() {
    const [refreshing, setRefreshing] = useState(false);
    const [projects, setProjects] = useState([]);
    const { token } = useGlobalContext();
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        setProjects([])
        fetchData();
        setRefreshing(false);
    }, []);


    useEffect(() => {
        fetchData();
    }, [token])
    useEffect(() => {
        if (search) {

            const delay = setTimeout(() => {
                setPage(1);
                setProjects([]);
                fetchData();

            }, 500); // wait 0.5s after user stops typing

            return () => clearTimeout(delay);
        }
    }, [search]);

    const fetchData = async () => {

        if (!loading) {
            setLoading(true)
            try {
                const res = await axios
                    .get(`${process.env.EXPO_PUBLIC_API_URL}/api/homemat/projects?company_code=${process.env.EXPO_PUBLIC_COMPANY_CODE}&page=${page}&search=${search}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            },
                        }
                    )
                const lastPage = res.data.last_page;
                setProjects((prev) => [...prev, ...res.data.data])
                if (page <= lastPage) {
                    setPage((prev) => prev + 1);
                }
                setLastPage(lastPage)
                setLoading(false)
                setRefreshing(false)

            } catch (err) {
                console.log("Error fetching data:", err?.response?.status, err?.message);

            }
        }

    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingTop: 0 }} edges={['bottom', 'top']} >
            <SearchInput
                search={search}
                setSearch={setSearch}
            />

            <FlatList
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40, gap: 20 }}
                data={projects}
                renderItem={({ item }) => <HomeInfoCard project={item} />}
                keyExtractor={item => item.id}
                onEndReached={() => {
                    if (page <= lastPage) fetchData()
                }}
                // onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListFooterComponent={
                    loading ? (
                        <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
                    ) : null
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },

})