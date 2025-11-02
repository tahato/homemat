import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Circle } from "react-native-svg";

const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);

export default function AnimatedCircle({
  percent = 0,
  radius = 50,
  strokeWidth = 5,
  color = "#000",
  delay = 0,
  duration = 1000,
  rotation = 180,
  origin = "55,50",
}) {
  const circumference = 2 * Math.PI * radius;
  const anim = useRef(new Animated.Value(circumference)).current;

  useEffect(() => {
    const offset = circumference - (circumference * percent) / 100;

    Animated.timing(anim, {
      toValue: offset,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [percent]);

  return (
    <AnimatedSvgCircle
      cx="50"
      cy="0"
      r={radius}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray={circumference}
      strokeDashoffset={anim}
      rotation={rotation}
      origin={origin}
    />
  );
}
