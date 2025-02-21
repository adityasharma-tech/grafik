export const filters = [
    // Arduino
    { usbVendorId: 0x2341 }, // Generic Arduino Vendor ID
    { usbVendorId: 0x2341, usbProductId: 0x0043 }, // Arduino Uno
    { usbVendorId: 0x2341, usbProductId: 0x0001 }, // Arduino Duemilanove
    { usbVendorId: 0x2A03 }, // Arduino (Secondary Vendor ID)

    // ESP32 with CP210x (Silicon Labs)
    { usbVendorId: 0x10C4, usbProductId: 0xEA60 }, // CP2102, CP2104

    // ESP32 with CH340/CH341 (WCH)
    { usbVendorId: 0x1A86, usbProductId: 0x7523 }, // CH340
    { usbVendorId: 0x1A86, usbProductId: 0x5523 }, // CH341

    // FTDI-based Boards (FT232RL, FT2232, etc.)
    { usbVendorId: 0x0403, usbProductId: 0x6001 }, // FT232RL
    { usbVendorId: 0x0403, usbProductId: 0x6010 }, // FT2232H
    { usbVendorId: 0x0403, usbProductId: 0x6011 }, // FT4232H

    // Microchip SAMD-based Boards (Arduino MKR, Adafruit Feather M0, etc.)
    { usbVendorId: 0x03EB, usbProductId: 0x6124 }, // Atmel/Microchip SAMD21
    { usbVendorId: 0x03EB, usbProductId: 0x2157 }, // Atmel/Microchip SAMD51

    // Teensy Boards (PJRC)
    { usbVendorId: 0x16C0, usbProductId: 0x0483 }, // Teensy 2.0
    { usbVendorId: 0x16C0, usbProductId: 0x0489 }, // Teensy 3.x / 4.x

    // Raspberry Pi Pico (RP2040)
    { usbVendorId: 0x2E8A, usbProductId: 0x000A }, // Raspberry Pi Pico Bootloader
    { usbVendorId: 0x2E8A, usbProductId: 0x000C }, // Pico in normal mode

    // Other popular boards (Adafruit, SparkFun, Seeed)
    { usbVendorId: 0x239A }, // Adafruit
    { usbVendorId: 0x1B4F }, // SparkFun
    { usbVendorId: 0x2886 }, // SeeedStudio

    // Generic USB-to-Serial Chips
    { usbVendorId: 0x067B, usbProductId: 0x2303 }, // Prolific PL2303
]