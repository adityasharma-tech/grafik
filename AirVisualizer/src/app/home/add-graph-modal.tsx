import { useCallback, useEffect } from "react";
import ReactModal from "react-modal";
import useAppState from "../../lib/zustand/store";

export default function AddGraphModal({isOpen, setIsOpen} :{isOpen: boolean; setIsOpen: (val: boolean)=>void}) {

  const ports = useAppState((state) => state.ports);
  const setPorts = useAppState((state) => state.setPorts);

  const handleListPorts = useCallback(async () => {
    if (window.navigator && "serial" in navigator) {
      // @ts-ignore
      const ps = await navigator.serial.getPorts();
      setPorts(ps);
    }
  }, [window]);

  const handlePermissionGesture = useCallback(async () => {
    if (window.navigator && "serial" in navigator) {
      try {
        // @ts-ignore
        const port = await navigator.serial.requestPort({
          filters: [{ usbVendorId: 0x2341, usbProductId: 0x0043 }],
        });
        await port.open({ baudRate: 9600 });
        const reader = port.readable.getReader();
        //   while (true) {
        //     const { value, done } = await reader.read();
        //     if (done) {
        //       // Allow the serial port to be closed later.
        //       reader.releaseLock();
        //       break;
        //     }
        //     const decoder = new TextDecoder();
        //     console.log(decoder.decode(value));
        //   }
      } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
      } finally {
        await handleListPorts();
      }
    }
  }, [window, navigator, handleListPorts]);

  useEffect(() => {
    if (!(window.navigator && "serial" in navigator)) return;
    (async () => await handleListPorts())();
  }, [handleListPorts]);

  return (
    <ReactModal
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
          <span className="font-medium">Add new graph data.</span>
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
        <div className="py-5 flex flex-col justify-between h-full">
          <div>
            <span>
              You have to give permission to see your open ports for arduino or
              your IoT device in case of serial input from the device.
            </span>
          </div>
          <div>
            <table className="w-full text-center">
                <tr className="bg-neutral-100">
                    <th>Usb Product Id</th>
                    <th>Usb Vendor Id</th>
                </tr>
                {ports.map((port, index)=><tr key={index} className="bg-black/10">
                <td>{port.getInfo().usbProductId}</td>
                <td>{port.getInfo().usbVendorId}</td>
            </tr>)}
            </table>
            
          </div>
          <div className="flex justify-end h-full items-end">
            <button
              onClick={handlePermissionGesture}
              className="font-medium underline px-10 py-5 bg-neutral-800 rounded-full text-white hover:opacity-90 cursor-pointer"
            >
              Select ports & grant ports access.
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
