import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface BleDevice {
  id: string; // The MAC address
  name: string | null;
}

interface BleState {
  isScanning: boolean;
  discoveredDevices: BleDevice[];
  connectedDevice: BleDevice | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
}

const initialState: BleState = {
  isScanning: false,
  discoveredDevices: [],
  connectedDevice: null,
  connectionStatus: 'disconnected',
};

const bleSlice = createSlice({
  name: 'ble',
  initialState,
  reducers: {
    startScan: (state) => {
      state.isScanning = true;
      state.discoveredDevices = []; // Clear the old list when a new scan starts
    },
    stopScan: (state) => {
      state.isScanning = false;
    },
    addDevice: (state, action: PayloadAction<BleDevice>) => {
      // Only add the device if we haven't seen it already
      const deviceExists = state.discoveredDevices.find((d) => d.id === action.payload.id);
      if (!deviceExists) {
        state.discoveredDevices.push(action.payload);
      }
    },
    setConnectionStatus: (state, action: PayloadAction<'disconnected' | 'connecting' | 'connected' | 'error'>) => {
      state.connectionStatus = action.payload;
    },
    setConnectedDevice: (state, action: PayloadAction<BleDevice | null>) => {
      state.connectedDevice = action.payload;
    },
  },
});

export const { startScan, stopScan, addDevice, setConnectionStatus, setConnectedDevice } = bleSlice.actions;
export default bleSlice.reducer;