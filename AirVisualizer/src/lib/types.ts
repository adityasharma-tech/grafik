type LogMessageT = {
    message: string;
    timestamp: Date;
    loggerId: number;
    logType: "error" | "log" | "warn";
    color?: string;
}

type PerformanceDataT = {
    title: string;
    desc: string;
    content: string;
}

type PlotterT = {
    plotterId: number;
    title: string;
    color?: string;
}

type WritterMessageT = {
    message: string;
    deviceId: number;
    deviceName?: string;
    timestamp: Date;
}

type DeviceT = {
    name?: string;
    deviceId: number;
    color?: string;
    port: any;
}

export type {
    LogMessageT,
    PerformanceDataT,
    PlotterT,
    WritterMessageT,
    DeviceT
}