import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatTime } from "../../lib/utils";
import { IDBPDatabase, openDB } from "idb";
import { DB_NAME, DB_VERSION } from "../../lib/db";
import { LogMessageT } from "../../lib/types";
import useAppState from "../../lib/store";

export default function LogsSection() {
  const [data, setData] = useState<LogMessageT[]>([]);

  const running = useAppState((state) => state.running);
  const logContainer = useRef<HTMLDivElement | null>(null);
  const indexDb = useRef<IDBPDatabase | null>(null);

  const [maximized, setMaximized] = useState(false);

  const handleDataReading = useCallback(async () => {
    try {
      if (!indexDb.current) indexDb.current = await openDB(DB_NAME, DB_VERSION);
      if (indexDb.current.objectStoreNames.contains("logs"))
        setData(await indexDb.current.getAll("logs"));
    } catch (error: any) {
      console.error(
        `An error occured during assigning plotter: ${error.message}`
      );
    } finally {
      if(running){
        if (logContainer.current)
          logContainer.current.scrollTop = logContainer.current.scrollHeight;
      }
    }
  }, [openDB, DB_NAME, DB_VERSION, setData, logContainer, indexDb, running]);

  const handleClearLogDataBase = useCallback(async () => {
    try {
      if (running)
        throw new Error("Could not clear logs while running database.");
      if (!indexDb.current) indexDb.current = await openDB(DB_NAME, DB_VERSION);
      await indexDb.current.clear("logs");
    } catch (error: any) {
      console.error(
        `Error occurred during clearing log database: ${error.message}`
      );
    }
  }, [openDB, DB_NAME, DB_VERSION, running, setData, indexDb]);

  useEffect(() => {
    const timeout = setInterval(async () => await handleDataReading(), 100);
    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <React.Fragment>
      {maximized ? <div className="z-10 bg-black/10 backdrop-blur-xs inset-0 fixed" /> : null}
      <div
        className={`borde flex flex-col border-[#e2e2e2] rounded-xl px-3 py-2 ${
          maximized
            ? "fixed z-20 inset-16 bg-white/50 backdrop-blur-md"
            : "relative bg-white max-h-[65vh] min-h-[55vh] w-full"
        }`}
      >
        <div className="flex justify-between">
          <span className="text-sm font-medium">Log messages</span>
          <div className="flex gap-x-0.5">
            <button
              onClick={handleClearLogDataBase}
              disabled={running}
              className="rounded-md disabled:opacity-40 disabled:cursor-not-allowed h-6 w-6 ml-1.5 flex justify-center items-center hover:bg-neutral-100 opacity-60 hover:opacity-100"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 12a8 8 0 0112.407-6.678L6.075 17.376A7.97 7.97 0 014 12zm3.593 6.678A8 8 0 0017.925 6.624L7.593 18.678zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                  fill="#000"
                />
              </svg>
            </button>
            <button className="rounded-md h-6 w-6 ml-1.5 flex justify-center items-center hover:bg-neutral-100 opacity-60 hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 "
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#000"
                  strokeWidth={2}
                  d="M19 3H5c-1.414 0-2.121 0-2.56.412C2 3.824 2 4.488 2 5.815v.69c0 1.037 0 1.556.26 1.986.26.43.733.698 1.682 1.232l2.913 1.64c.636.358.955.537 1.183.735.474.411.766.895.898 1.49.064.284.064.618.064 1.285v2.67c0 .909 0 1.364.252 1.718.252.355.7.53 1.594.88 1.879.734 2.818 1.101 3.486.683.668-.417.668-1.372.668-3.282v-2.67c0-.666 0-1 .064-1.285a2.68 2.68 0 0 1 .899-1.49c.227-.197.546-.376 1.182-.735l2.913-1.64c.948-.533 1.423-.8 1.682-1.23.26-.43.26-.95.26-1.988v-.69c0-1.326 0-1.99-.44-2.402C21.122 3 20.415 3 19 3Z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMaximized(!maximized)}
              className="rounded-md h-6 w-6 ml-1.5 flex justify-center items-center hover:bg-neutral-100 opacity-60 hover:opacity-100"
            >
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
        <div
          ref={logContainer}
          className="flex flex-col flex-grow gap-y-2 py-1 overflow-y-scroll"
        >
          {data.slice(-100).map((log, idx) => (
            <LogMessage key={idx} {...log} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

function LogMessage(props: LogMessageT) {
  return (
    <div
      style={{
        borderLeftColor:
          props.logType == "log"
            ? "oklch(0.627 0.194 149.214)"
            : props.logType == "error"
            ? "oklch(0.577 0.245 27.325)"
            : props.logType == "warn"
            ? "oklch(0.681 0.162 75.834)"
            : undefined,
      }}
      className="flex justify-between bg-neutral-50 rounded-md border-l-2 px-1.5 py-1"
    >
      <span className="text-neutral-800">{props.message}</span>
      <div className="flex gap-x-2">
        <span className="text-neutral-500 text-sm self-center">
          {formatTime(props.timestamp)}
        </span>
        <span>[{props.loggerId}]</span>
      </div>
    </div>
  );
}
