import { useCallback, useEffect, useState } from "react";
import Header from "../components/header";
import LogsSection from "./dashboard/logs-section";
import PerformanceSummaryCard from "./dashboard/performance-summary-card";
import PlotterGroup from "./dashboard/plotter-group";
import SerialWritter from "./dashboard/serial-writter";
import { openDB } from "../lib/db";
import { v4 as uuidv4 } from "uuid";
import PermissionDialog from "../components/permission-dialog";
import useAppState from "../lib/store";

export default function Dashboard() {
  const [isSerialPermissionDialogOpen, setSerialPermissionDialogOpen] =
    useState<boolean>(true);

  const setPorts = useAppState((state)=>state.setPorts);

  const handleListPorts = useCallback(async () => {
    if (window.navigator && "serial" in navigator) {
      try {
        // @ts-ignore
        const ps = await navigator.serial.getPorts();
        if(!ps) throw new Error("Failed to get serial ports.")
        setPorts(ps.map((value: any)=>({ port: value, portId: uuidv4().toString() })))
      } catch (error: any) {
        console.error(
          `(handleListPorts) Error occured during a database operation: ${error.message}`
        );
      }
    }
  }, [window, openDB, uuidv4]);

  const handleSerialPermissions = useCallback(async () => {
    if (window.navigator && "serial" in window.navigator) {
      try {
        // @ts-ignore
        await window.navigator.serial.requestPort({
          filters: [{ usbVendorId: 0x2341, usbProductId: 0x0043 }],
        });
      } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
      } finally {
        await handleListPorts();
        setSerialPermissionDialogOpen(false)
      }
    }
  }, [window, handleListPorts]);

  useEffect(() => {
    if (!(window.navigator && "serial" in navigator)) return;
    (async () => await handleListPorts())();
  }, [window]);

  return (
    <div className="flex flex-col gap-1 h-screen w-screen overflow-x-hidden overflow-y-auto">
      <Header />
      <main className="md:px-10 px-3">
        <PerformanceSummaryCard />
        <div className="flex md:flex-row flex-col gap-2">
          <PlotterGroup />
          <div className="w-[30%] flex flex-col gap-y-2">
            <LogsSection />
            <SerialWritter />
          </div>
        </div>
      </main>
      <PermissionDialog
        isSerialPermissionDialogOpen={isSerialPermissionDialogOpen}
        setSerialPermissionDialogOpen={setSerialPermissionDialogOpen}
        allowSerialPermissions={handleSerialPermissions}
      />
    </div>
  );
}
