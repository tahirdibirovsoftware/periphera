# Periphera

Periphera: A sleek and efficient Node.js library for real-time monitoring of serial and HID devices. Seamlessly track the addition and removal of peripherals with ease, ensuring your applications stay in sync with connected hardware. Perfect for developers looking to integrate dynamic device management into their Node.js projects.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Bugs and Issues](#bugs-and-issues)
- [Author](#author)

## Installation

To install Periphera, use npm:

```bash
npm install periphera

Usage
Here is a basic example of how to use Periphera to monitor serial and HID devices:


import { DeviceMonitor, DeviceChangeEvent } from 'periphera';

const deviceMonitor = new DeviceMonitor();

deviceMonitor.on('deviceChange', (event: DeviceChangeEvent) => {
    console.log(`${event.deviceType} device ${event.type}:`, event.device);
});


API
DeviceMonitor
Methods
monitorSerialDevices(): Promise<void>

Starts monitoring for changes in serial devices.
monitorHID(): Promise<void>

Starts monitoring for changes in HID devices.
monitorAll(): Promise<void>

Starts monitoring for changes in both serial and HID devices.
Events
deviceChange
Emitted when a device is added or removed.
Event Payload:
type: 'added' | 'removed'
deviceType: 'serial' | 'hid'
device: any
Interfaces
DeviceChangeEvent
type: 'added' | 'removed'
deviceType: 'serial' | 'hid'
device: any
Project Structure
The project is organized as follows:
Contributing
We welcome contributions! Please follow these steps to contribute:

Fork the repository.
Create a new branch: git checkout -b my-feature-branch.
Make your changes and commit them: git commit -m 'Add new feature'.
Push to the branch: git push origin my-feature-branch.
Submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Bugs and Issues
If you find any bugs or issues, please report them at Periphera Issues.

Author
Tahir Dibirov

### Additional Notes

- **Repository**: [https://github.com/tahirdibirovsoftware/periphera](https://github.com/tahirdibirovsoftware/periphera)
- **Keywords**: `node.js`, `serial`, `HID`, `real-time`, `monitoring`, `peripherals`
