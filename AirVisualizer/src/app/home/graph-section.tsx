import GraphCard from "../../components/graph-card";
import { useDataState } from "../../lib/zustand/store";

export default function GraphSection() {
  const ports = useDataState((state) => state.ports);
  return (
    <section className="h-full w-full overflow-y-auto px-1">
      {ports.map((port) =>
        port.devices.map((device, index) => (
          <GraphCard
            key={index}
            device={device}
            disabled={false}
            primaryColor="#000"
            title="Arduino UNO"
          />
        ))
      )}
    </section>
  );
}
