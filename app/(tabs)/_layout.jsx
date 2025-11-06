import { Tabs } from "expo-router";

import { StyleSheet } from "react-native";
import "react-native-reanimated";

import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const bottomInset = useSafeAreaInsets().bottom;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#293846",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: "100%",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          // paddingRight: 10,
        },
        tabBarStyle: {
          height: 50,
          marginBottom: bottomInset,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          borderTopWidth: 0, // remove top border line
        },
        tabBarInactiveTintColor: "lightgray",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({});
