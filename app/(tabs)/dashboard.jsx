import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import Svg, { Circle } from "react-native-svg";
import { getDashboard } from "../../api/getDashboard";
import AnimatedBarChart from "../../components/AnimatedBarChart";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { width } = Dimensions.get("window");
  const radius = 50;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  // Animated values start from hidden state
  const prodAnim = useRef(new Animated.Value(circumference)).current;
  const commandesAnim = useRef(new Animated.Value(circumference)).current;
  const devisAnim = useRef(new Animated.Value(circumference)).current;

  // Fetch data on mount
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

  // Animate when data changes
  useEffect(() => {
    if (!data.total_projects) return;

    let percentDevis = (data.devis * 100) / data.total_projects;
    let percentCommandes = (data.commandes * 100) / data.total_projects;
    let percentProd = (data.prod * 100) / data.total_projects;

    const offsetDevis = circumference - (circumference * percentDevis) / 200;
    const offsetCommandes =
      circumference - (circumference * (percentDevis + percentCommandes)) / 200;
    const offsetProd =
      circumference -
      (circumference * (percentDevis + percentCommandes + percentProd)) / 200;

    const animateCircle = (animValue, toValue) => {
      Animated.timing(animValue, {
        toValue,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    };

    animateCircle(prodAnim, offsetProd);
    animateCircle(commandesAnim, offsetCommandes);
    animateCircle(devisAnim, offsetDevis);
  }, [data]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  // Bar chart
  const formedData = {
    labels: ["Devis", "Commandes", "En Production"],
    datasets: [
      {
        data: [
          data.devis,
          data.commandes,
          data.total_projects - data.devis - data.commandes,
        ],
        colors: [
          (opacity = 1) => `rgba(217, 217, 217, ${opacity})`,
          (opacity = 1) => `rgba(255, 116, 74, ${opacity})`,
          (opacity = 1) => `rgba(26, 179, 148, ${opacity})`,
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
    },
    {
      id: 2,
      name: "Commandes",
      qtt: data.commandes,
      montant: data.commandes_ttc,
      percent: ((data.commandes * 100) / data.total_projects).toFixed(1),
    },
    {
      id: 3,
      name: "En Production",
      qtt: data.prod,
      montant: data.prod_ttc ?? 0,
      percent: ((data.prod * 100) / data.total_projects).toFixed(1),
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
      <Svg
        width={220}
        height={140}
        viewBox="0 30 120 40"
        style={{ position: "relative" }}
      >
        <AnimatedCircle
          cx="50"
          cy="0"
          r={radius}
          stroke="#1AB394"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={prodAnim}
          rotation="180"
          origin="55,50"
        />
        <AnimatedCircle
          cx="50"
          cy="0"
          r={radius}
          stroke="#FF744A"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={commandesAnim}
          rotation="180"
          origin="55,50"
        />
        <AnimatedCircle
          cx="50"
          cy="0"
          r={radius}
          stroke="#D9D9D9"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={devisAnim}
          rotation="180"
          origin="55,50"
        />
      </Svg>

      <Text style={{ position: "absolute", top: 120 }}>
        {data.total_projects} projets
      </Text>
      <AnimatedBarChart data={formedData} chartConfig={chartConfig} />
      {/* <BarChart
        style={{ borderRadius: 16 }}
        data={formedData}
        width={width - 10}
        height={300}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        withCustomBarColorFromData
        flatColor
        fromZero
      /> */}

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
            <Text style={{ fontWeight: "bold" }}>{bill.percent} %</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
