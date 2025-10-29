import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getItem } from "../../tools/AsyncStorage";
import WebView from "react-native-webview";

export default function threeD() {
  const [appId, setAppId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getLocalData();
    }, [])
  );
  const getLocalData = async () => {
    const id = await getItem("appId");
    setAppId(id);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <WebView
          source={{
            uri: "http://192.168.100.25:8000/homemat/view3d/2/4/0",
            // uri: "https://homemattest.scriptdzshock.com/homemat/view3d/2/146/0",
          }}
          style={{ flex: 1 }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
