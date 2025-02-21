import { v4 as uuidv4 } from "uuid";
import { Toaster } from "../components/sonner";
import { initializeDatabase } from "../lib/db";
import { useDialogHook } from "../hooks/dialog-hooks";
import { useCallback, useEffect, useState } from "react";

import useAppState from "../lib/store";
import Header from "../components/header";
import LogsSection from "./dashboard/logs-section";
import PlotterGroup from "./dashboard/plotter-group";
import SerialWritter from "./dashboard/serial-writter";
import AssignLogger from "./dashboard/dialogs/assign-logger";
import AttachDevice from "./dashboard/dialogs/attach-device";
import AssignPlotter from "./dashboard/dialogs/assign-plotter";
import PermissionDialog from "../components/permission-dialog";
import PerformanceSummaryCard from "./dashboard/performance-summary-card";

export default function Dashboard() {
  const [isSerialPermissionDialogOpen, setSerialPermissionDialogOpen] =
    useState<boolean>(true);
  const dialog = useDialogHook();

  const setPorts = useAppState((state) => state.setPorts);

  const handleListPorts = useCallback(async () => {
    if (window.navigator && "serial" in navigator) {
      try {
        // @ts-expect-error: Serial is not defalt included in typescript
        const ps = await navigator.serial.getPorts();
        if (!ps) throw new Error("Failed to get serial ports.");
        setPorts(
          ps.map((value: any) => ({ port: value, portId: uuidv4().toString() }))
        );
      } catch (error: any) {
        console.error(
          `(handleListPorts) Error occured during a database operation: ${error.message}`
        );
      }
    }
  }, [uuidv4, initializeDatabase, setPorts]);

  const handleSerialPermissions = useCallback(async () => {
    if (window.navigator && "serial" in window.navigator) {
      try {
        // @ts-expect-error: Serial is not defalt included in typescript
        await window.navigator.serial.requestPort({
          filters: [{ usbVendorId: 0x2341, usbProductId: 0x0043 }],
        });
      } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
      } finally {
        await handleListPorts();
        setSerialPermissionDialogOpen(false);
      }
    }
  }, [window, handleListPorts, setSerialPermissionDialogOpen]);

  useEffect(() => {
    if (!(window.navigator && "serial" in navigator)) return;
    (async () => await handleListPorts())();
  }, [window]);

  useEffect(() => {
    (async () => await initializeDatabase())();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden overflow-y-auto">
      <Header />
      <main className="md:px-10 px-3 bg-neutral-200">
        <PerformanceSummaryCard />
        <div className="flex md:flex-row flex-col gap-3 py-2 gap-x-4">
          <PlotterGroup />
          <div className="w-[30%] flex flex-col gap-y-4">
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
      {dialog?.plotterDialogOpen ? <AssignPlotter /> : null}
      {dialog?.loggerDialogOpen ? <AssignLogger /> : null}
      {dialog?.attachDeviceDialogOpen ? <AttachDevice /> : null}
      <Toaster />
    </div>
  );
}
