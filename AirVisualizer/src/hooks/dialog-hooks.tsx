import React, { createContext, useContext, useState } from "react";

interface DialogT {
  plotterDialogOpen: boolean;
  loggerDialogOpen: boolean;
  attachDeviceDialogOpen: boolean;
  tooglePlotterDialog: () => void;
  toogleLoggerDialog: () => void;
  toogleAttachDeviceDialog: () => void;
}

const Dialog = createContext<DialogT | null>(null);

export const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const [plotterDialogOpen, setPlotterDialogOpen] = useState(false);
  const [loggerDialogOpen, setLoggerDialogOpen] = useState(false);
  const [attachDeviceDialogOpen, setAttachDeviceDialogOpen] = useState(false);

  const tooglePlotterDialog = () => setPlotterDialogOpen(!plotterDialogOpen);
  const toogleLoggerDialog = () => setLoggerDialogOpen(!loggerDialogOpen);
  const toogleAttachDeviceDialog = () =>
    setAttachDeviceDialogOpen(!attachDeviceDialogOpen);

  return (
    <Dialog.Provider
      value={{
        plotterDialogOpen,
        attachDeviceDialogOpen,
        loggerDialogOpen,
        toogleAttachDeviceDialog,
        toogleLoggerDialog,
        tooglePlotterDialog
      }}
    >
      {children}
    </Dialog.Provider>
  );
};

export const useDialogHook = () => {
    if(!Dialog) throw new Error("Provider not ready yet.\nIt seems you forgot to wrap with the provider.");
    return useContext(Dialog);
}