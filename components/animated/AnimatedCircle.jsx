import React, { useRef, useCallback } from "react";
import { Animated, Easing } from "react-native";
import { Circle } from "react-native-svg";
import { useFocusEffect } from "expo-router";

// Animated SVG circle component
const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);

export default function AnimatedCircle({
  radius,
  strokeWidth,
  strokeColor,
  percent,
  delay = 0,
  duration = 1000,
}) {
  const circumference = 2 * Math.PI * radius;
  const animValue = useRef(new Animated.Value(circumference)).current;

  useFocusEffect(
    useCallback(() => {
      // When the tab gains focus → restart animation
      const offset = circumference - (circumference * percent) / 200;

      Animated.timing(animValue, {
        toValue: offset,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();

      // Optional: reset when unfocused (so it replays next time)
      return () => {
        animValue.setValue(circumference);
        
      };
    }, [percent])
  );

  return (
    <AnimatedSvgCircle
      cx="50"
      cy="0"
      r={radius}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray={circumference}
      strokeDashoffset={animValue}
      rotation="180"
      origin="55,50"
    />
  );
}
