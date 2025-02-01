import { create } from 'zustand'

type InfoT = {
  count: number;
  message: string;
}

interface AppState {
  infos: InfoT[];
  addInfo: (i: string) => void;
  graphs: [];
  ports: any[];
  setPorts: (i: any)=>void;
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
  }),
  graphs: [],
  ports: [],
  setPorts: (info) => set(()=>({ports: info}))
}))

export default useAppState;
