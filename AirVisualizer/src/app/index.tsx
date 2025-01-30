import React from "react";
import Header from "../components/header";
import GraphCard from "../components/graph-card";
import Message from "../components/message";

export default function Home() {
  return (
    <div className="p-1 flex flex-col gap-1 h-screen w-screen overflow-x-hidden overflow-y-auto">
      <Header />
      <main className="flex md:flex-row flex-col gap-2 h-full">
        <section className="h-full w-full overflow-y-auto px-1">
          <GraphCard disabled={false} title="ADXL3xx accelerometer" primaryColor="#c70036" />
          <GraphCard title="PIR sensor" primaryColor="#a65f00" />
          <GraphCard title="HC-SR04 ultrasonic sensor" primaryColor="#104e64" />
          <div>
            <button className="text-center w-full bg-neutral-200 hover:bg-neutral-300 transition-colors text-sm py-2 disabled:opacity-40 rounded-lg">
              Add custom graph
            </button>
          </div>
        </section>
        <section className="h-full min-w-xl">
          <div className="border flex flex-col border-neutral-400 bg-white min-h-[40%] rounded-lg">
            <div className="py-1 text-center text-sm bg-neutral-50 mx-1 my-1 text-neutral-800 rounded-lg">
              <span>messages</span>
            </div>
            <div className="h-full mt-auto">
              <Message
                primaryColor="#c70036"
                message="Temperature sensor active"
                port={"ADXL3xx accelerometer"}
                timestamp={new Date()}
              />
              <Message
                primaryColor="#a65f00"
                message="Humidity levels normal"
                port={"PIR sensor"}
                timestamp={new Date()}
              />
              <Message
                primaryColor="#104e64"
                message="Air quality sensor calibrated"
                port={"HC-SR04 ultrasonic sensor"}
                timestamp={new Date()}
              />
              <Message
                primaryColor="#c70036"
                message="Motion detected in living room"
                port={"ADXL3xx accelerometer"}
                timestamp={new Date()}
              />
              <Message
                primaryColor="#a65f00"
                message="Ultrasonic sensor triggered"
                port={"PIR sensor"}
                timestamp={new Date()}
              />
              <Message
                primaryColor="#104e64"
                message="Light sensor adjusted"
                port={"HC-SR04 ultrasonic sensor"}
                timestamp={new Date()}
              />
              <Message
                primaryColor="#c70036"
                message="Temperature sensor active"
                port={"ADXL3xx accelerometer"}
                timestamp={new Date()}
              />
              <Message
                primaryColor="#a65f00"
                message="Humidity levels normal"
                port={"PIR sensor"}
                timestamp={new Date()}
              />
            </div>
            <div className="p-1 flex gap-x-1">
            <select className="rounded-lg px-2 py-1 h-8 text-sm border max-w-22 truncate font-medium">
              <option value="adxl3xx">ADXL3xx accelerometer</option>
              <option value="pir-sensor">PIR sensor</option>
              <option value="hc-sr04-ultrasonic-sensor">C-SR04 ultrasonic sensor</option>
            </select>
              
              <input
              type="text"
                className="w-full rounded-lg px-2 py-1 h-8 text-sm focus:outline-none border focus:bg-zinc-50 transition-all"
                placeholder="Send message"
              />
              <button className="rounded-lg bg-gray-100 px-1 border hover:bg-gray-200 transition-colors">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
