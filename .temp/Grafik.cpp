#include <vector>

class WifiConfig {
    public:
        char* id;
        char* ssid;
        char* password;
        char* ipAddress;
        int port;
};

class BluetoothConfig {
    public:
        char* id;
};

class SerialConfig {
    public:
        char* id;
        int baud;
};

class SupportAppConfig {
    public:
        char* id;
};

class GrafikConfig {
    private:
        std::vector<WifiConfig> wifiConfigs;
};