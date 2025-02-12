import { create } from "zustand";
import { DeviceT, PortT } from "./types";

interface AppState {
  ports: PortT[];
  devices: DeviceT[];
  running: boolean;
  restarting: boolean;
  toogleRestarting: ()=>void;
  setPorts: (data: PortT[]) => void;
  toogleRunning: () => void;
  attachDevices: (data: DeviceT[]) => void;
  setDeviceId: (data: { deviceId: number; portIndex: number }) => void;
  newPlotter: (data: { deviceId: number; plotterId: number }) => void;
  removePlotter: (data: { deviceId: number; plotterId: number }) => void;
  newLogger: (data: { deviceId: number; loggerId: number }) => void;
  removeLogger: (data: { deviceId: number; loggerId: number }) => void;
  addPlottingData: (
    data: {
      deviceId: number;
      plotterId: number;
      dataPoint: number;
    },
    MAX_POINTS?: number
  ) => void;
  addLogMessage: (
    data: {
      deviceId: number;
      loggerId: number;
      logT?: number;
      message: string;
    },
    MAX_POINTS?: number
  ) => void;
}

const useAppState = create<AppState>()((set) => ({
  ports: [],
  devices: [],
  running: false,
  restarting: true,
  setPorts: (data) => set(() => ({ ports: data })),
  toogleRunning: () => set((state) => ({ running: !state.running })),
  toogleRestarting: () => set((state) => ({ restarting: !state.restarting })),
  attachDevices: (devices) => set(() => ({ devices })),
  setDeviceId: (data) =>
    set((state) => {
      const devices = state.devices;
      devices[data.portIndex].deviceId = data.deviceId;
      return { devices };
    }),
  newPlotter: () =>
    set(() => {
      return {};
    }),
  addLogMessage: () => {},
  addPlottingData: () => {},
  newLogger: () => {},
  removeLogger: () => {},
  removePlotter: () => {},
}));

export default useAppState;
