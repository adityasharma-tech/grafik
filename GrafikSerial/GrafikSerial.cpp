#include "GrafikSerial.h"

// GrafikLogger Implementation
GrafikLogger::GrafikLogger(int deviceId, int loggerId) 
    : deviceId(deviceId), loggerId(loggerId) {}

void GrafikLogger::log(const char* message) {
    char buffer[64];
    snprintf(buffer, sizeof(buffer), "%d log %d\t: %s;;", deviceId, loggerId, message);
    Serial.println(buffer);
}

// GrafikPlotter Implementation
GrafikPlotter::GrafikPlotter(int deviceId, int plotterId) 
    : deviceId(deviceId), plotterId(plotterId) {}

void GrafikPlotter::plotData(float data) {
    char buffer[64];
    char dataStr[10];  
    dtostrf(data, 6, 2, dataStr);

    snprintf(buffer, sizeof(buffer), "%d plot %d\t: %s;;", deviceId, plotterId, dataStr);
    Serial.println(buffer);
}

// Grafik Implementation
Grafik::Grafik(int deviceId) : deviceId(deviceId) {
  Serial.begin(9600);
}

GrafikLogger* Grafik::createLogger(int loggerId) {
    return new GrafikLogger(deviceId, loggerId);
}

GrafikPlotter* Grafik::createPlotter(int plotterId) {
    return new GrafikPlotter(deviceId, plotterId);
}
