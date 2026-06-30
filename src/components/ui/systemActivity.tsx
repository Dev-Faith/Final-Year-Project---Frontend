import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

export const SystemActivity = ({ style }: { style?: any }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={require("@/assets/images/dashboard-stick.png")}
      />
      <View style={styles.headerContainer}>
        <View style={styles.activeIndicator}></View>
        <CustomText bold style={{ fontSize: 16 }}>
          System Active
        </CustomText>
      </View>
      <View style={styles.bottomContainer}>
        <CustomText style={{fontSize: 12}}>Walking stick is on!</CustomText>
        <View>
          <Ionicons name="settings-outline" size={20} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    overflow: "hidden",
    width: "100%",
    height: 102,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between"
  },
  image: {
    width: 148,
    height: 148,
      position: "absolute",
    left: 120
  },
  activeIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 10,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bottomContainer: {
    marginTop: 16,
    display: "flex",
      flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
