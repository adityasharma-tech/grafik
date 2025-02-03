import { useState } from "react";
import GraphCard from "./graph-card";
import { useDataState } from "../../lib/zustand/store";
import AddGraphModal from "./add-graph-modal";
import AddLoggerModal from "./add-logger-modal";

export default function GraphSection() {
  const ports = useDataState((state) => state.ports);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenL, setIsOpenL] = useState(false);
  
  return (
    <section className="h-full w-full overflow-y-auto px-1">
      {
        ports.map((device, index) => (
          device.plotters.map((plotter, idx)=><GraphCard
            key={`${index}-${idx}`}
            plotter={plotter}
            disabled={false}
            primaryColor="#000"
            title="Arduino UNO"
          />)
        ))
      }
      <div>
        <div className="text-center bg-gray-50 cursor-pointer rounded-lg flex justify-evenly my-2">
          <div onClick={()=>setIsOpen(!isOpen)} className="hover:bg-gray-200 py-10 w-full border border-dashed border-neutral-300 transition-colors rounded-l-lg">Add new plotter</div>
          <div onClick={()=>setIsOpenL(!isOpenL)} className="hover:bg-gray-200 py-10 w-full border border-dashed border-neutral-300 transition-colors rounded-r-lg">Add new logger</div>
        </div>
        <AddGraphModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        <AddLoggerModal isOpen={isOpenL} setIsOpen={setIsOpenL}/>
      </div>
    </section>
  );
}
