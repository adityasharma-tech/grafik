import { useCallback, useEffect, useRef } from "react";
import { useDialogHook } from "../hooks/dialog-hooks";
import useAppState from "../lib/store";
import { IDBPDatabase, openDB } from "idb";
import { DB_NAME, DB_VERSION } from "../lib/db";

export default function Header() {
  const dialog = useDialogHook();
  const state = useAppState();

  const isRunning = useRef(false);
  const db = useRef<IDBPDatabase<unknown> | null>(null);

  const addLogData = useCallback(
    async (deviceId: number, loggerId: number, message: string) => {
      try {
        if (!db.current) db.current = await openDB(DB_NAME, DB_VERSION);
        await db.current.add("logs", {
          deviceId: deviceId.toString(),
          loggerId: loggerId.toString(),
          message,
          timestamp: new Date(),
        });
      } catch (error: any) {
        console.error(`Error occured during logging data: ${error.message}`);
      }
    },
    [db, openDB, Date, DB_NAME, DB_VERSION]
  );

  const addPlotData = useCallback(
    async (deviceId: number, plotterId: number, dataPoint: number) => {
      try {
        if (!db.current) db.current = await openDB(DB_NAME, DB_VERSION);
        await db.current.add("plots", {
          plotterId: plotterId.toString(),
          dataPoint,
          timestamp: new Date(),
        });
      } catch (error: any) {
        console.error(
          `Error occured during adding plotting data: ${error.message}`
        );
      }
    },
    [db, openDB, DB_NAME, DB_VERSION]
  );

  const runPort = useCallback(
    async (port: any, index: number) => {
      if (!(window.navigator && "serial" in navigator)) return;
      try {
        try {
          await port.open({ baudRate: 9600 });
        } catch (error) {}
        const reader = port.readable.getReader();
        let buffer = "";
        while (true) {
          // @ts-ignore
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          if (isRunning.current == false) {
            console.log("Is this correct.", isRunning);
            await reader.releaseLock();
            await port.close();
            break;
          }
          const decodedValue = new TextDecoder().decode(value);
          buffer += decodedValue;

          let messages = buffer.split(";;");
          buffer = messages.pop() || "";
          for (const msg of messages) {
            // console.log(msg)
            const [meta, data] = msg.split("\t:");
            if (meta && data) {
              const [deviceId, dataType, dataId] = meta.split(" ");
              if (
                deviceId &&
                dataType &&
                dataId &&
                deviceId.trim() != "" &&
                dataType.trim() != "" &&
                dataId.trim() != ""
              ) {
                // console.log(`Data is here, ${deviceId} ${dataId} ${data} ${dataType}`)
                switch (dataType) {
                  case "plot":
                    await addPlotData(+deviceId.trim(), +dataId.trim(), +data);
                    break;
                  case "log":
                    await addLogData(+deviceId.trim(), +dataId.trim(), data);
                    break;
                }
              }
            }
          }
        }
      } catch (error: any) {
        console.error(
          `Error during running port index: ${index}: `,
          error.message
        );
      }
    },
    [window, navigator, state.running, TextDecoder, isRunning]
  );

  useEffect(() => {
    if (!state.running) return;
    (async () => {
      isRunning.current = true;
      await Promise.all(
        state.ports.map((portData, index) => runPort(portData.port, index))
      );
    })();
  }, [state.running]);

  useEffect(() => {
    isRunning.current = state.running;
  }, [state.running]);

  return (
    <header className="h-16 pt-1 bg-gradient-to-b from-[#F6F6F6] to-white items-center flex justify-between px-10">
      <div className="flex gap-x-4">
        <div className="flex items-center">
          <img src="https://avatar.iran.liara.run/public" className="h-8 w-8" />
        </div>
        <div className="flex flex-col py-2">
          <span
            style={{
              lineHeight: "16px",
            }}
            className="text-sm font-medium"
          >
            Aditya Sharma
          </span>
          <span className="text-neutral-500 text-[10px]">Developer</span>
        </div>
      </div>
      <div className="flex gap-x-5 items-center">
        <div className="flex border rounded-xl bg-white font-medium border-[#D8D8D8] overflow-hidden">
          <button
            type="button"
            onClick={dialog?.tooglePlotterDialog}
            className="hover:bg-neutral-100 bg-white px-5 pl-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none"
          >
            New Plotter
          </button>
          <div className="border-l border-[#D8D8D8]" />
          <button
            type="button"
            onClick={dialog?.toogleLoggerDialog}
            className="hover:bg-neutral-100 bg-white px-5 pr-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none"
          >
            New Logger
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={dialog?.toogleAttachDeviceDialog}
            className="hover:bg-neutral-100 rounded-xl border border-[#D8D8D8] font-medium bg-white px-5 pl-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none"
          >
            Attach Device
          </button>
        </div>
        <button
          onClick={state.toogleRunning}
          data-running={state.running ? "true" : "false"}
          className="hover:bg-gray-800 min-w-44 data-[running='true']:bg-rose-700 data-[running='true']:border-rose-800 data-[running='true']:animate-pulse rounded-xl border border-[#141414] text-white font-medium bg-black px-5 pl-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none"
        >
          {state.running ? `Running...` : `Start Monitoring`}
        </button>
        <button className="hover:bg-neutral-200 cursor-pointer rounded-lg w-9 transition-colors flex justify-center items-center h-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            className="h-5 w-5 my-auto"
            viewBox="0 0 32 32"
          >
            <path d="M16 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM6 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM26 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
