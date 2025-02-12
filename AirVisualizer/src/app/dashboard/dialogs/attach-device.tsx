import { FormEventHandler, useCallback, useState } from "react";
import SelectInput from "../../../components/ui/select-input";
import TextInput from "../../../components/ui/text-input";
import { useDialogHook } from "../../../hooks/dialog-hooks";
import useAppState from "../../../lib/store";
import { openDB } from "idb";
import { toast } from "sonner";


export default function AttachDevice() {
  const dialog = useDialogHook();

  const [deviceId, setDeviceID] = useState("");
  const [deviceName, setDeviceName] = useState("");
  
  const ports = useAppState(state=>state.ports)
  
  const [portId, setPortId] = useState(ports.length > 0 ? ports[0].portId : undefined)
  
  const handleAttachDevice: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
        e.preventDefault();
        try {
          if(ports.length<=0) throw new Error("Error: Please connect any IoT device to get started.")
            const db = await openDB("GrafikDB", 1);
            await db.add("devices", {
              deviceId,
              deviceName,
              portId: portId ?? ports[0].portId
            })
        } catch (error: any) {
           console.error(`An error occured during attaching new device: ${error.message}`)
        } finally {
          toast("Device attached successfully.")
        }
    },
    [openDB, deviceId, deviceName, portId]
  );

  if (dialog?.attachDeviceDialogOpen)
    return (
      <section className="h-screen flex justify-center items-center w-screen absolute inset-0 bg-black/20 backdrop-blur-xs">
        <div className="min-w-xl rounded-2xl bg-neutral-100 inset-shadow-sm p-3">
          <div className="flex gap-x-3 items-center justify-between">
            <span className="font-medium text-lg">Configure new device</span>
            <button
              type="button"
              onClick={dialog.toogleAttachDeviceDialog}
              className="hover:bg-neutral-200 rounded-lg"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.995 7.006a1 1 0 000 1.415l3.585 3.585-3.585 3.585a1 1 0 101.414 1.414l3.585-3.585 3.585 3.585a1 1 0 001.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 00-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 00-1.414 0z"
                  fill="#0F0F0F"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleAttachDevice} className="pt-3 h-full">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-3">
                <SelectInput required value={portId} setValue={setPortId} values={ports.map((port, idx)=><option value={port.portId} key={idx}>COM {idx}</option>)} label="Port index" />
                <TextInput
                  required
                  type="text"
                  value={deviceId}
                  setValue={setDeviceID}
                  label="Device ID"
                  placeholder="0x31"
                />
              </div>
              <div>
                <TextInput
                  type="text"
                  label="Device name (optional)"
                  placeholder="Arduino UNO"
                  value={deviceName}
                  setValue={setDeviceName}
                />
              </div>
            </div>
            <div className="flex gap-x-3 justify-end mt-10">
              <button
                type="button"
                onClick={dialog.toogleAttachDeviceDialog}
                className="bg-neutral-200 px-12 py-2 py text-gray-900 rounded-xl hover:cursor-pointer hover:bg-neutral-300 hover:inset-shadow text-sm font-medium"
              >
                Cancel
              </button>
              <button className="bg-neutral-800 px-6 py-2 py text-white rounded-xl hover:cursor-pointer hover:bg-black hover:inset-shadow text-sm font-medium">
                Attach device
              </button>
            </div>
          </form>
        </div>
      </section>
    );
}
