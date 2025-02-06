import { demoPlotters } from "../../lib/constants";
import PlotterCard from "./plotter-card";

export default function PlotterGroup() {
  return (
    <div className="w-[70%]">
      {demoPlotters.map((plotter) => (
        <PlotterCard key={plotter.plotterId} {...plotter} />
      ))}
    </div>
  );
}
