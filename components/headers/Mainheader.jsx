import images from "@/constants/images";
import { getItem } from "@/tools/AsyncStorage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "../Logout";

export default function Mainheader() {
  //   const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getLocalData();
  }, []);

  const getLocalData = async () => {
    const name = await getItem("userName");
    setUserName(name);
  };
  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.headerLeftContainer}>
        <Image source={images.logo} style={{ width: 50, height: 50 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white" }}> Bienvenu</Text>
          <Text style={{ color: "white" }}> {userName}</Text>
        </View>
        <Logout />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#293846",
    padding: 10,
  },
});
