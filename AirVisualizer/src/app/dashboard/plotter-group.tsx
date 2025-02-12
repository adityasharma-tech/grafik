import { useCallback, useEffect, useRef, useState } from "react";
import PlotterCard from "./plotter-card";
import { moveElementDown, moveElementUp } from "../../lib/utils";
import { IDBPDatabase, openDB } from "idb";
import { DB_NAME, DB_VERSION } from "../../lib/db";

export default function PlotterGroup() {
  const [plotters, setPlotters] = useState<any[]>([])

  const goUp = useCallback((index: number)=>{
    const np = [...plotters]
    setPlotters(moveElementUp(np, index))
  }, [setPlotters, moveElementUp, plotters])

  const goDown = useCallback((index: number)=>{
    const np = [...plotters]
    setPlotters(moveElementDown(np, index))
  }, [setPlotters, moveElementDown, plotters])

  const indexDb = useRef<IDBPDatabase<undefined>|null>(null)

  const getAllPlotters = useCallback(async ()=>{ 
    try {
      if(!indexDb.current) indexDb.current = await openDB(DB_NAME, DB_VERSION)
      
        if(indexDb.current.objectStoreNames.contains("plotters")){
           const result = await indexDb.current.getAll("plotters");
           setPlotters(result);
        }
    } catch (error: any) {
      console.error(`Failed to get plotter data: ${error.message}`)
    }
  },[indexDb, openDB, DB_NAME, DB_VERSION, setPlotters])

  useEffect(()=>{
   const timeout = setTimeout(async ()=>await getAllPlotters(), 1000)
   return () =>{ 
    clearTimeout(timeout)
   }
  }, [])

  return (
    <div className="w-[70%]">
      {plotters.map((plotter, idx) => (
        <PlotterCard goUp={goUp} goDown={goDown} key={idx} index={idx} {...plotter} />
      ))}
    </div>
  );
}
