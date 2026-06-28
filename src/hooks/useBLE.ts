import { Alert, PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { useDispatch } from "react-redux";
import {
  addDevice,
  BleDevice,
  setConnectedDevice,
  setConnectionStatus,
  startScan,
  stopScan,
} from "../store/bleSlice";
import {encode} from "base-64";

const bleManager = new BleManager();

// const WALKING_STICK_SERVICE_UUID = ["00001234-0000-1000-8000-00805f9b34fb"];
const WALKING_STICK_SERVICE_UUID = ["1234"];

// NEW: The exact Mailbox (Characteristic) on the stick that listens for Wi-Fi data
// (You must define this in your Raspberry Pi / ESP32 code as well!)
const WIFI_CHARACTERISTIC_UUID = "00005678-0000-1000-8000-00805f9b34fb";

export function useBLE() {
  const dispatch = useDispatch();

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === "ios") {
      return true; // iOS handles the pop-up automatically
    }

    if (Platform.OS === "android") {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

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

  const checkConnectedDevices = async () => {
    try {
      const activeConnections = await bleManager.connectedDevices(
        WALKING_STICK_SERVICE_UUID,
      );

      if (activeConnections.length > 0) {
        console.log("Found active connections:", activeConnections);
        dispatch(setConnectedDevice(activeConnections[0]));
        dispatch(setConnectionStatus("connected"));
        return activeConnections;
      } else {
        console.log("No walking sticks are currently connected.");
        return [];
      }
    } catch (error) {
      console.log("Error checking connected devices:", error);
      return [];
    }
  };

  const scanForDevices = async () => {
    const isGranted = await requestBluetoothPermissions();

    if (!isGranted) {
      Alert.alert(
        "Permission Denied",
        "Wakatech needs Bluetooth permissions to find the walking stick.",
        [{ text: "OK" }],
      );
      return;
    }

    const btState = await bleManager.state();

    if (btState === "PoweredOff") {
      Alert.alert(
        "Bluetooth is Off",
        "Please turn on your phone's Bluetooth to connect to the walking stick.",
        [{ text: "OK" }],
      );
      return;
    }

    bleManager.stopDeviceScan();
    dispatch(startScan());

    bleManager.startDeviceScan(
      WALKING_STICK_SERVICE_UUID,
      null,
      (error, device) => {
        if (error) {
          console.log("Bluetooth Scan Error:", error);
          dispatch(stopScan());
          return;
        }

        if (device && device.name) {
          dispatch(addDevice({ id: device.id, name: device.name }));
        }
      },
    );

    setTimeout(() => {
      bleManager.stopDeviceScan();
      dispatch(stopScan());
    }, 10000);
  };

  const connectToDevice = async (device: BleDevice) => {
    try {
      dispatch(setConnectionStatus("connecting"));

      bleManager.stopDeviceScan();
      dispatch(stopScan());

      console.log(`Connecting to ${device.name}...`);
      const connectedDevice = await bleManager.connectToDevice(device.id, {
        timeout: 5000,
      });

      await connectedDevice.discoverAllServicesAndCharacteristics();

      dispatch(setConnectedDevice(device));
      dispatch(setConnectionStatus("connected"));
      console.log("Successfully connected and ready to send data!");
    } catch (error) {
      console.log("Failed to connect:", error);
      dispatch(setConnectionStatus("error"));
      Alert.alert(
        "Connection Failed",
        "Could not connect to the walking stick. Please ensure it is turned on and try again.",
      );
    }
  };


  const sendWiFiCredentials = async (deviceId: string, ssid: string, pass: string) => {
    try {
      // 1. Package the data into a standard JSON string
      const wifiData = JSON.stringify({ ssid: ssid, pass: pass });
      
      // 2. Translate the text into Base64 for the Bluetooth antenna
      const base64Data = encode(wifiData);

      console.log(`Sending credentials to device: ${deviceId}...`);

      // 3. Fire the packet over the airwaves!
      await bleManager.writeCharacteristicWithResponseForDevice(
        deviceId,
        WALKING_STICK_SERVICE_UUID[0], // The "Building"
        WIFI_CHARACTERISTIC_UUID,      // The "Mailbox"
        base64Data                     // The "Letter"
      );

      console.log("Transmission Successful!");
      return true;

    } catch (error) {
      console.log("Transmission failed:", error);
      Alert.alert("Transmission Failed", "Could not send wifi credentials to the stick. Please stay close and try again.");
      return false;
    }
  };

  return { scanForDevices, connectToDevice, checkConnectedDevices, sendWiFiCredentials };
}
