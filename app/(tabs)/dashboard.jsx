import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Svg, { Circle } from "react-native-svg";
export default function dashboard() {
  let percentPayed = 50;
  let percentDelay = 30;
  const { width, height } = Dimensions.get("window");
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentPayed) / 200;
  const strokeDashoffsetDelay =
    circumference - (circumference * (percentPayed + percentDelay)) / 200;
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    
    ],
  };

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
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          width={180}
          height={140}
          viewBox="0 40 100 70"
          style={{ position: "relative" }}
        >
          <Circle
            cx="50"
            cy="0"
            r={radius}
            stroke="#D9D9D9"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference / 2}
            strokeLinecap="butt"
            rotation="180"
            origin="50,50"
          />
          <Circle
            cx="50"
            cy="0"
            r={radius}
            stroke="#1AB394"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetDelay}
            strokeLinecap="butt"
            rotation="180"
            origin="50,50"
          />
          <Circle
            cx="50"
            cy="0"
            r={radius}
            stroke="#FF744A"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            rotation="180"
            origin="50,50"
          />
        </Svg>
        <Text style={{ position: "absolute", top: 60 }}>675 projets </Text>
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
              marginVertical: 8,
              borderRadius: 16,
            }}
            data={data}
            width={width-20}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
