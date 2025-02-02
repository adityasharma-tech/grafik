class GrafikLogger {
    private:
        int loggerId;
        int deviceId;

    public:
        GrafikLogger (int deviceId, int loggerId) {
            this->deviceId = deviceId;
            this->loggerId = loggerId;
        };

        void log(const char* message){
            // std::string message = std::to_string(this->deviceId) + " plotter " + std::to_string(this->loggerId) + "\t" + m;
            char buffer[64];
            snprintf(buffer, sizeof(buffer), "%d log %d\t:%s", deviceId, loggerId, message);
            // Serial.println(buffer);
        };
};

class GrafikPlotter {
    private:
        int plotterId;
        int deviceId;

    public:
        GrafikPlotter (int deviceId, int plotterId) {
            this->deviceId = deviceId;
            this->plotterId = plotterId;
        }

        void plotData(float data){
            // std::string message = std::to_string(this->deviceId) + " plotter " + std::to_string(this->plotterId) + "\t" + std::to_string(data);
            char buffer[64];
            snprintf(buffer, sizeof(buffer), "%d plot %d\t:%f", deviceId, plotterId, data);
        }
};

class Grafik {
    private:
        int deviceId;
    public:
        Grafik (int deviceId) {
            this->deviceId = deviceId;
        };

        GrafikLogger createLogger(int loggerId) {
            return GrafikLogger(deviceId, loggerId);
        }

        GrafikPlotter createPlotter(int plotterId) {
            return GrafikPlotter(deviceId, plotterId);
        }
};