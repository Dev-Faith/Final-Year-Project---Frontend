import { BatteryPercent } from "@/components/ui/BatteryPercent";
import CustomText from "@/components/ui/CustomText";
import DailyStepsChart from "@/components/ui/dailyStepsChart";
import { NotificationBtn } from "@/components/ui/notificationBtn";
import { RecentActivities } from "@/components/ui/recentActivity";
import { SystemActivity } from "@/components/ui/systemActivity";
import { WifiConnection } from "@/components/ui/wifiConnection";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const handlePress = () => {
    console.log("Pressed the notification button");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notificationContainer}>
        <NotificationBtn onPress={handlePress} style={{}} />
      </View>
      <SystemActivity style={{ marginTop: 32 }} />
      <View style={styles.connectionContainer}>
        <BatteryPercent percent={75} />
        <WifiConnection isConnected={true} />
      </View>
      <DailyStepsChart style={{ marginTop: 16 }} />
      <View style={styles.locateBtnContainer}>
        <Pressable style={styles.locateBtn}>
          <Ionicons name="location-outline" size={24} color="#2563EB" />
          <CustomText style={{ color: "#2563EB", fontSize: 18 }}>
            Locate on Map
          </CustomText>
        </Pressable>
      </View>
      <RecentActivities />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
    overflow: "hidden",
  },
  notificationContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  connectionContainer: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    // backgroundColor: "red"
  },
  locateBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 20, 
  },
  locateBtnContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginVertical: 16,
  },
});
