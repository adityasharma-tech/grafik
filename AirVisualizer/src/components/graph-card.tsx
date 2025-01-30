import { cn } from "../lib/utils";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { demoGraphData } from "../lib/constants";
import { useCallback, useEffect, useRef, useState } from "react";

export default function GraphCard({
  title = "Graph1",
  primaryColor = "#262626",
  disabled = true,
}) {
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const [graphWidHei, setGraphWidHei] = useState({
    width: 500,
    height: 300,
  });
  const [setDemoData] = useState(demoGraphData)
  useEffect(() => {
    if (graphContainerRef.current)
      setGraphWidHei({
        width: graphContainerRef.current.clientWidth,
        height: Math.floor(graphContainerRef.current.clientHeight * 0.8),
      });
  }, [graphContainerRef]);

  const demoDataAdder = useCallback(()=>{
    setDemoData(demoData => {
      const newData = [...demoData.slice(1), {
      name: `Page ${demoData.length + 1}`,
      uv: Math.floor(Math.random() * 4000),
      pv: Math.floor(Math.random() * 4000),
      amt: Math.floor(Math.random() * 4000),
      }];
      return newData;
    });
  }, [setDemoData])

  useEffect(()=>{
    const interval = setInterval(demoDataAdder, 200)
    return ()=>{
      clearInterval(interval)
    }
  }, [setDemoData])

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
            <Line isAnimationActive type="monotone" dataKey="pv" stroke={primaryColor} />
            <CartesianGrid strokeOpacity={0.5} className="stroke-neutral-300" strokeWidth={0.5}/>
            <XAxis fontSize={12} strokeWidth={0.5} />
            <YAxis fontSize={12} strokeWidth={0.5} />
          </LineChart>
        ) : null}
      </div>
    </div>
  );
}
