import { create } from "zustand";

type InfoT = {
  count: number;
  message: string;
};
interface AppState {
  infos: InfoT[];
  addInfo: (i: string) => void;
}

type LogT = {
  log: string;
  timestamp: Date;
};

type LoggerT = {
  loggerId: number;
  logs: LogT[];
};

export type PlotT = {
  dataPoint: number;
  timestamp: Date;
};

export type PlotterT = {
  plotterId: number;
  plots: PlotT[];
};

export type PortT = {
  port: any;
  deviceId?: number;
  loggers: LoggerT[];
  plotters: PlotterT[];
};

interface DataState {
  ports: PortT[];
  running: boolean;
  setPorts: (data: PortT[]) => void;
  createPort: (data: PortT) => void;
  destroyPort: (data: PortT) => void;
  toogleRunning: () => void;
  setDeviceId: (data: { deviceId: number; portIndex: number }) => void;
  addPlotter: (data: { deviceId: number; plotterId: number }) => void;
  addLogger: (data: { deviceId: number; loggerId: number }) => void;
  addPlottingData: (data: {
    deviceId: number;
    plotterId: number;
    dataPoint: number;
  }) => void;
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
  running: false,
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
    

  toogleRunning: () => set((state) => ({ running: !state.running })),

  setDeviceId: (data) =>
    set((state) => {
      const ports = state.ports;
      ports[data.portIndex].deviceId = data.deviceId;
      console.log("setDeviceId",ports, data)
      return { ports };
    }),

  addPlotter: (data) =>
    set((state) => {
      let ports = state.ports;
      console.log("before ports: ", ports);
      const plotters = ports.find(
        (value) => value.deviceId == data.deviceId
      )?.plotters;

      const plotter = plotters?.find(
        (value) => value.plotterId == data.plotterId
      );

      if (!plotter) {
        plotters?.push({
          plots: [],
          plotterId: data.plotterId,
        });
      }
      console.log("after ports: ", ports);
      return { ports };
    }),

  addLogger: (data) =>
    set((state) => {
      let ports = state.ports;
      console.log("before ports: ", ports);
      const loggers = ports.find(
        (value) => value.deviceId == data.deviceId
      )?.loggers;

      const logger = loggers?.find((value) => value.loggerId == data.loggerId);

      if (!logger) {
        loggers?.push({
          logs: [],
          loggerId: data.loggerId,
        });
      }
      console.log("after ports: ", ports);
      return { ports };
    }),

  addPlottingData: (data) =>
    set((state)=>{
      const MAX_POINTS = 100;
    const portIndex = state.ports.findIndex((val) => val.deviceId === data.deviceId);
    
    if (portIndex === -1) return state;
    
    const ports = [...state.ports];
    const port = {...ports[portIndex]};
    const plotters = [...(port.plotters || [])];
    
    const plotterIndex = plotters.findIndex(val => val.plotterId === data.plotterId);
    if (plotterIndex === -1) return state;
    
    const plotter = {
      ...plotters[plotterIndex],
      plots: [
        ...(plotters[plotterIndex].plots.length >= MAX_POINTS 
          ? plotters[plotterIndex].plots.slice(1) 
          : plotters[plotterIndex].plots),
        {
          dataPoint: data.dataPoint,
          timestamp: new Date()
        }
      ]
    };
    
    plotters[plotterIndex] = plotter;
    port.plotters = plotters;
    ports[portIndex] = port;
    
    return { ports };
    })
}));

export { useDataState };

export default useAppState;
