import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import CustomText from "./CustomText";

interface CircularProgressProps {
  percentage: number;
  radius?: number;
  strokeWidth?: number;
  progressColor?: string;
  fillColor?: string;
}

export default function CircularProgress({
  percentage,
  radius = 50,
  strokeWidth = 15,
  progressColor = "#2563EB",
  fillColor = "#F8FAFC",
}: CircularProgressProps) {
  // Math for the SVG circle
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Calculate how much of the blue stroke should be hidden
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ width: halfCircle * 2, height: halfCircle * 2 }}>
      <Svg
        width={halfCircle * 2}
        height={halfCircle * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        {/* Background Inner Circle (The light gray part) */}
        <Circle cx="50%" cy="50%" r={radius} fill={fillColor} />

        {/* Foreground Progress Arc (The blue part) */}
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          // FIX: Combined rotation and origin into a single, modern transform string!
          transform={`rotate(-4 ${halfCircle} ${halfCircle})`}
        />
      </Svg>

      {/* The Text exactly in the middle */}
      <View style={styles.textContainer}>
        <CustomText style={styles.percentageText}>{percentage}%</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 16,
    color: "#0F172A",
  },
});
