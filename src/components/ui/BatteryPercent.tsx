import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";
import CircularProgress from "./circularProgress";

export const BatteryPercent = ({ percent }: { percent: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <CustomText bold style={{ fontSize: 18 }}>
          Battery
        </CustomText>
        <CustomText style={{ fontSize: 12 }}> 2 hrs remaining</CustomText>
      </View>
      <CircularProgress
        percentage={85}
        radius={25}
        strokeWidth={7}
        progressColor="#2563EB"
        fillColor="#F8FAFC"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 102,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  left: {
    display: "flex",
    justifyContent: "space-between",
  },
});
