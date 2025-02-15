import React, { useState } from "react";

export default function WhatAreYouWaitingForComp() {
  const [visible, setVisible] = useState(false);
  const VideoBox = () => {
    if (visible)
      return (
        <React.Fragment>
          <div className="inset-0 fixed bg-black/10 backdrop-blur-xs z-40 flex justify-center items-center">
            <div className="flex relative justify-center items-center text-neutral-900 w-[70vw] h-[70vh] rounded-xl bg-white">
            <button className="absolute rounded-full px-1 py-1 border border-neutral-300 hover:ring-2 cursor-pointer hover:bg-neutral-100 transition-all ring-offset-2 ring-neutral-200 rotate-45 right-3 top-3" onClick={() => setVisible(!visible)}>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 12h12m-6-6v12"
                  className="stroke-neutral-900"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
              {/* <video src="" className="w-[80%] h-auto"/> */}
              <span className="text-lg">Video will be available soon.</span>
            </div>
          </div>
        </React.Fragment>
      );
  };

  return (
    <section id="what-it-does" className="flex flex-col justify-center items-center gap-y-5 py-20 text-neutral-100 bg-gradient-to-b from-10% to-100% from-emerald-700 to-emerald-200">
      <VideoBox />
      <span className="text-center text-5xl leading-16 font-medium">
        What are You Waiting For? <br /> Let's Use Grafik Now!!
      </span>
      <span>
        A whole dashboard to visualize your IoT device data, plot your data
        easily.
      </span>
      <div className="flex flex-row-reverse gap-x-5 my-3 mt-5">
        <a
          href="/dashboard"
          className="py-3 px-10 bg-[#147655] rounded-lg text-white font-medium cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span>Dashboard (Studio)</span>
        </a>

        <button
          onClick={() => setVisible(!visible)}
          type="button"
          className="py-3 px-10 border hover:ring-3 ring-[#147655]/10 border-[#147655] bg-white text-[#147655] rounded-lg font-medium cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span>How to use?</span>
        </button>
      </div>
    </section>
  );
}
