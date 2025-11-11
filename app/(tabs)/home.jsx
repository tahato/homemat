import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeInfoCard from '../../components/HomeInfoCard';
import SearchInput from '../../components/SearchInput';
import { getItem } from '../../tools/AsyncStorage';

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [projects, setProjects] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [token,setToken]=useState();
    // ✅ Fetch projects
    const fetchData = useCallback(async (reset = false) => {
      const token = await getItem("token");
      setToken(token)
      if (loading || !token) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/api/homemat/projects`,
          {
            params: {
              company_code: process.env.EXPO_PUBLIC_COMPANY_CODE,
              page: reset ? 1 : page,
              search: search || "",
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data, last_page } = res.data;
        setLastPage(last_page);

        setProjects((prev) =>
          reset
            ? data
            : [
                ...prev,
                ...data.filter((p) => !prev.some((old) => old.id === p.id)),
              ]
        );

        setPage((prev) => (reset ? 2 : prev + 1));
      } catch (err) {
        console.log(
          "Error fetching data:",
          err?.response?.status,
          err?.message
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, [page, token, search, loading]);

    // ✅ Initial load
    useEffect(() => {
         fetchData(true);
    }, [token]);

    // ✅ Search effect (with delay)
    useEffect(() => {
        const delay = setTimeout(() => {
    fetchData(true);
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    // ✅ Pull-to-refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData(true);
    }, [fetchData]);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1,paddingTop:20 }} edges={[]}>
            <SearchInput search={search} setSearch={setSearch} />

            <FlatList
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40, gap: 20 }}
                data={projects}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <HomeInfoCard project={item} />}
                onEndReached={() => {
                    if (!loading && page <= lastPage) fetchData();
                }}
                onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListFooterComponent={
                    loading ? (
                        <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
                    ) : null
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
});
