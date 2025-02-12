type LogMessageT = {
    loggerId: string;
    message: string;
    timestamp: Date;
    logType: "error" | "log" | "warn";
}

type PerformanceDataT = {
    title: string;
    desc: string;
    content: string;
}

type PlotT = {
    plotterId: string;
    dataPoint: number;
    timestamp: Date;
}

type PlotterT = {
    plotterId: number;
    title?: string;
    color?: string;
}

type LoggerT = {
    loggerId: number;
    deviceId: number;
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
    color?: string;
    deviceId: number;
    port: any;
}

type PortT = {
    port: any;
    portId: string;
}

export type {
    PerformanceDataT,
    PlotterT,
    WritterMessageT,
    DeviceT,
    LoggerT,
    PortT,
    LogMessageT,
    PlotT
}