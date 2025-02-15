import React, { useCallback, useState } from "react";
import useAppState from "../../lib/store";
import { openDB } from "idb";
import { DB_NAME, DB_VERSION, initializeDatabase } from "../../lib/db";
import { getRandomColor } from "../../lib/utils";
import { rgba } from 'polished'

export default function PerformanceSummaryCard() {
  const totalPorts = useAppState((state) => state.ports.length);

  const [data, setData] = useState<{
    plotters?: number;
    loggers?: number;
    logs?: number;
    plots?: number;
  }>({});

  const [randomId, setRandomId] = useState(Math.random());

  const getPerformanceDetails = useCallback(async () => {
    try {
      const db = await initializeDatabase();

      const localData: {
        plotters?: number;
        loggers?: number;
        logs?: number;
        plots?: number;
      } = {}

      if (db.objectStoreNames.contains("loggers"))
        localData.loggers = (await db.getAll("loggers")).length

      if (db.objectStoreNames.contains("plotters"))
        localData.plotters = (await db.getAll("plotters")).length

      if (db.objectStoreNames.contains("plots"))
        localData.plots = (await db.getAll("plots")).length

      if (db.objectStoreNames.contains("logs"))
        localData.logs = (await db.getAll("logs")).length
    
      setData(localData)
    } catch (error: any) {
      console.error(`Failed to get performance details: ${error.message}`);
    } finally {
      setRandomId(Math.random());
    }
  }, [openDB, DB_NAME, DB_VERSION, setData, setRandomId]);

  React.useEffect(() => {
    const interval = setInterval(
      async () => await getPerformanceDetails(),
      2000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="borde border-[#D8D8D8] py-3 mb-3 bg-white px-5 rounded-xl">
      <div>
        <span>Performance Summary</span>
      </div>
      <div key={randomId} className="flex w-full justify-between py-5 lg:pr-14">
        <PerformancePointSpan
          label="Ports"
          content={totalPorts?.toString()}
          desc="All"
        />
        <PerformancePointSpan
          label="Loggers"
          content={data?.loggers?.toString() ?? "0"}
          desc="All"
        />
        <PerformancePointSpan
          label="Plotters"
          content={data?.plotters?.toString() ?? "0"}
          desc="All"
        />
        <PerformancePointSpan
          label="Logs"
          content={data?.logs?.toString() ?? "0"}
          desc="Info type"
        />
        <PerformancePointSpan
          label="Plots"
          content={data?.plots?.toString() ?? "0"}
          desc="Datapoints"
        />
      </div>
    </section>
  );
}

const PerformancePointSpan = (perf: {
  label: string;
  desc: string;
  content: string;
}) => {
  return (
    <div>
      <div
        className="border-l-2 flex flex-col gap-y-1 px-2"
        style={{
          borderColor: rgba(getRandomColor(), 0.3),
        }}
      >
        <span className="text-sm">{perf.label}</span>
        <span className="text-xs text-neutral-400">{perf.desc}</span>
      </div>
      <div className="mt-4 text-black font-medium text-lg">
        <span>{perf.content}</span>
      </div>
    </div>
  );
};
