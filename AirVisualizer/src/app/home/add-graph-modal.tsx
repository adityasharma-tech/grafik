import ReactModal from "react-modal";
import { useDataState } from "../../lib/zustand/store";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import AddDeviceModal from "./add-device-dialog";

export default function AddGraphModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const dataState = useDataState((state) => state);

  const [deviceAddDialog, setDeviceAddDialog] = useState(false);
  const [deviceId, setDeviceId] = useState<string>("");
  const [plotterId, setPlotterId] = useState<string>("");
  // const [] = useState()

  const ports = useDataState((state) => state.ports);
  useEffect(() => {
    console.log(ports);
  }, [ports]);

  const handleAddPlotter: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      dataState.addPlotter({
        deviceId: +deviceId,
        plotterId: +plotterId
      })
      setIsOpen(false);
    },
    [dataState.addPlotter, setIsOpen, deviceId, plotterId]
  );

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      contentLabel="Add new graph"
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
          <span className="font-medium">Add new plotter</span>
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
        <form onSubmit={handleAddPlotter} className="py-5 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-y-4">
            <div className="flex">
              <span className="min-w-38 my-auto">Select Device: </span>
              {(dataState.ports.length > 0 && (dataState.ports.length == 1 && (dataState.ports[0].deviceId?.toString() ? true : false))) ? 
              <select onChange={(e)=>setDeviceId(e.target.value)} value={deviceId.toString()} className="min-w-32 bg-neutral-100 rounded-lg px-3 py-2">
                <option value={""}>--select--</option>
                {dataState.ports.map((port, index)=>port.deviceId?.toString() ? <option key={index} value={port.deviceId.toString()}>DEVICE {port.deviceId.toString()}</option> : null)}
              </select> : null}
              <button onClick={()=>setDeviceAddDialog(!deviceAddDialog)} type="button" className="bg-neutral-100 focus-within:outline-none  rounded-lg hover:bg-neutral-300 px-1 py-1 w-9 h-9 flex items-center justify-center my-auto mx-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <title />
                  <g
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    data-name="add"
                  >
                    <path d="M12 19V5M5 12h14" />
                  </g>
                </svg>
              </button>
            </div>
            <div className="flex">
              <span className="min-w-38 my-auto">Plotter Id: </span>
              <input
              required
              value={plotterId}
              onChange={(e)=>setPlotterId(e.target.value)}
                placeholder="Enter same plotter id as on the IoT device."
                type="text"
                className="primary-input"
              />
            </div>
          </div>
          <div className="flex justify-end h-full items-end">
            <button
            type="submit"
            disabled={plotterId.trim()=="" || !deviceId}
              className="font-medium px-5 disabled:opacity-60 py-3 disabled:cursor-not-allowed bg-neutral-800 rounded-xl text-white hover:opacity-90 cursor-pointer"
            >
              Add plotter
            </button>
          </div>
        </form>
      </div>
      <AddDeviceModal isOpen={deviceAddDialog} setIsOpen={setDeviceAddDialog}/>
    </ReactModal>
  );
}
