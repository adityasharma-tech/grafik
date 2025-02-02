import ReactModal from "react-modal";
import { useDataState } from "../../lib/zustand/store";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

export default function AddGraphModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const dataState = useDataState((state) => state);

  const [selectedPort, setSelectedPort] = useState(0)
  const [deviceId, setDeviceId] = useState(0)
  const [plotterId, setPlotterId] = useState(123)
  const [name, setName] = useState<string>(`${plotterId}`)
  // const [] = useState()

    const ports = useDataState(state=>state.ports)
    useEffect(()=>{
      console.log(ports)
    }, [ports])

  const handleAddPlotter:MouseEventHandler<HTMLButtonElement> = useCallback((e)=>{
    e.preventDefault();
    dataState.addDevice(selectedPort, deviceId, plotterId);
    setIsOpen(false)
  }, [dataState, setIsOpen])

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
        <form className="py-5 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 bg-neutral-100 rounded-lg px-2 py-1 justify-around">
              <span>
                Select the port
              </span>
              <select onChange={(e)=>setSelectedPort(+e.target.value)} value={selectedPort} className="underline">
                {dataState.ports.map((_, index) => (
                  <option value={index} key={index}>Port: {index}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2 bg-neutral-100 rounded-lg px-2 py-1 justify-around">
              <span>Name: </span>
                <input placeholder="123" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="flex gap-x-2 bg-neutral-100 rounded-lg px-2 py-1 justify-around">
              <span>Plotter Id: </span>
                <input placeholder="123" type="number" value={plotterId} onChange={(e)=>setPlotterId(+e.target.value)}/>
            </div>
            <div className="flex gap-x-2 bg-neutral-100 rounded-lg px-2 py-1 justify-around">
              <span>Select device: </span>
                <input placeholder="123" type="number" value={deviceId} onChange={(e)=>setDeviceId(+e.target.value)}/>
            </div>
          </div>
          <div className="flex justify-end h-full items-end">
            <button
              onClick={handleAddPlotter}
              className="font-medium px-5 py-3 bg-neutral-800 rounded-xl text-white hover:opacity-90 cursor-pointer"
            >
              Add plotter
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
