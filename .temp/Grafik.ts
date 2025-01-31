type WifiConfig = {
    id: string;
    ssid: string;
    password: string;
    ipAddress: string;
    port: number;
}     

type BluetoothConfig = {
    id: string;
}

type SerialConfig = {
    id: string;
    baud: number;
}

type SupportAppConfig = {
    id: string;
}

enum Methods {
    Serial,
    Wifi,
    Bluetooth,
    SupportApp
}
class GrafikConfig {
    private wifiConfigs: WifiConfig[];
    private bluetoothConfigs: BluetoothConfig[];
    private serialConfigs: SerialConfig[];
    private supportAppConfigs: SupportAppConfig[];
    
    public createWifiConfig(id: string, ssid: string="host", password: string="sudo", ipAddress: string, port: number) {
        const configFound =this.wifiConfigs.filter((v)=>v.id == id)
        if(configFound) throw new Error("Config exits with same id.");
        this.wifiConfigs.push({
            id,
            ssid,
            password,
            ipAddress,
            port
        })
    }
    
    public createBluetoothConfig(id: string) {
        const configFound =this.bluetoothConfigs.filter((v)=>v.id == id)
        if(configFound) throw new Error("Config exits with same id.");
        this.bluetoothConfigs.push({
            id
        })
    }
    
    public createSerialConfig(id: string, baud: number = 9600) {
        const configFound =this.serialConfigs.filter((v)=>v.id == id)
        if(configFound) throw new Error("Config exits with same id.");
        this.serialConfigs.push({
            id,
            baud
        })
    }

    public createSupportAppConfig(id: string) {
        const configFound =this.supportAppConfigs.filter((v)=>v.id == id)
        if(configFound) throw new Error("Config exits with same id.");
        this.supportAppConfigs.push({
            id
        })
    }

    public getConfig(id: string, method: Methods){
        let config: null | WifiConfig | BluetoothConfig | SerialConfig | SupportAppConfig = null;
        switch(method){
            case Methods.Serial:
                 const seout = this.serialConfigs.filter((conf)=>conf.id == id)
                 seout.length > 0 ? config = seout[0] : null;

            case Methods.Bluetooth:
                const blout = this.bluetoothConfigs.filter((conf)=>conf.id == id)
                blout.length > 0 ? config = blout[0] : null;

            case Methods.Wifi:
                const wiout = this.wifiConfigs.filter((conf)=>conf.id == id)
                wiout.length > 0 ? config = wiout[0] : null;

            case Methods.SupportApp:
                const saout = this.supportAppConfigs.filter((conf)=>conf.id == id)
                saout.length > 0 ? config = saout[0] : null;
        }
        return config;
    }
}

class Grafik {
    public transferWifi(){}
    public transferBluetooth(){}
    public transferSerial(){}
    public transferSupportApp(){}
}

class GrafikLogger extends Grafik {
    private config: WifiConfig | SerialConfig | BluetoothConfig;
    private logId: string;

    constructor(logId: string, config: WifiConfig | SerialConfig | BluetoothConfig){
        super()
        this.logId = logId;
        this.config = config;
    }

    public log(data: string): number{
        const encoder = new TextEncoder()
        const buffer = encoder.encode(JSON.stringify({
            logId: this.logId,
            data
        }))
        return 1
    }
}

class GrafikPlotter extends Grafik {
    private config: WifiConfig | SerialConfig | BluetoothConfig | SupportAppConfig;
    private plotterId: string;

    constructor(plotterId: string, config: WifiConfig | SerialConfig | BluetoothConfig | SupportAppConfig){
        super()
        this.plotterId = plotterId;
        this.config = config;
    }

    public plot(data: number): number{
        const encoder = new TextEncoder()
        const buffer = encoder.encode(JSON.stringify({
            plotterId: this.plotterId,
            data
        }))
        
        return 1
    }
}