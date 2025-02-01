import { cn } from "../lib/utils";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useCallback, useEffect, useRef, useState } from "react";

export default function GraphCard({
  title = "Graph1",
  primaryColor = "#262626",
  disabled = true,
  port,
}: {
  port: any;
  title: string;
  primaryColor: string;
  disabled: boolean;
}) {
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const [graphWidHei, setGraphWidHei] = useState({
    width: 500,
    height: 300,
  });
  const [realData, setRealData] = useState<any[]>([]);

  useEffect(() => {
    if (graphContainerRef.current)
      setGraphWidHei({
        width: graphContainerRef.current.clientWidth,
        height: Math.floor(graphContainerRef.current.clientHeight * 0.8),
      });
  }, [graphContainerRef]);

  const realDataAdder = useCallback((data: number)=>{
    setRealData(realData => {
      const newData = [...(realData.length > 10 ? realData.slice(1) : realData), {
      uv: Math.floor(data),
      }];
      return newData;
    });
  }, [setRealData])

  // useEffect(()=>{
  //   const interval = setInterval(demoDataAdder, 200)
  //   return ()=>{
  //     clearInterval(interval)
  //   }
  // }, [setDemoData])

  const portDataHandler = useCallback(async () => {
    console.log("port", port);
    await port.open({ baudRate: 9600 });
    const reader = port.readable.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        // Allow the serial port to be closed later.
        break;
      }
      const decoder = new TextDecoder();
      const decodedText = decoder.decode(value)
      decodedText.split(`\n`).forEach((e)=>{
        if(e.trim() == "") return;
        console.log(`Current data: ${e.trim()}`)
        realDataAdder(Number(e.trim()))
      })
    }
  }, [port]);

  useEffect(() => {
    if (!(window.navigator && "serial" in navigator)) return;
    (async () => await portDataHandler())();
  }, [portDataHandler, port]);

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
              data={realData}
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
