import GraphCard from "../../components/graph-card";
import { useDataState } from "../../lib/zustand/store";

export default function GraphSection({
  setIsOpen,
}: {
  setIsOpen: (val: boolean) => void;
}) {
  const ports = useDataState((state) => state.ports);
  return (
    <section className="h-full w-full overflow-y-auto px-1">
      {ports.map((port) =>
        port.devices.map((device, index) => (
          <GraphCard
            key={index}
            port={port.port}
            device={device}
            disabled={false}
            primaryColor="#000"
            title="Arduino UNO"
          />
        ))
      )}
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-center w-full bg-neutral-200 hover:bg-neutral-300 transition-colors text-sm py-2 disabled:opacity-40 rounded-lg"
        >
          Add custom graph
        </button>
      </div>
    </section>
  );
}
