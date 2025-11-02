import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function AnimatedBarChart({ data, chartConfig }) {
  const { width } = Dimensions.get("window");
  const values = data.datasets[0].data;

  // Local state to trigger chart re-renders
  const [animatedValues, setAnimatedValues] = useState(values.map(() => 0));

  // Create animated refs
  const animValues = useRef(values.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // When data changes → reset to 0
    animValues.forEach((anim) => anim.setValue(0));

    // Define animations
    const animations = animValues.map((anim, i) =>
      Animated.timing(anim, {
        toValue: values[i],
        duration: 1000,
        delay: 0,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      })
    );

    // Launch staggered animation
   setTimeout(() => {
  Animated.stagger(100, animations).start();
}, 100)

    // Listen for value changes → update React state to re-render
    const listeners = animValues.map((anim, i) =>
      anim.addListener(({ value }) => {
        setAnimatedValues((prev) => {
          const copy = [...prev];
          copy[i] = value;
          return copy;
        });
      })
    );

    // Cleanup
    return () => {
      listeners.forEach((_, i) => animValues[i].removeAllListeners());
    };
  }, [JSON.stringify(values)]); // 👈 rerun when dataset changes

  // Inject animated values into chart data
  const animatedData = {
    ...data,
    datasets: [{ ...data.datasets[0], data: animatedValues }],
  };


  return (
    <BarChart
      style={{ borderRadius: 16 }}
      data={animatedData}
      width={width - 10}
      height={300}
      yAxisLabel=""
      chartConfig={chartConfig}
      verticalLabelRotation={30}
      withCustomBarColorFromData
      flatColor
      fromZero
    />
  );
}
