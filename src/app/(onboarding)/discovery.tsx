import { CustomButton } from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useBLE } from "../../hooks/useBLE";
import { RootState } from "../../store/store";

interface Device {
  id: string;
  name: string | null;
}

export default function DiscoveryScreen() {
  const router = useRouter();

  const { scanForDevices, connectToDevice, checkConnectedDevices } = useBLE();
  const isScanning = useSelector((state: RootState) => state.ble.isScanning);

  const devices = useSelector(
    (state: RootState) => state.ble.discoveredDevices,
  );
  const connectionStatus = useSelector(
    (state: RootState) => state.ble.connectionStatus,
  );

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleSelectDevice = (device: Device) => {
    console.log(`Selected ${device.id}`);
    setSelectedDevice(device);
  };

  const handlePairDevice = async () => {
    if (!isScanning && devices.length === 0) {
      scanForDevices();
    } else if (!isScanning && devices.length > 0) {
      console.log("Proceed to pair the selected device!");
    }

    if (selectedDevice) {
      await connectToDevice(selectedDevice);
    }
  };

  useEffect(() => {
    if (connectionStatus === "connected") {
      console.log("Navigating to networkSetup...");
      return router.replace("/networkSetup");
    }
  }, [connectionStatus]);

  useEffect(() => {
    scanForDevices();
    setTimeout(() => !isScanning && setMounted(true), 3000);

    const initBLE = async () => {
      // 1. First, check if the stick is already connected in the background
      const activeDevices = await checkConnectedDevices();

      // 2. If nothing is connected, THEN turn on the scanner to find one
      if (activeDevices.length === 0) {
        scanForDevices();
      }
    };

    initBLE();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* NEW: A row to hold the title and the refresh button */}
        <View style={styles.headerRow}>
          <CustomText style={styles.h2} bold>
            Let's link your device.
          </CustomText>
        </View>

        <CustomText style={styles.body}>
          Bring the walking stick close to your phone. Press and hold the
          pairing button on the stick's handle for 3 seconds.
        </CustomText>
      </View>
      {/* Dynamic Main Content Area */}
      {isScanning && !mounted ? (
        <View style={styles.centerContent}>
          <Image
            source={require("@/assets/images/radio.png")}
            style={[{ width: 363, height: 363 }, styles.image]}
          />
          <CustomText style={[styles.body, { textAlign: "center" }]}>
            Searching for your device...
          </CustomText>
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <View style={styles.refreshBtnContainer}>
            {/* THE REFRESH BUTTON */}
            <Pressable
              onPress={scanForDevices}
              disabled={isScanning}
              style={({ pressed }) => [
                styles.refreshButton,
                pressed && styles.refreshButtonPressed,
              ]}
            >
              <Ionicons
                name="refresh"
                size={26}
                color={isScanning ? "#CBD5E1" : "#3B82F6"}
              />
            </Pressable>
          </View>
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              // Using Pressable for native-feeling feedback
              <Pressable
                style={({ pressed }) => [
                  styles.deviceCard,
                  selectedDevice?.id === item.id && styles.deviceCardSelected, // Applies when selected
                  pressed && styles.deviceCardPressed, // Applies when finger is down
                ]}
                onPress={() => handleSelectDevice(item)}
              >
                <View>
                  <CustomText bold style={styles.deviceName}>
                    {item.name || "Unknown Device"}
                  </CustomText>
                  <CustomText style={styles.deviceId}>{item.id}</CustomText>
                </View>

                <View style={styles.connectBadge}>
                  <CustomText style={styles.connectBadgeText} bold>
                    {connectionStatus === "connecting" &&
                    selectedDevice?.id === item.id
                      ? "Linking..."
                      : selectedDevice?.id === item.id
                        ? "Selected"
                        : "Select"}
                  </CustomText>
                </View>
              </Pressable>
            )}
            // What to show if the scan finishes but finds nothing
            ListEmptyComponent={
              <View style={styles.centerContent}>
                <CustomText style={[styles.body, { textAlign: "center" }]}>
                  No devices found. Ensure the stick is in pairing mode and try
                  again.
                </CustomText>
              </View>
            }
          />
        </View>
      )}

      <CustomButton
        title={
          isScanning
            ? "Scanning..."
            : devices.length > 0
              ? selectedDevice
                ? connectionStatus === "connecting"
                  ? "Linking..."
                  : "Pair Device"
                : "Select Device"
              : "Search Again"
        }
        variant={isScanning || !selectedDevice ? "secondary" : "primary"}
        style={{ marginTop: 24, width: "100%" }}
        disabled={isScanning || connectionStatus === "connecting"}
        // Added the logic to rescan if nothing was found!
        onPress={handlePairDevice}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between", // Pushes header to top, button to bottom
    padding: 24,
    paddingTop: 60, // Safe area buffer
    backgroundColor: "#F8FAFC",
  },
  refreshBtnContainer: {
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 16, // Matches the main background
  },
  h2: {
    fontSize: 24,
  },
  body: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 26,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
  },
  image: {
    alignSelf: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  // --- New List & Card Styles ---
  listWrapper: {
    flex: 1,
    width: "100%",
    marginTop: 32,
  },
  listContent: {
    gap: 16,
    paddingBottom: 20,
  },
  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceCardPressed: {
    backgroundColor: "#F1F5F9",
    transform: [{ scale: 0.98 }],
  },
  deviceCardSelected: {
    backgroundColor: "#E0F2FE",
    borderColor: "#3B82F6",
  },

  deviceName: {
    fontSize: 18,
    color: "#0F172A",
    marginBottom: 4,
  },
  deviceId: {
    fontSize: 14,
    color: "#64748B",
  },
  connectBadge: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  connectBadgeText: {
    color: "#3B82F6",
    fontSize: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  refreshButton: {
    display: "flex",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    backgroundColor: "#EFF6FF",
  },
  refreshButtonPressed: {
    backgroundColor: "#DBEAFE",
    transform: [{ scale: 0.9 }],
  },
});
