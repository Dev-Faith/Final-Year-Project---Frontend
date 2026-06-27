import { useMemo } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { useDispatch } from "react-redux";
import { addDevice, startScan, stopScan } from "../store/bleSlice";

export function useBLE() {
  // 1. Initialize the BleManager EXACTLY once
  const bleManager = useMemo(() => new BleManager(), []);
  const dispatch = useDispatch();

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === "ios") {
      return true; // iOS handles the pop-up automatically
    }

    if (Platform.OS === "android") {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      // For Android 11 and older
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      // For Android 12 and newer
      if (apiLevel >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        return (
          result["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }
    return false;
  };

  const scanForDevices = async () => {
    // 1. Ask for permissions FIRST
    const isGranted = await requestBluetoothPermissions();

    if (!isGranted) {
      Alert.alert(
        "Permission Denied",
        "Wakatech needs Bluetooth permissions to find the walking stick.",
        [{ text: "OK" }],
      );
      return; // Stop the function if they hit "Deny"
    }

    const btState = await bleManager.state();

    if (btState === "PoweredOff") {
      Alert.alert(
        "Bluetooth is Off",
        "Please turn on your phone's Bluetooth to connect to the walking stick.",
        [{ text: "OK" }],
      );
      return; // Stop the function so it doesn't crash
    }

    bleManager.stopDeviceScan();

    dispatch(startScan());

    // 2. Start scanning!
    // The first argument is the Service UUIDs. 'null' means scan for EVERYTHING nearby.
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Bluetooth Scan Error:", error);
        dispatch(stopScan());
        return;
      }

      // 3. If we find a device, and it actually has a name, send it to Redux!
      if (device && device.name) {
        dispatch(addDevice({ id: device.id, name: device.name }));
      }
    });

    // 4. Automatically stop scanning after 10 seconds to save battery
    setTimeout(() => {
      bleManager.stopDeviceScan();
      dispatch(stopScan());
    }, 10000);
  };

  return { scanForDevices };
}
