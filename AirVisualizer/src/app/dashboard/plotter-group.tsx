import { useCallback, useEffect, useRef, useState } from "react";
import PlotterCard from "./plotter-card";
import { moveElementDown, moveElementUp } from "../../lib/utils";
import { IDBPDatabase, openDB } from "idb";
import { DB_NAME, DB_VERSION } from "../../lib/db";

export default function PlotterGroup() {
  const [plotters, setPlotters] = useState<any[]>([]);

  const goUp = useCallback(
    (index: number) => {
      const np = [...plotters];
      setPlotters(moveElementUp(np, index));
    },
    [setPlotters, moveElementUp, plotters]
  );

  const goDown = useCallback(
    (index: number) => {
      const np = [...plotters];
      setPlotters(moveElementDown(np, index));
    },
    [setPlotters, moveElementDown, plotters]
  );

  const indexDb = useRef<IDBPDatabase<undefined> | null>(null);

  const getAllPlotters = useCallback(async () => {
    try {
      if (!indexDb.current) indexDb.current = await openDB(DB_NAME, DB_VERSION);

      if (indexDb.current.objectStoreNames.contains("plotters")) {
        const result = await indexDb.current.getAll("plotters");
        setPlotters(result);
      }
    } catch (error: any) {
      console.error(`Failed to get plotter data: ${error.message}`);
    }
  }, [indexDb, openDB, DB_NAME, DB_VERSION, setPlotters]);

  useEffect(() => {
    const interval = setInterval(async () => await getAllPlotters(), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-[70%]">
      {plotters.map((plotter, idx) => (
        <PlotterCard
          goUp={goUp}
          goDown={goDown}
          key={idx}
          index={idx}
          {...plotter}
        />
      ))}
      {plotters.length <= 0 ? (
        <div className="flex flex-col gap-y-5 justify-center items-center min-h-[50%]">
            <svg className="w-20 h-20 fill-neutral-300" viewBox="0 0 32 32">
              <path d="M29.5 7A2.5 2.5 0 0027 9.5c0 .284.058.551.144.805l-6.094 5.247a2.473 2.473 0 00-3.294.16l-4.774-2.39a2.493 2.493 0 10-4.742 1.23l-4.867 5.612a2.481 2.481 0 00-.873-.166 2.5 2.5 0 102.314 1.561l4.946-5.685c.236.073.48.124.74.124.727 0 1.377-.316 1.834-.813l4.669 2.341A2.5 2.5 0 0022 17.497c0-.044-.011-.086-.013-.13l6.503-5.587a2.5 2.5 0 101.01-4.784z" />
            </svg>
            <span className="text-center text-xl font-medium text-neutral-500">
              No plotters added yet.
            </span>
        </div>
      ) : null}
    </div>
  );
}
