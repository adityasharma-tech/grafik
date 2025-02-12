import React, { useCallback, useState } from "react";
import { demoPlotters } from "../../lib/constants";
import PlotterCard from "./plotter-card";
import { moveElementDown, moveElementUp } from "../../lib/utils";

export default function PlotterGroup() {
  const [plotters, setPlotters] = useState(demoPlotters)

  const goUp = useCallback((index: number)=>{
    const np = [...plotters]
    setPlotters(moveElementUp(np, index))
  }, [setPlotters, moveElementUp, plotters])

  const goDown = useCallback((index: number)=>{
    const np = [...plotters]
    setPlotters(moveElementDown(np, index))
  }, [setPlotters, moveElementDown, plotters])

  React.useEffect(()=>{
console.log(plotters)
  },[plotters])

  return (
    <div className="w-[70%]">
      {plotters.map((plotter, idx) => (
        <PlotterCard goUp={goUp} goDown={goDown} key={idx} index={idx} {...plotter} />
      ))}
    </div>
  );
}
