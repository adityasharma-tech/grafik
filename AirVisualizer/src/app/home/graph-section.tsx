import GraphCard from "../../components/graph-card";
import useAppState from "../../lib/zustand/store";

export default function GraphSection({setIsOpen}: {setIsOpen: (val: boolean)=>void}) {
  const ports = useAppState((state)=>state.ports)
  return (
    <section className="h-full w-full overflow-y-auto px-1">
      {ports.map((port, index)=><GraphCard key={index}
        disabled={false}
        title="ADXL3xx accelerometer"
        primaryColor="#c70036"
        port={port}
      />)}
      <div>
        <button onClick={()=>setIsOpen(true)} className="text-center w-full bg-neutral-200 hover:bg-neutral-300 transition-colors text-sm py-2 disabled:opacity-40 rounded-lg">
          Add custom graph
        </button>
      </div>
    </section>
  );
}
