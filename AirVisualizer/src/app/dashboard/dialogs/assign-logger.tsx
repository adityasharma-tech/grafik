import { FormEventHandler, useCallback, useEffect, useState } from "react";
import SelectInput from "../../../components/ui/select-input";
import TextInput from "../../../components/ui/text-input";
import { useDialogHook } from "../../../hooks/dialog-hooks";
import { DeviceT } from "../../../lib/types";
import { openDB } from "idb";
import { DB_NAME, DB_VERSION, initializeDatabase } from "../../../lib/db";
import { getRandomColor } from "../../../lib/utils";

export default function AssignLogger() {
  const dialog = useDialogHook();

  const [loggerId, setLoggerId] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loggerName, setLoggerName] = useState("");

  const [devices, setDevices] = useState<DeviceT[]>([]);

  const handleAssignLogger: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const db = await initializeDatabase();
        await db.add("loggers", {
          loggerId,
          loggerName,
          deviceId,
          color: getRandomColor(),
        });
      } catch (error: any) {
        console.error(
          `An error occured during assigning logger: ${error.message}`
        );
      } finally {
        dialog?.toogleLoggerDialog();
      }
    },
    [
      dialog,
      openDB,
      loggerId,
      loggerName,
      deviceId,
      getRandomColor,
      DB_NAME,
      DB_VERSION,
    ]
  );

  useEffect(() => {
    (async () => {
      try {
        const db = await initializeDatabase();
        const result = await db.getAll("devices");
        setDevices(result);
        setDeviceId(deviceId.length >= 0 ? result[0].deviceId : "");
      } catch (error: any) {
        console.error(
          `Some error occured during get devices data: ${error.message}`
        );
      }
    })();
  }, []);

  return (
    <section className="h-screen flex justify-center items-center w-screen absolute inset-0 bg-black/20 backdrop-blur-xs">
      <div className="min-w-xl rounded-2xl bg-neutral-100 inset-shadow-sm p-3">
        <div className="flex gap-x-3 items-center justify-between">
          <span className="font-medium text-lg">Configure new logger</span>
          <button
            type="button"
            onClick={dialog?.toogleLoggerDialog}
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
        <form onSubmit={handleAssignLogger} className="pt-3 h-full">
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-3">
              <SelectInput
                values={devices.map((d, idx) => (
                  <option key={idx} value={d.deviceId}>COM{d.deviceId}</option>
                ))}
                value={deviceId}
                setValue={setDeviceId}
                label="Device ID"
              />
              <TextInput
                required
                type="text"
                value={loggerId}
                setValue={setLoggerId}
                label="Logger ID"
                placeholder="0x41"
              />
            </div>
            <div>
              <TextInput
                type="text"
                label="Logger name (optional)"
                placeholder="Arduino UNO"
                value={loggerName}
                setValue={setLoggerName}
              />
            </div>
          </div>
          <div className="flex gap-x-3 justify-end mt-10">
            <button
              type="button"
              onClick={dialog?.toogleLoggerDialog}
              className="bg-neutral-200 px-12 py-2 py text-gray-900 rounded-xl hover:cursor-pointer hover:bg-neutral-300 hover:inset-shadow text-sm font-medium"
            >
              Cancel
            </button>
            <button
              disabled={deviceId.trim() == ""}
              className="bg-neutral-800 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-neutral-800 px-6 py-2 py text-white rounded-xl hover:cursor-pointer hover:bg-black hover:inset-shadow text-sm font-medium"
            >
              Attach logger
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
