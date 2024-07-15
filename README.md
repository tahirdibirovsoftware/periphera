# Periphera

Periphera is a library for monitoring serial and HID devices for changes. It provides an elegant API to work with devices, allowing you to find devices by various properties and monitor device changes efficiently.

## Installation

Install the library using npm:

```bash
npm install periphera

Usage
Importing the Library
First, import the necessary components from the library:

typescript
Copy code
import { DeviceManager } from 'periphera';
Creating a DeviceManager Instance
Create an instance of DeviceManager to start monitoring devices. You can specify the monitoring interval and whether to filter out ghost devices (devices with undefined manufacturers).

typescript
Copy code
const deviceManager = new DeviceManager(2000, true); // 2000ms interval, filter ghost devices
Starting Device Monitoring
Start monitoring devices using the startMonitoring method:

typescript
Copy code
deviceManager.startMonitoring();
Listening to Device Changes
You can listen to device change events (added or removed) using the deviceMonitor.on method:

typescript
Copy code
deviceManager.deviceMonitor.on('deviceChange', (event) => {
    console.log(`Device ${event.type}:`, event.deviceType, event.device);
});
Finding Devices by Properties
The DeviceManager class provides methods to find devices by various properties. You can find serial devices, HID devices, or all devices by a specific property.

Find Serial Devices by Property
To find serial devices by a specific property:

typescript
Copy code
const serialDevicesByManufacturer = deviceManager.findSerialDevicesBy('manufacturer', 'FTDI');
console.log('Serial Devices by Manufacturer:', serialDevicesByManufacturer);
Find HID Devices by Property
To find HID devices by a specific property:

typescript
Copy code
const hidDevicesByVendorId = deviceManager.findHIDDevicesBy('vendorId', '1234');
console.log('HID Devices by Vendor ID:', hidDevicesByVendorId);
Find All Devices by Property
To find all devices (serial and HID) by a specific property:

typescript
Copy code
const allDevicesBySerialNumber = deviceManager.findAllDevicesBy('serialNumber', 'ABCD1234');
console.log('All Devices by Serial Number:', allDevicesBySerialNumber);
Stopping Device Monitoring
When you are done monitoring devices, you can stop the monitoring process:

typescript
Copy code
deviceManager.stopMonitoring();
API Reference
DeviceManager
Constructor
typescript
Copy code
new DeviceManager(monitoringInterval?: number, filterGhostDevices?: boolean);
monitoringInterval (optional): The interval (in milliseconds) at which to scan for device changes. Default is 2000ms.
filterGhostDevices (optional): Boolean to enable or disable filtering of ghost devices (devices with undefined manufacturers). Default is false.
Methods
startMonitoring(): Promise<void>: Starts monitoring devices for changes.
stopMonitoring(): void: Stops monitoring devices for changes.
findSerialDevicesBy(property: keyof SerialPort.PortInfo, value: string): SerialPort.PortInfo[]: Finds serial devices by a given property and value.
findHIDDevicesBy(property: keyof HID.Device, value: string): HID.Device[]: Finds HID devices by a given property and value.
findAllDevicesBy(property: keyof DeviceInfo, value: string): DeviceInfo[]: Finds all devices (serial and HID) by a given property and value.
DeviceMonitor
The DeviceMonitor class is used internally by DeviceManager to monitor device changes. It provides the following methods:

on(event: DeviceEventNames, listener: (event: DeviceChangeEvent) => void): this: Adds an event listener for the specified event.
monitorSerialDevices(): Promise<void>: Monitors serial devices for changes.
monitorHID(): Promise<void>: Monitors HID devices for changes.
monitorAll(): Promise<void>: Monitors all devices for changes.
stopMonitoring(): void: Stops the device monitoring.
Example
Here is a complete example of how to use the DeviceManager class to monitor devices and find devices by specific properties:

typescript
Copy code
import { DeviceManager } from 'periphera';

const deviceManager = new DeviceManager(2000, true); // 2000ms interval, filter ghost devices

// Start monitoring devices
deviceManager.startMonitoring();

deviceManager.deviceMonitor.on('deviceChange', (event) => {
    console.log(`Device ${event.type}:`, event.deviceType, event.device);
});

// Find serial devices by manufacturer
const serialDevicesByManufacturer = deviceManager.findSerialDevicesBy('manufacturer', 'FTDI');
console.log('Serial Devices by Manufacturer:', serialDevicesByManufacturer);

// Find HID devices by vendorId
const hidDevicesByVendorId = deviceManager.findHIDDevicesBy('vendorId', '1234');
console.log('HID Devices by Vendor ID:', hidDevicesByVendorId);

// Find all devices by serialNumber
const allDevicesBySerialNumber = deviceManager.findAllDevicesBy('serialNumber', 'ABCD1234');
console.log('All Devices by Serial Number:', allDevicesBySerialNumber);

// Stop monitoring when done
deviceManager.stopMonitoring();
License
This project is licensed under the MIT License - see the LICENSE file for details.