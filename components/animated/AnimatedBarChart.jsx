import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function AnimatedBarChart({ data, chartConfig }) {
  const { width } = Dimensions.get("window");
  const values = data.datasets[0].data;
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 100]);
  const animValues = useRef(values.map(() => new Animated.Value(0))).current;
  // const animValue = useRef(new Animated.Value(0)):.current;

  // useEffect(() => {
  //   Animated.timing(animValue, {
  //     toValue: 50,
  //     duration: 1000,
  //     easing: Easing.out(Easing.cubic),
  //     useNativeDriver: false,
  //   }).start();
    
  // }, []);
  // useEffect(() => {
    
  //   setAnimatedValues([animValue,0,0,100])
  //   console.log(animValue);
    
  // }, [animValue])
  
  // console.log(animatedValues);
  useFocusEffect(
    useCallback(() => {
      // When data changes → reset to 0
      animValues.forEach((anim) => anim.setValue(0));

      // Define animations
      const animations = animValues.map((anim, i) =>
        Animated.timing(anim, {
          toValue: values[i],
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        })
      );

      // Launch staggered animation
  Animated.sequence(animations.reverse()).start();

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
        setAnimatedValues([0,0,0,0])
      };
    }, [JSON.stringify(values)]) // 👈 rerun when dataset changes
  )
  //   // Inject animated values into chart data
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
      showBarTops={false}
    />
  );
}
