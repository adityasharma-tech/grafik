import FacSection from "./home/faq";
import WhatAreYouWaitingForComp from "./home/what-waiting";

export default function Home() {
  const shareData = function() {
    if("share" in navigator){
      navigator.share({
        title: "Grafik: A platform to visualize your IoT data and logs in real-time.",
        url: "https://grafik-studio.vercel.app"
      })
    }
  }
  return (
    <div
      style={{
        fontFamily: "Poppins, serif",
      }}
      className="overflow-x-hidden h-screen w-screen overflow-y-auto bg-gradient-to-b from-neutral-200 to-white"
    >
      <header className="bg-white pl-8 pr-3 md:min-w-[70vw] w-[90vw] md:py-0 py-5 z-30 fixed top-5 left-[50%] right-[50%] -translate-x-[50%] rounded-xl flex flex-row justify-between items-center">
        <img src="logo.png" className="invert md:max-h-6 max-h-4" />
        <div>
          <ul className="md:flex hidden text-sm gap-x-8 font-medium underline-offset-3 text-neutral-800 py-5">
            <a href="#home"><li className="hover:underline cursor-pointer">Home</li></a>
            <a href="#what-it-does"><li className="hover:underline cursor-pointer">What it does?</li></a>
            <a href="#faq"><li className="hover:underline cursor-pointer">FAQ</li></a>
            <a href="#footer"><li className="hover:underline cursor-pointer">Contact</li></a>
          </ul>
        </div>
        <div>
          <a
            href="https://adityasharma.live/#contact"
            target="_blank"
            className="py-3 px-5 bg-[#147655] rounded-lg text-white text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span>Wanna contribute</span>
          </a>
        </div>
      </header>
      <main className="mt-20 py-20 px-5">
        <div id="home" className="flex-col items-center flex justify-center gap-y-7">
          <span className="leading-18 text-center text-neutral-800 font-medium text-5xl">
            Transform IoT Data into{" "}
            <span className="text-emerald-700">Real-Time</span> Insights <br />{" "}
            with Our All-in-One Platform.
          </span>
          <span className="max-w-7xl text-neutral-600 flex text-center ">
            Experience the power of real-time IoT data with our all-in-one
            dashboard. Monitor, visualize, and analyze live sensor data
            instantly. Export insights effortlessly and make smarter decisions
            with seamless connectivity.
          </span>
          <div className="flex gap-x-5 my-3">
            <a
              href="/dashboard"
              className="py-3 px-5 bg-[#147655] rounded-lg text-white font-medium cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span>Dashboard (no-login required)</span>
            </a>

            {"share" in navigator ?(<button
              type="button"
              onClick={shareData}
              className="py-3 px-5 border hover:ring-3 ring-[#147655]/10 border-[#147655] bg-white text-[#147655] rounded-lg font-medium cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span>Share on social media</span>
            </button>): null}
          </div>
          <img
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0.1) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0.1) 100%)",
            }}
            src="screenshot.png"
            className="max-w-[70vw] drop-shadow-lg"
          />
        </div>
        <section className="flex-col items-center text-neutral-800 mb-30 my-10 flex justify-center gap-y-2">
          <div className="text-2xl font-medium">Why use Grafik?</div>
          <div className="text-neutral-600 mb-10">
            <span>
              We have the best features for your realtime data visualization
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-5 md:w-7xl gap-y-5">
            {[
              {
                title: "Easy to use",
                desc: "We insure your data is plotting instantly with very low latency.",
              },
              {
                title: "Library support (Arduino-IDE)",
                desc: "We provide specialized libraried for arduino and esp32 like IoT devices. Raspberry Pi support comming soon.",
                href: "https://github.com/adityasharma-tech/grafik-serial.git",
              },
            ].map((_, idx) => (
              <div
                key={idx}
                className="border border-gray-300 bg-white p-1.5 rounded-xl"
              >
                <div className="border border-gray-100 h-full bg-zinc-50 p-3 rounded-lg">
                  <div className="text-xl mb-3 text-neutral-900 font-medium">
                    {_.title}
                  </div>
                  <div className="text-neutral-700">
                    <span>{_.desc}</span>
                  </div>
                  <a
                    target="_blank"
                    href={_.href}
                    className="flex gap-x-4 items-center cursor-pointer text-emerald-700 font-medium mt-5 group pr-4"
                  >
                    <span>Learn more</span>
                    <svg className="h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14m0 0l-6-6m6 6l-6 6"
                        className="stroke-emerald-600 group-hover:translate-x-1 -translate-x-1 transition-all z-10"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="border border-gray-300 bg-white p-1.5 mt-5 md:w-7xl rounded-xl">
              <div className="border border-gray-100 h-full bg-zinc-50 rounded-lg flex justify-between">
                <div className="p-3 flex flex-col justify-center">
                  <div className="text-xl mb-3 text-neutral-900 font-medium">
                    Realtime-Multi Graphs & Loggers
                  </div>
                  <div className="text-neutral-700">
                    <span>
                      We provide multiple data plotting and logging in
                      real-time, visualizing your data in realtime makes easier
                      for you to debug your IoT project. Having a lot of
                      features avaialble like steps data visualization,
                      filtering your data and many more.
                    </span>
                  </div>
                  <button className="flex gap-x-4 items-center cursor-pointer text-emerald-700 font-medium mt-5 group pr-4">
                    <span>Learn more</span>
                    <svg className="h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14m0 0l-6-6m6 6l-6 6"
                        className="stroke-emerald-600 group-hover:translate-x-1 -translate-x-1 transition-all z-10"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <img
                    style={{
                      maskImage:
                        "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0.1) 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0.1) 100%)",
                    }}
                    className=""
                    src="shot-1.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <FacSection/>
      </main>
        <WhatAreYouWaitingForComp/>
      <footer id="footer" className="bg-neutral-900 py-10 px-10 grid gap-y-10 md:grid-cols-2 text-neutral-100">
        <div>
          <img src="logo.png" className="h-10" />
          <div className="max-w-xl text-sm mt-6">
            Studio for visualizing Real-Time IoT data to our dashboard. It
            offers to debug you faster and optimized for running with no log.
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <span className="font-medium text-2xl">Contact</span>
          <div></div>
          <a href="https://x.com/@AdityaSharma626">
            Developed by:{" "}
            <strong className="font-semibold hover:underline underline-offset-3">
              Aditya Sharma
            </strong>
          </a>
          <a
            href="mailto:aditya@adityasharma.live"
            className="hover:underline underline-offset-2"
          >
            aditya@adityasharma.live
          </a>
          <a
            href="https://www.adityasharma.live"
            target="_blank"
            className="hover:underline underline-offset-2"
          >
            www.adityasharma.live
          </a>
        </div>
      </footer>
    </div>
  );
}
