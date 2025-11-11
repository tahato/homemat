import { useRoute } from "@react-navigation/native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProject } from "../../api/getProject";
import DropDownList from "../../components/DropDownList";
import BonCommande from "../../components/listMenus/BonCommande";
import Estimation from "../../components/listMenus/Estimation";
import Livraison from "../../components/listMenus/Livraison";
import Production from "../../components/listMenus/Production";
import { useGlobalContext } from "../../context/GlobaleProvider";
export default function project() {
  const { project, client } = useLocalSearchParams();
  const id = parseInt(project);
  const [openIndex, setOpenIndex] = useState(null);
  const [projectInfo, setProjectInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setProjectId, setConceptions, setBillId, setClient } = useGlobalContext();
  const route = useRoute();
  const { loaded } = route.params;

  useFocusEffect(
    useCallback(() => {
      setClient(client);
      setProjectId(id);
      fetchData();
    }, [])
  );
  const fetchData = async () => {
    try {
      const data = await getProject(id);
      setProjectInfo(data);
      setConceptions(data.conceptions);
      setBillId(data.order_id ?? data.bill_id);
      setLoading(false);
      loaded();
    } catch (e) {
      console.log("error get project", e);
    }
  };
  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <SafeAreaView
          style={{ backgroundColor: "white", flex: 1 }}
          edges={["top", "bottom"]}
        >
          <Text style={styles.title}>Plan </Text>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ gap: 5 }}
          >
            <DropDownList
              fieldStyle={styles.listfield}
              title="Estimation"
              list={true}
              duration={700}
              isOpen={openIndex === 1}
              onToggle={
                () => setOpenIndex(openIndex === 1 ? null : 1) // close others
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
              title="Bon de commande"
              list={true}
              duration={300}
              isOpen={openIndex === 2}
              onToggle={
                () => setOpenIndex(openIndex === 2 ? null : 2) // close others
              }
              waiting={
                projectInfo.quotation_level == 1 && !projectInfo.order_level
                  ? true
                  : false
              }
              checked={projectInfo.order_level && true}
            >
              <BonCommande
                quotation_level={projectInfo.quotation_level}
                order_level={projectInfo.order_level}
                number={projectInfo.order_number}
                conceptions={projectInfo.conceptions}
                ttc={projectInfo.quotation_ttc}
                gameesQtt={{
                  excellence: projectInfo.excel_quantity,
                  elégance: projectInfo.eleg_quantity,
                  pro: projectInfo.pro_quantity,
                }}
              />
            </DropDownList>
            <DropDownList
              fieldStyle={styles.listfield}
              title="Productiont"
              list={true}
              isOpen={openIndex === 3}
              onToggle={
                () => setOpenIndex(openIndex === 3 ? null : 3) // close others
              }
              waiting={projectInfo.order_level && true}
              checked={projectInfo.state >= 4}
            >
              <Production
                state={projectInfo.state}
                level={projectInfo.order_level}
              />
            </DropDownList>
            <DropDownList
              fieldStyle={styles.listfield}
              title="Livraison"
              list={true}
              isOpen={openIndex === 4}
              onToggle={
                () => setOpenIndex(openIndex === 4 ? null : 4) // close others
              }
              waiting={projectInfo.state >= 4}
              checked={projectInfo.state >= 7}
            >
              <Livraison
                state={projectInfo.state}
                level={projectInfo.order_level}
              />
            </DropDownList>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listfield: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
