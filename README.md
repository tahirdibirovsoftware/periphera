
# Periphera

Periphera is a library for monitoring serial and HID devices for changes. It provides an elegant API to work with devices, allowing you to find devices by various properties and monitor device changes efficiently.

## Installation

Install the library using npm:

```bash
npm install periphera
```

## Usage

### Importing the Library

First, import the necessary components from the library:

```typescript
import { DeviceChangeEvent } from "periphera";
import { DeviceManager } from "periphera";
import { DeviceMonitor } from "periphera";
```

### Creating a DeviceMonitor Instance

Create an instance of `DeviceMonitor` to start monitoring devices. You can specify the monitoring interval and whether to filter out ghost devices (devices with undefined manufacturers).

```typescript
const monitor = new DeviceMonitor(2000, true);
```

### Creating a DeviceManager Instance

Create an instance of `DeviceManager` using the `DeviceMonitor` instance.

```typescript
const manager = new DeviceManager(monitor);
```

### Initializing the DeviceMonitor

Call the `initialize` method on `DeviceMonitor` to set up devices and start monitoring.

```typescript
await monitor.initialize();
```

### Listening to Device Changes

You can listen to device change events (added or removed) using the `deviceMonitor.on` method:

```typescript
monitor.on('deviceChange', (event: DeviceChangeEvent) => {
    console.log(`Device ${event.type}:`, event.deviceType, event.device);
});
```

### Finding Devices by Properties

The `DeviceManager` class provides methods to find devices by various properties. You can find devices by a specific property in a case-insensitive and partial match manner.

#### Find Devices by Property

To find devices by a specific property:

```typescript
const devicesByManufacturer = manager.findDeviceBy('manufacturer', 'ftdi');
console.log('Devices by Manufacturer:', devicesByManufacturer);
```

### Full Example

Here is a complete example of how to use the `DeviceMonitor` and `DeviceManager` classes to monitor devices and find devices by specific properties:

```typescript
import { DeviceChangeEvent } from "periphera";
import { DeviceManager } from "periphera";
import { DeviceMonitor } from "periphera";

const monitor = new DeviceMonitor(2000, true);
const manager = new DeviceManager(monitor);

monitor.on('deviceChange', (event: DeviceChangeEvent) => {
    console.log(`Device ${event.type}:`, event.deviceType, event.device);
});

monitor.initialize().then(() => {
    const devicesByManufacturer = manager.findDeviceBy('manufacturer', 'ftdi');
    console.log('Devices by Manufacturer:', devicesByManufacturer);
}).catch(err => {
    console.error('Error initializing devices:', err);
});
```

## API Reference

### `DeviceMonitor`

#### Constructor

```typescript
new DeviceMonitor(monitoringInterval?: number, filterGhostDevices?: boolean);
```

- `monitoringInterval` (optional): The interval (in milliseconds) at which to scan for device changes. Default is 2000ms.
- `filterGhostDevices` (optional): Boolean to enable or disable filtering of ghost devices (devices with undefined manufacturers). Default is false.

#### Methods

- **`initialize(): Promise<void>`**: Initializes the device lists and starts monitoring for changes.
- **`on(event: DeviceEventNames, listener: (event: DeviceChangeEvent) => void): this`**: Adds an event listener for the specified event.
- **`getSerialDevices(): SerialInfo`**: Gets the current list of monitored serial devices.
- **`getHIDDevices(): HIDInfo`**: Gets the current list of monitored HID devices.
- **`stopMonitoring(): void`**: Stops the device monitoring.

### `DeviceManager`

#### Constructor

```typescript
new DeviceManager(deviceMonitor: DeviceMonitor);
```

- `deviceMonitor`: An instance of `DeviceMonitor`.

#### Methods

- **`findDeviceBy(property: keyof DeviceInfo, value: string): DeviceInfo[]`**: Finds devices by a given property and value (case-insensitive and partial match).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.