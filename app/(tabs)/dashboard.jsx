import { useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import Svg from "react-native-svg";
import { getDashboard } from "../../api/getDashboard";
import AnimatedBarChart from "../../components/AnimatedBarChart";
import AnimatedCircle from "../../components/AnimatedCircle";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { width } = Dimensions.get("window");
  const radius = 50;
  const strokeWidth = 5;

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDashboard();
      setData(res);
      setLoading(false);
    } catch (e) {
      console.log("error get dashboard", e);
    }
  };

  // Bar chart
  const formedData = {
    labels: ["Devis", "Cmd", "Prod",""],
    datasets: [
      {
        data: [
          ((data.devis * 100) / data.total_projects).toFixed(1),
          ((data.commandes * 100) / data.total_projects).toFixed(1),
          ((data.prod * 100) / data.total_projects).toFixed(1),
          100,
        ],
        colors: [
          (opacity = 1) => `rgba(217, 217, 217, ${opacity})`,
          (opacity = 1) => `rgba(255, 116, 74, ${opacity})`,
          (opacity = 1) => `rgba(26, 179, 148, ${opacity})`,
          (opacity = 1) => `rgba(255,255, 255, 0)`,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0,0, 0, ${opacity})`,
  };

  const bills = [
    {
      id: 1,
      name: "Devis",
      qtt: data.devis,
      montant: data.devis_ttc,
      percent: ((data.devis * 100) / data.total_projects).toFixed(1),
      color: "#D9D9D9",
    },
    {
      id: 2,
      name: "Commandes",
      qtt: data.commandes,
      montant: data.commandes_ttc,
      percent: ((data.commandes * 100) / data.total_projects).toFixed(1),
      color: "#FF744A",
    },
    {
      id: 3,
      name: "En Production",
      qtt: data.prod,
      montant: data.prod_ttc ?? 0,
      percent: ((data.prod * 100) / data.total_projects).toFixed(1),
      color: "#1AB394",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
        padding: 20,
      }}
    >
      {/* Animated Circles */}
      <Svg
        width={220}
        height={140}
        viewBox="0 30 120 40"
        style={{ position: "relative" }}
      >
        <AnimatedCircle
          radius={radius}
          strokeWidth={strokeWidth}
          strokeColor="#1AB394"
          percent={
            (data.prod * 100 + data.commandes * 100 + data.devis * 100) /
            data.total_projects
          }
          delay={0}
        />
        <AnimatedCircle
          radius={radius}
          strokeWidth={strokeWidth}
          strokeColor="#FF744A"
          percent={
            (data.commandes * 100 + data.devis * 100) / data.total_projects
          }
          delay={0}
        />
        <AnimatedCircle
          radius={radius}
          strokeWidth={strokeWidth}
          strokeColor="#D9D9D9"
          percent={(data.devis * 100) / data.total_projects}
          delay={0}
        />
      </Svg>

      <Text style={{ position: "absolute", top: 120 }}>
        {data.total_projects} projets
      </Text>

      {/* Bar chart */}
      <AnimatedBarChart data={formedData} chartConfig={chartConfig} />

      {/* Details list */}
      <View style={styles.detailsContainer}>
        {bills.map((bill) => (
          <View style={styles.billInfo} key={bill.id}>
            <View style={styles.billInfoLeft}>
              <Text>
                {bill.name}:{" "}
                <Text style={{ fontWeight: "bold" }}>{bill.qtt}</Text>
              </Text>
              <Text>
                Montant:{" "}
                <Text style={{ fontWeight: "bold" }}>{bill.montant} $</Text>
              </Text>
            </View>
            <Text style={{ fontWeight: "bold", color: bill.color }}>
              {bill.percent} %
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  detailsContainer: {
    flexDirection: "column",
    gap: 5,
    padding: 10,
    width: "100%",
  },
  billInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
