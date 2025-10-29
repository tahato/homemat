import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Svg, { Circle } from "react-native-svg";
export default function dashboard() {
  let percentDevis = 20;
  let percentCommandes = 50;
  let percentProd = 30;
  const { width, height } = Dimensions.get("window");
  const radius = 50;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetDevis =
    circumference - (circumference * percentDevis) / 200;
  const strokeDashoffsetcommandes =
    circumference - (circumference * (percentDevis + percentCommandes)) / 200;
  const strokeDashoffsetProd =
    circumference -
    (circumference * (percentDevis + percentCommandes + percentProd)) / 200;
  const data = {
    labels: ["Devis", "Commandes", "En Production"],
    datasets: [
      {
        data: [20, 50, 30],
        colors: [
          (opacity = 1) => `rgba(217, 217, 217, ${opacity})`, // red
          (opacity = 1) => `rgba(255, 116, 74, ${opacity})`, // blue
          (opacity = 0.5) => `rgba(26, 179, 148, ${opacity})`, // yellow
        ],
      },
    ],
  };
  const bills = [
    {
      id: 1,
      name: "Devis",
      qtt: "255",
      montant: 25897.55,
      percent: 30,
    },
    {
      id: 2,
      name: "Commandes",
      qtt: "354",
      montant: 84525.55,
      percent: 50,
    },
    {
      id: 3,
      name: "En Productions",
      qtt: "120",
      montant: 387892.55,
      percent: 20,
    },
  ];

  const chartConfig = {
    backgroundColor: "#1cc910",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // no decimals
    color: (opacity = 1) => `rgba(0,0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          justifyContent:"space-between",
          alignItems: "center",
          flexGrow:1,
          padding:20
        }}
      >
        <Svg
          width={220}
          height={140}
          viewBox="0 30 120 40"
          style={{ position: "relative" }}
        >
          <Circle
            cx="50"
            cy="0"
            r={radius}
            stroke="#1AB394"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetProd}
            strokeLinecap="butt"
            rotation="180"
            origin="55,50"
          />

          <Circle
            cx="50"
            cy="0"
            r={radius}
            stroke="#FF744A"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetcommandes}
            strokeLinecap="butt"
            rotation="180"
            origin="55,50"
          />
          <Circle
            cx="50"
            cy="0"
            r={radius}
            stroke="#D9D9D9"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetDevis}
            strokeLinecap="butt"
            rotation="180"
            origin="55,50"
          />
        </Svg>
        <Text style={{ position: "absolute", top: 120 }}>675 projets </Text>
        {/* <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Sales Bar Chart
          </Text> */}

        <BarChart
          style={{
          
            borderRadius: 16,
          }}
          data={data}
          width={width-10}
          height={300}
          yAxisLabel="%"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          withCustomBarColorFromData={true}
          flatColor={true}
          fromZero={true}
        />
        <View style={styles.detailsContainer}>
          {bills.map((bill) => (
            <View style={styles.billInfo} key={bill.id}>
              <View style={styles.billInfoLeft}>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text>{bill.name}: </Text>
                  <Text style={{ fontWeight: "bold" }}>223</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text>Montant: </Text>
                  <Text style={{ fontWeight: "bold" }}>{bill.montant} $</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>{bill.percent} %</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "column",
    gap: 5,
    padding: 10,
    width: "100%",
    // backgroundColor:'red'
  },
  billInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 5,
  },
});
