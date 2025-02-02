import { create } from 'zustand'

type InfoT = {
  count: number;
  message: string;
}

type DeviceT = {
  id: string; // unique id
}

type PortT = {
  port: any;
  devices: DeviceT[]
}

interface AppState {
  infos: InfoT[];
  addInfo: (i: string) => void;
}

interface DataState {
  ports: PortT[];
  setPorts: (data: PortT[]) => void;
  createPort: (data: PortT) => void;
  destroyPort: (data: PortT) => void;
}

const useAppState = create<AppState>()((set) => ({
  infos: [],
  addInfo: (info) => set((state) => {
    const newInfosState = state.infos; 

    let countUpdate = false;

    newInfosState.forEach(i=>{
      if(i.message == info){
        i.count += 1;
        countUpdate = true;
      }
    })

    if(countUpdate){
      return { infos: newInfosState }
    }

    newInfosState.push({
      count: 1,
      message: info
    })    
    return { infos: newInfosState }
  })
}))

const useDataState = create<DataState>()((set) => ({
  ports: [],
  setPorts: (data) => set(()=>({ ports: data })),
  createPort: (data) => set((state)=>{
    const ports = state.ports;
    ports.forEach((port)=>{
      if(port.port == data.port) {
        console.warn("Port already exists.");
        return {};
      }
    })
    
    return { ports: [data] }
  }),
  destroyPort: (data) => set((state)=>{
    const ports = state.ports;
    return {ports: ports.filter((port)=>port.port == data.port)}
  })
}))

export {
  useDataState
}

export default useAppState;
