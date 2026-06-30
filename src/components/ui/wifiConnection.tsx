import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

export const WifiConnection = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <View style={styles.container}>
      <CustomText bold style={{ fontSize: 18 }}>
        Wifi connection
      </CustomText>
      <CustomText style={{ fontSize: 12 }}> Est. 3mb/s</CustomText>
      <Ionicons name="wifi" size={24} color={isConnected ? "#2563eb" : "red"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 102,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
});
