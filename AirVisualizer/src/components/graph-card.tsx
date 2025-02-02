import { cn } from "../lib/utils";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useRef, useState } from "react";
import { PlotterT } from "../lib/zustand/store";

export default function GraphCard({
  title = "Graph1",
  primaryColor = "#262626",
  disabled = true,
  plotter
}: {
  title: string;
  primaryColor: string;
  disabled: boolean;
  plotter: PlotterT;
}) {
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const [graphWidHei, setGraphWidHei] = useState({
    width: 500,
    height: 300,
  });
  // const [realData, setRealData] = useState<any[]>([]);

  useEffect(() => {
    if (graphContainerRef.current)
      setGraphWidHei({
        width: graphContainerRef.current.clientWidth,
        height: Math.floor(graphContainerRef.current.clientHeight * 0.8),
      });
  }, [graphContainerRef]);

  // const realDataAdder = useCallback((data: number)=>{
  //   setRealData(realData => {
  //     const newData = [...(realData.length > 10 ? realData.slice(1) : realData), {
  //     uv: Math.floor(data),
  //     }];
  //     return newData;
  //   });
  // }, [setRealData])


  return (
    <div
      aria-disabled={disabled}
      style={{
        outlineColor: primaryColor,
      }}
      className={cn(
        "min-h-56 rounded-lg flex flex-col px-3 py-2 mb-2 first:mt-0.5 relative bg-white aria-disabled:opacity-60 aria-disabled:hover:outline-1 last:mb-0 outline hover:outline-[2px] transition-all"
      )}
    >
      {disabled ? (
        <span className="absolute inset-0 justify-center flex items-center">
          <span>No data available</span>
        </span>
      ) : null}
      <div>
        <span
          style={{
            color: primaryColor,
          }}
          className={cn("text-sm font-bold capitalize")}
        >
          {title}
        </span>
      </div>
      <div ref={graphContainerRef} className="container pt-5">
        {!disabled ? (
          <LineChart
            margin={{
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
            }}
            width={graphWidHei.width}
            height={graphWidHei.height}
          >
            <Line
              data={plotter.plots}
              dot={false}
              activeDot
              connectNulls
              isAnimationActive={false}
              type="monotone"
              dataKey="uv"
              stroke={primaryColor}
            />
            <CartesianGrid
              strokeOpacity={0.5}
              className="stroke-neutral-300"
              strokeWidth={0.5}
            />
            <XAxis fontSize={12} strokeWidth={0.5} />
            <YAxis fontSize={12} strokeWidth={0.5} />
          </LineChart>
        ) : null}
      </div>
    </div>
  );
}
