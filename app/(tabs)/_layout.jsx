import { Tabs } from "expo-router";

import { StyleSheet } from "react-native";
import "react-native-reanimated";

import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1C84C6",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          //   height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          paddingRight: 10,
        },
        tabBarStyle: {
          height: 70,
          //   marginBottom: bottomInset,
        },
        // tabBarActiveTintColor: colors.white,
        // tabBarInactiveTintColor: colors.avenirBige,
        // tabBarLabelStyle: styles.tabBarLabel,
        // tabBarLabelPosition: "below-icon",
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
const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#293846",
    padding: 10,
  },
});
