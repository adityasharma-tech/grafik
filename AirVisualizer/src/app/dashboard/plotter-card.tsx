import { useCallback, useEffect, useRef, useState } from "react";
import useAppState from "../../lib/store";
import { IDBPDatabase, openDB } from "idb";
import { DB_NAME, DB_VERSION } from "../../lib/db";
import ReactEcharts from "./graph";

interface PlotterCardPropT {
  plotterId: string;
  plotterName?: string;
  color?: string;
  goUp: (idx: number) => void;
  goDown: (idx: number) => void;
  index: number;
}

export default function PlotterCard(props: PlotterCardPropT) {
  const running = useAppState((state) => state.running);
  const restarting = useAppState((state) => state.restarting);
  const toogleRestarting = useAppState((state) => state.toogleRestarting);
  const isRunning = useRef(false);
  const isRestarting = useRef(true);

  const indexDb = useRef<IDBPDatabase<undefined> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [plottingData, setPlottingData] = useState<any[]>([]);

  const [maximized, setMaximized] = useState<boolean>(false);

  const handleDataReading = useCallback(async () => {
    try {
      if (!isRunning.current) return;
      if (!indexDb.current) indexDb.current = await openDB(DB_NAME, DB_VERSION);
      if (isRestarting.current) {
        setPlottingData((data) => [...data, null])
        toogleRestarting()
        isRestarting.current = false;
      };

      if (indexDb.current.objectStoreNames.contains("plots")) {
        const data = await indexDb.current.getAllFromIndex(
          "plots",
          "plotterId",
          props.plotterId.toString()
        );
        const result = data
          .splice(data.length > 400 ? -200 : 0)
          .map((data) => ({
            name: new Date(+data.timestamp).getTime(),
            value: [+data.timestamp, +data.dataPoint],
          }));
        setPlottingData(result);
      }
    } catch (error: any) {
      console.error(`Error during reading plotters data: ${error.message}`);
    }
  }, [isRunning, indexDb, openDB, DB_NAME, DB_VERSION, setPlottingData, props]);

  useEffect(() => {
    const interval = setInterval(async () => await handleDataReading(), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    isRunning.current = running;
    isRestarting.current = restarting;
  }, [running, restarting]);
  return (
    <div
      ref={containerRef}
      className={`border overflow-hidden border-[#e2e2e2] rounded-xl px-3 py-2 first:mt-0 mt-3 ${maximized ? "bg-white z-10 inset-20 absolute" : "relative bg-neutral-50/20 h-64"}`}
    >
      <div className="flex justify-between">
        <span className="text-sm font-medium">
          {props.plotterName?.trim() === ""
            ? props.plotterId
            : props.plotterName?.trim()}
        </span>
        <div className="flex gap-x-0.5">
          <button
            disabled={props.index <= 0}
            type="button"
            onClick={() => props.goUp(props.index)}
            className="rounded-md hover:bg-neutral-100 disabled:opacity-20 opacity-60 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17V8M16 11l-4-4-4 4"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => props.goDown(props.index)}
            className="rounded-md hover:bg-neutral-100 disabled:opacity-20 opacity-60 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17V8M16 11l-4-4-4 4"
              />
            </svg>
          </button>
          <button type="button" onClick={()=>setMaximized(!maximized)} className="rounded-md h-6 w-6 ml-1.5 flex justify-center items-center hover:bg-neutral-100 opacity-60 hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 ${maximized ? "rotate-180" : "rotate-0"}`}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 4H6a2 2 0 0 0-2 2v7m16 2v3a2 2 0 0 1-2 2h-7m-7-7v5a2 2 0 0 0 2 2h5m-7-7h7v7m9-16-6.5 6.5M20 4h-4m4 0v4"
              />
            </svg>
          </button>
        </div>
      </div>
      <ReactEcharts
        height={
          containerRef.current
            ? containerRef.current.clientHeight - 35
            : undefined
        }
        option={{
          tooltip: {
            trigger: "axis",
            formatter: function (params: any) {
              params = params[0];
              const date = new Date(params.data.name);
              return (
                date.getHours() +
                ":" +
                (date.getMinutes() + 1) +
                ":" +
                date.getSeconds() +
                " : " +
                params.value[1]
              );
            },
            axisPointer: {
              animation: false,
            },
          },
          grid: {
            left: 40,
            right: 40,
            bottom: 30,
            top: 0,
          },
          xAxis: {
            type: "time",
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              name: "Data",
              type: "line",
              showSymbol: false,
              data: plottingData,
              connectNulls: false,
            },
          ],
        }}
        loading={false}
      />
    </div>
  );
}
