import { FormEventHandler, useEffect, useState } from "react";
import LogMessage from "../../components/log-message";
import useAppState, { useDataState } from "../../lib/zustand/store";
import PermissionSection from "./permission-section";

export default function LogsSection() {
  const allInfo = useAppState((state) => state.infos);

  const dataState = useDataState((state) => state);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };

   const [updateTrigger, setUpdateTrigger] = useState(0)
    useEffect(()=>{
      const interval = setInterval(()=>{
        setUpdateTrigger(prev=>Math.random()+prev)
        console.log(JSON.stringify(dataState.ports))
      }, 100)
  
      return () =>{
        clearInterval(interval);
      }
    }, [dataState])
  

  return (
    <section className="h-full md:w-[800px] w-full">
      <div className="border flex flex-col mb-1 border-neutral-400 bg-white min-h-[40%] rounded-lg">
        <div className="py-1 text-center text-sm bg-neutral-50 mx-1 my-1 text-neutral-800 rounded-lg">
          <span>messages</span>
        </div>
        <div key={updateTrigger} className="h-full mt-auto max-h-[55vh] overflow-y-auto">
          {dataState.ports.map((port, dx) =>
            port.loggers.map((logger, idx) =>
              logger.logs.map((log, jdx) => (
                <LogMessage
                  key={`${dx}-${idx}-${jdx}`}
                  message={log.log}
                  port={logger.loggerId.toString()}
                  primaryColor={logger.color ?? "#000"}
                  timestamp={log.timestamp}
                />
              ))
            )
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-1 flex gap-x-1">
          <select className="rounded-lg px-2 py-1 h-8 text-sm border max-w-22 truncate font-medium">
            <option value="adxl3xx">ADXL3xx accelerometer</option>
            <option value="pir-sensor">PIR sensor</option>
            <option value="hc-sr04-ultrasonic-sensor">
              C-SR04 ultrasonic sensor
            </option>
          </select>

          <input
          disabled
            type="text"
            className="w-full rounded-lg px-2 disabled:opacity-50 cursor-not-allowed py-1 h-8 text-sm focus:outline-none border focus:bg-zinc-50 transition-all"
            placeholder="Send message"
          />
          <button className="rounded-lg disabled:opacity-50 bg-gray-100 px-1 border hover:bg-gray-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.5 12H5.42m-.173.797L4.242 15.8c-.55 1.643-.826 2.465-.628 2.971.171.44.54.773.994.9.523.146 1.314-.21 2.894-.92l10.135-4.561c1.543-.695 2.314-1.042 2.553-1.524a1.5 1.5 0 0 0 0-1.33c-.239-.482-1.01-.83-2.553-1.524L7.485 5.243c-1.576-.71-2.364-1.064-2.887-.918a1.5 1.5 0 0 0-.994.897c-.198.505.074 1.325.618 2.966l1.026 3.091c.094.282.14.423.159.567a1.5 1.5 0 0 1 0 .385c-.02.144-.066.285-.16.566Z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="border flex flex-col border-neutral-400 mt-2 bg-white rounded-lg p-2 gap-y-2 max-h-[40%] overflow-y-auto">
        {allInfo.map((info, index) => (
          <div
            className="bg-blue-100 rounded-lg text-sm px-3 py-2 flex justify-between"
            key={index}
          >
            <span>{info.message}</span>
            <span className="rounded-full bg-blue-500 text-xs items-center flex justify-center w-5 h-5 text-white">
              {info.count}
            </span>
          </div>
        ))}

        {allInfo.length <= 0 ? <div> No info messages yet.</div> : null}
      </div>
      <PermissionSection />
    </section>
  );
}
