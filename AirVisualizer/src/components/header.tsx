export default function Header() {
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
          <button className="hover:bg-neutral-100 bg-white px-5 pl-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none">New Plotter</button>
          <div className="border-l border-[#D8D8D8]"/>
          <button className="hover:bg-neutral-100 bg-white px-5 pr-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none">New Logger</button>
        </div>
        <div>
          <button className="hover:bg-neutral-100 rounded-xl border border-[#D8D8D8] font-medium bg-white px-5 pl-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none">Attach Device</button>
        </div>
        <button className="hover:bg-gray-800 rounded-xl border border-[#141414] text-white font-medium bg-black px-5 pl-6 disabled:opacity-85 py-2 text-sm cursor-pointer disabled:cursor-none">Start Monitoring</button>
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
