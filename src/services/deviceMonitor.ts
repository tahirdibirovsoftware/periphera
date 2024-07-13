import EventEmitter from 'events';
import { SerialPort } from 'serialport';
import HID from 'node-hid';
import { DeviceChangeEvent } from '../events/deviceChangeEvent';
import { IDeviceMonitor } from '../interfaces/IDeviceMonitor';

type SerialInfo = Awaited<ReturnType<typeof SerialPort.list>>;
type HIDInfo = Awaited<ReturnType<typeof HID.devicesAsync>>;

export class DeviceMonitor extends EventEmitter implements IDeviceMonitor {
    private serialDevices: SerialInfo = [];
    private hidDevices: HIDInfo = [];

    constructor() {
        super();
        // Initial scan
        this.monitorAll();
        // Periodically scan for device changes
        setInterval(() => this.monitorAll(), 2000); // Adjust the interval as needed
    }

    public async monitorSerialDevices(): Promise<void> {
        try {
            const currentSerialDevices = await SerialPort.list();

            // Detect removed serial devices
            const removedSerialDevices = this.serialDevices.filter(device =>
                !currentSerialDevices.some(current => current.path === device.path)
            );
            removedSerialDevices.forEach(device => this.emit('deviceChange', {
                type: 'removed',
                deviceType: 'serial',
                device
            }));

            // Detect added serial devices
            const addedSerialDevices = currentSerialDevices.filter(device =>
                !this.serialDevices.some(prev => prev.path === device.path)
            );
            addedSerialDevices.forEach(device => this.emit('deviceChange', {
                type: 'added',
                deviceType: 'serial',
                device
            }));

            this.serialDevices = currentSerialDevices;
        } catch (err) {
            console.error('Error listing serial devices:', err);
        }
    }

    public async monitorHID(): Promise<void> {
        try {
            const currentHIDDevices = await HID.devicesAsync();

            // Detect removed HID devices
            const removedHIDDevices = this.hidDevices.filter(device =>
                !currentHIDDevices.some(current => current.path === device.path)
            );
            removedHIDDevices.forEach(device => this.emit('deviceChange', {
                type: 'removed',
                deviceType: 'hid',
                device
            }));

            // Detect added HID devices
            const addedHIDDevices = currentHIDDevices.filter(device =>
                !this.hidDevices.some(prev => prev.path === device.path)
            );
            addedHIDDevices.forEach(device => this.emit('deviceChange', {
                type: 'added',
                deviceType: 'hid',
                device
            }));

            this.hidDevices = currentHIDDevices;
        } catch (err) {
            console.error('Error listing HID devices:', err);
        }
    }

    public async monitorAll(): Promise<void> {
        await Promise.all([this.monitorSerialDevices(), this.monitorHID()]);
    }
}
