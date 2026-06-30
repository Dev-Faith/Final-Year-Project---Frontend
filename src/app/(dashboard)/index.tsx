import { BatteryPercent } from "@/components/ui/BatteryPercent";
import DailyStepsChart from "@/components/ui/dailyStepsChart";
import { NotificationBtn } from "@/components/ui/notificationBtn";
import { SystemActivity } from "@/components/ui/systemActivity";
import { WifiConnection } from "@/components/ui/wifiConnection";
import { StyleSheet, View } from "react-native";
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
      <DailyStepsChart style={{ marginTop: 32 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
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
  },
});
