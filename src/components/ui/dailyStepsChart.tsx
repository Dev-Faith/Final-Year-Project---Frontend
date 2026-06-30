import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import CustomText from "./CustomText";

export default function DailyStepsChart({ style }: { style?: object }) {
  const [chartWidth, setChartWidth] = useState(0);
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
      <View
        style={styles.chartContainer}
        onLayout={(e) => setChartWidth(e.nativeEvent.layout.width-20)}
      >
        {/* 4. Only render the chart once we have a width greater than 0 */}
        {chartWidth > 0 && (
          <LineChart
            data={chartData}
            height={100}
            width={chartWidth}
            // --- THE MAGIC MATH ---
            // Divide the available width by the number of gaps between data points.
            // (We subtract a little buffer so the text labels don't get clipped on the edges)
            initialSpacing={10}
            spacing={(chartWidth - 20) / (chartData.length - 1)}
            color="#3B82F6"
            thickness={2}
            hideDataPoints={true}
            hideRules={true}
            hideYAxisText={true}
            hideAxesAndRules={true}
            xAxisLabelTextStyle={styles.labelText}
            isAnimated={true}
            animationDuration={1200}
          />
        )}
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
    width: "100%",
    // backgroundColor: "red",
    alignItems: "center", // Centers the chart inside the card
    // marginLeft: -20, // Offsets the default left padding from the library
  },
  labelText: {
    fontSize: 14,
    color: "#0F172A",
    fontFamily: "artkinson-regular",
  },
});
