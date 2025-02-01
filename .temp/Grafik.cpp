#include <vector>
#include <iostream>

class WifiConfig {
    public:
        std::string id;
        std::string ssid;
        std::string password;
        std::string ipAddress;
        int port;
};

class BluetoothConfig {
    public:
        std::string id;
};

class SerialConfig {
    public:
        std::string id;
        int baud;
};

class SupportAppConfig {
    public:
        std::string id;
};

class GrafikConfig {
    private:
        std::vector<WifiConfig> wifiConfigs;
        std::vector<BluetoothConfig> bluetoothConfigs;
        std::vector<SerialConfig> serialConfigs;
        std::vector<SupportAppConfig> supportAppConfigs;

    public:
        int createWifiConfig(std::string id){
            WifiConfig* wifiConfig = this->findWifiConfig(&id) 
        }

        int createBluetoothConfig() {

        }

        int createSerialConfig() {

        }

        int createSupportAppConfig() {

        }

    private:
        WifiConfig* findWifiConfig(const std::string& id){
            for (auto& config : wifiConfigs){
                if (config.id == id){
                    return &config;
                }
            }
            return nullptr;
        }

        BluetoothConfig* findBluetoothConfig(const std::string& id){
            for (auto& config : bluetoothConfigs){
                if (config.id == id){
                    return &config;
                }
            }
            return nullptr;
        }

        SerialConfig* findSerialConfig(const std::string& id){
            for (auto& config : serialConfigs){
                if (config.id == id){
                    return &config;
                }
            }
            return nullptr;
        }

        SupportAppConfig* findSupportAppConfig(const std::string& id){
            for (auto& config : supportAppConfigs){
                if (config.id == id){
                    return &config;
                }
            }
            return nullptr;
        }
};