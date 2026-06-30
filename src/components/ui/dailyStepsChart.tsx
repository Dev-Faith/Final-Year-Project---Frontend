import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import CustomText from "./CustomText";

export default function DailyStepsChart({ style }: { style?: object }) {
  // Gifted Charts expects data in this specific format
  const chartData = [
    { value: 65, label: "Mon" },
    { value: 30, label: "Tue" },
    { value: 50, label: "Wed" },
    { value: 25, label: "Thu" },
    { value: 60, label: "Fri" },
    { value: 15, label: "Sat" },
    { value: 20, label: "Sun" },
  ];

  return (
    <View style={[styles.card, style]}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <CustomText bold style={styles.title}>
          Daily Steps
        </CustomText>
        <Pressable style={styles.filterButton}>
          <CustomText style={styles.filterText}>Weekly</CustomText>
          <Ionicons name="chevron-forward" size={16} color="#0F172A" />
        </Pressable>
      </View>

      {/* --- CHART AREA --- */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          height={100}
          width={280} // Adjust based on your typical screen width, or use Dimensions.get('window').width
          // Styling the line
          color="#3B82F6"
          thickness={2}
          // Hiding the extra chart elements to achieve your minimalist look
          hideDataPoints={true}
          hideRules={true}
          hideYAxisText={true}
          hideAxesAndRules={true}
          // Styling the X-axis labels
          xAxisLabelTextStyle={styles.labelText}
          // Adding a smooth curve to the line (optional, but looks great!)
          isAnimated={true}
          animationDuration={1200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: "#0F172A",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    color: "#0F172A",
  },
  chartContainer: {
    alignItems: "center", // Centers the chart inside the card
    marginLeft: -20, // Offsets the default left padding from the library
  },
  labelText: {
    fontSize: 14,
    color: "#0F172A",
    fontFamily: "artkinson-regular",
  },
});
