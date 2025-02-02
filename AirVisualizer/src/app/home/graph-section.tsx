import { useState } from "react";
import GraphCard from "../../components/graph-card";
import { useDataState } from "../../lib/zustand/store";
import AddGraphModal from "./add-graph-modal";

export default function GraphSection() {
  const ports = useDataState((state) => state.ports);
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section className="h-full w-full overflow-y-auto px-1">
      {
        ports.length > 0 && ports[0].devices.map((device, index) => (
          <GraphCard
            key={index}
            device={device}
            disabled={false}
            primaryColor="#000"
            title="Arduino UNO"
          />
        ))
      }
      <div>
        <div onClick={()=>setIsOpen(!isOpen)} className="text-center py-10 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg border-dotted border border-neutral-400 ">
          <span>Add new plotter</span>
        </div>
        <AddGraphModal isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </section>
  );
}
