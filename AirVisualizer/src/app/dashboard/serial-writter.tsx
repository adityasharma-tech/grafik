import { demoWritterData } from "../../lib/constants";
import { WritterMessageT } from "../../lib/types";
import { formatTime } from "../../lib/utils";

export default function SerialWritter() {
  function handleSubmit() {
    return;
  }

  return (
    <div className="border min-h-[30vh] flex flex-col max-h-[40vh] w-full bg-neutral-50 border-[#e2e2e2] rounded-xl px-3 py-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Serial writter</span>
        <div className="flex gap-x-0.5">
          <button className="rounded-md h-6 w-6 ml-1.5 flex justify-center items-center hover:bg-neutral-100 opacity-60 hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 "
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
      <div className="flex flex-col-reverse flex-grow gap-y-2 py-1">
        {demoWritterData.map((log) => (
          <WritterLogMessage {...log} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-2 gap-x-1">
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
  );
}

function WritterLogMessage(props: WritterMessageT) {
  return (
    <div className="flex justify-between bg-neutral-100 inset-shadow-sm rounded-md px-1.5 py-1">
      <span className="text-neutral-800">{props.message}</span>
      <div className="flex gap-x-2 items-center">
        <span className="text-xs">[{props.deviceName}]</span>
        <span className="text-neutral-500 text-sm self-center">
          {formatTime(props.timestamp)}
        </span>
      </div>
    </div>
  );
}
