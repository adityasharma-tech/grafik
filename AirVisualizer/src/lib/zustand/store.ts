import { create } from "zustand";

type InfoT = {
  count: number;
  message: string;
};
interface AppState {
  infos: InfoT[];
  addInfo: (i: string) => void;
}

export type DeviceT = {
  id?: number; // unique id
  loggerId?: number; // unique id
  plotterId?: number; // unique id
  plottingData: number[];
  logsData: string[];
};

export type PortT = {
  port: any;
  devices: DeviceT[];
};

interface DataState {
  ports: PortT[];
  running: boolean;
  setPorts: (data: PortT[]) => void;
  createPort: (data: PortT) => void;
  destroyPort: (data: PortT) => void;
  toogleRunning: () => void;
  addData: (
    data: {
      deviceId: number;
      dataType: string;
      dataId: number;
      data: string;
    },
    index: number
  ) => void;
}

const useAppState = create<AppState>()((set) => ({
  infos: [],
  addInfo: (info) =>
    set((state) => {
      const newInfosState = state.infos;

      let countUpdate = false;

      newInfosState.forEach((i) => {
        if (i.message == info) {
          i.count += 1;
          countUpdate = true;
        }
      });

      if (countUpdate) {
        return { infos: newInfosState };
      }

      newInfosState.push({
        count: 1,
        message: info,
      });
      return { infos: newInfosState };
    }),
}));

const useDataState = create<DataState>()((set) => ({
  ports: [],
  setPorts: (data) => set(() => ({ ports: data })),
  createPort: (data) =>
    set((state) => {
      const ports = state.ports;
      ports.forEach((port) => {
        if (port.port == data.port) {
          return {};
        }
      });
      return { ports: [data] };
    }),
  destroyPort: (data) =>
    set((state) => {
      const ports = state.ports;
      return { ports: ports.filter((port) => port.port == data.port) };
    }),
  running: false,
  toogleRunning: () => set((state) => ({ running: !state.running })),
  addData: () =>
    set((state) => {
      const ports = state.ports;
      // let port = ports[index];
      // console.log(data, index)
      // switch (data.dataType) {
      //   case "plot":
      //     const pDeviceIndex = port.devices.findIndex(
      //       (d) => d.plotterId === data.dataId
      //     );
      //     if (pDeviceIndex != -1) {
      //       port.devices[pDeviceIndex].plottingData = [
      //         ...port.devices[pDeviceIndex].plottingData,
      //         +data.data,
      //       ];
      //     } else {
      //       port.devices = [
      //         ...port.devices,
      //         {
      //           logsData: [],
      //           plottingData: [+data.data],
      //           id: data.deviceId,
      //           plotterId: data.dataId,
      //         },
      //       ];
      //     }
      //   case "log":
      //     const deviceIndex = port.devices.findIndex(
      //       (d) => d.loggerId === data.dataId
      //     );
      //     if (deviceIndex != -1) {
      //       port.devices[deviceIndex].logsData = [
      //         ...port.devices[deviceIndex].logsData,
      //         data.data,
      //       ];
      //     } else {
      //       port.devices = [
      //         ...port.devices,
      //         {
      //           logsData: [data.data],
      //           plottingData: [],
      //           id: data.deviceId,
      //           loggerId: data.dataId,
      //         },
      //       ];
      //     }
      // }
      return { ports };
    }),
}));

export { useDataState };

export default useAppState;
