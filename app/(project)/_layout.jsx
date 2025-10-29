import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { StyleSheet } from "react-native";

export default function _layout() {
  const { Navigator } = createMaterialTopTabNavigator();

  const Tabs = withLayoutContext(Navigator);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#A79373", //add to colors
        tabBarScrollEnabled: false,
        tabBarPressColor: "white",
        tabBarStyle: {
          backgroundColor: "#EEE8D6",
          justifyContent: "center",
          alignContent: "center",
          height: 40,
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          height: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          position: "absolute",
          zIndex: 10,
        },
        swipeEnabled:false
      }}
    >
      <Tabs.Screen name="[project]" options={{ title: "RoadMap" }} />
      <Tabs.Screen name="bill" options={{ title: "Bill" }} />
      <Tabs.Screen name="threeD" options={{ title: "3D" }} />
      <Tabs.Screen name="images" options={{ title: "Images" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
