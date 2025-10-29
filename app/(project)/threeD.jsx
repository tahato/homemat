import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';
import { useGlobalContext } from "@/context/GlobaleProvider";

export default function threeD() {

   const [appId, setAppId] = useState("");
   useEffect(() => {
     getLocalData();
   }, []);

   const getLocalData = async () => {
     const id = await getItem("appID");
     setAppId(id);
   };
  
  return (
    <>
    </>
    // <WebView
    //   source={{
    //     uri: "http://192.168.100.25:8000/homemat/view3d/5/205/0",
    //     // uri: "https://homemattest.scriptdzshock.com/homemat/view3d/2/146/0",
    //   }}
    //   style={{ flex: 1 }}
    // />
  );
}

const styles = StyleSheet.create({})