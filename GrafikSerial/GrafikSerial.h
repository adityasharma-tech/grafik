#ifndef GRAFIK_SERIAL_H
#define GRAFIK_SERIAL_H

#include <Arduino.h>  // Required for Serial communication

class GrafikLogger {
private:
    int loggerId;
    int deviceId;

public:
    GrafikLogger(int deviceId, int loggerId);
    void log(const char* message);
};

class GrafikPlotter {
private:
    int plotterId;
    int deviceId;

public:
    GrafikPlotter(int deviceId, int plotterId);
    void plotData(float data);
};

class Grafik {
private:
    int deviceId;

public:
    Grafik(int deviceId);
    GrafikLogger* createLogger(int loggerId);
    GrafikPlotter* createPlotter(int plotterId);
};

#endif  // GRAFIK_SERIAL_H
