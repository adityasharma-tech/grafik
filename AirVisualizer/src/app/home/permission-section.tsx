import { useCallback, useEffect } from "react";
import { useDataState } from "../../lib/zustand/store";

export default function PermissionSection() {
  const dataState = useDataState((state) => state);

  

  // callbacks
  const handleListPorts = useCallback(async () => {
    if (window.navigator && "serial" in navigator) {
      // @ts-ignore
      const ps = await navigator.serial.getPorts();
      for (const port of ps) {
        dataState.createPort({
          port,
          deviceId: undefined,
          loggers: [],
          plotters: []
        });
      }
    }
  }, [window, dataState]);

  const handlePermissionGesture = useCallback(async () => {
    if (window.navigator && "serial" in navigator) {
      try {
        // @ts-ignore
        await navigator.serial.requestPort({
          filters: [{ usbVendorId: 0x2341, usbProductId: 0x0043 }],
        });
      } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
      } finally {
        await handleListPorts();
      }
    }
  }, [window, navigator, handleListPorts]);

  const runPort = useCallback(
    async (port: any, index: number) => {
      if (!(window.navigator && "serial" in navigator)) return;
      try {
        try {
          await port.open({ baudRate: 9600 });
        } catch (error) {}
        const reader = port.readable.getReader();
        let buffer = "";
        while (true) {
          // @ts-ignore
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          const decodedValue = (new TextDecoder()).decode(value);
          buffer += decodedValue;

          let messages = buffer.split(";;");
          buffer = messages.pop() || "";
          for (const msg of messages) {
            // console.log(msg)
            const [meta, data] = msg.split("\t:")
            if(meta && data){
              const [deviceId, dataType, dataId] = meta.split(" ");
              if(deviceId && dataType && dataId && deviceId.trim() != "" && dataType.trim() != "" && dataId.trim() != "")
              {
                switch(dataType){
                  case "plot":
                    dataState.addPlottingData({
                      deviceId: +deviceId.trim(),
                      plotterId: +dataId.trim(),
                      dataPoint: +data
                    })
                    break;
                }
              }
              }
          }
        }
      } catch (error: any) {
        console.error(
          `Error during running port index: ${index}: `,
          error.message
        );
      }
    },
    [window, navigator]
  );

  useEffect(() => {
    if (!(window.navigator && "serial" in navigator)) return;
    (async () => await handleListPorts())();
  }, []);

  useEffect(() => {
    if (!dataState.running) return;
      (async () => {
        await Promise.all(
          dataState.ports.map((portData, index) =>
            runPort(portData.port, index)
          )
        );
      })();
  }, [dataState.running]);

  return (
    <div className="border bg-white border-neutral-400 mt-2 rounded-lg p-2">
      <div className="flex justify-between w-full">
        <span className="font-medium">Permission dialog</span>
      </div>
      <div className="py-5 flex flex-col justify-between h-full">
        <div className="mb-2">
          <span className="text-sm">
            You have to give permission to see your open ports for arduino or
            your IoT device in case of serial input from the device.
          </span>
        </div>
        <div>
          <table className="w-full text-center">
            <thead>
              <tr className="bg-neutral-100">
                <th>Usb Product Id</th>
                <th>Usb Vendor Id</th>
              </tr>
            </thead>
            <tbody>
              {dataState.ports.map((port, index) => (
                <tr key={index} className="bg-black/10">
                  <td>{port.port.getInfo().usbProductId}</td>
                  <td>{port.port.getInfo().usbVendorId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end h-full items-end gap-x-2">
          <button
            onClick={()=>{
                if(window && dataState.running){
                    window.location.reload();
                    return;
                }
                dataState.toogleRunning();
            }}
            aria-checked={dataState.running}
            className="font-medium px-5 py-3 my-3 bg-rose-600 aria-checked:bg-green-700 rounded-full text-white hover:opacity-90 cursor-pointer"
          >
            {dataState.running ? `Stop ports` : `Run ports`}
          </button>
          <button
            onClick={handlePermissionGesture}
            className="font-medium underline px-5 py-3 my-3 bg-neutral-800 rounded-full text-white hover:opacity-90 cursor-pointer"
          >
            Select ports & grant ports access.
          </button>
        </div>
      </div>
    </div>
  );
}
