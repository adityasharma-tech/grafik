import ReactModal from "react-modal";
import { useDataState } from "../../lib/zustand/store";
import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function AddDeviceModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const dataState = useDataState((state) => state);

  const [selectedPort, setSelectedPort] = useState(0);
  const [deviceId, setDeviceId] = useState<string>("");
  const [name, setName] = useState<string>(`${deviceId}`);
  // const [] = useState()

  const ports = useDataState((state) => state.ports);
  const setDevice = useDataState((state) => state.setDeviceId);
  useEffect(() => {
    console.log(ports);
  }, [ports]);

  const handleAddDevice: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      console.log("deviceID: ", deviceId)
      setDevice({
        deviceId: +deviceId,
        portIndex: selectedPort,
      });
      setIsOpen(false);
    },
    [dataState, setIsOpen, deviceId, selectedPort]
  );

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      contentLabel="Assign new device"
      style={{
        content: {
          width: 800,
          height: 400,
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 12,
        },
      }}
    >
      <div className="h-[98%]">
        <div className="flex justify-between w-full">
          <span className="font-medium">Assign new device</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-3 right-3 cursor-pointer hover:bg-neutral-200 transition-colors rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#0F0F0F"
                d="M6.995 7.006a1 1 0 0 0 0 1.415l3.585 3.585-3.585 3.585a1 1 0 1 0 1.414 1.414l3.585-3.585 3.585 3.585a1 1 0 0 0 1.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 0 0-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 0 0-1.414 0Z"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleAddDevice}
          className="py-5 flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-y-4">
            <div className="flex">
              <span className="min-w-38 my-auto">Select port: </span>
              {dataState.ports.length > 0 ? (
                <select
                  onChange={(e) => setSelectedPort(+e.target.value)}
                  value={selectedPort!}
                  className="min-w-32 bg-neutral-100 rounded-lg px-3 py-2"
                >
                  {dataState.ports.map((_, index) => (
                    <option key={index} value={index}>
                      COM {index}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
            <div className="flex">
              <span className="min-w-38 my-auto">Device Id: </span>
              <input
                value={deviceId}
                onChange={(e) => {setDeviceId(e.target.value);console.log(e.target.value)}}
                placeholder="Enter same device id as on the IoT device."
                type="text"
                className="primary-input"
              />
            </div>
          </div>
          <div className="flex justify-end h-full items-end">
            <button
              type="submit"
              disabled={dataState.ports.length <= 0 || !deviceId}
              className="font-medium px-5 py-3 disabled:opacity-60 disabled:cursor-not-allowed bg-neutral-800 rounded-xl text-white hover:opacity-90 cursor-pointer"
            >
              Assign device to port
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
