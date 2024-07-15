import EventEmitter from 'events';
import { SerialPort } from 'serialport';
import HID from 'node-hid';
import { DeviceChangeEvent } from '../events/deviceChangeEvent';
import { DeviceEventNames } from '../events/deviceEvents';
import { IDeviceMonitor } from '../interfaces/IDeviceMonitor';
import { SerialInfo, HIDInfo, DeviceInfo } from '../types/deviceTypes';

/**
 * @class DeviceMonitor
 * @extends EventEmitter
 * @implements {IDeviceMonitor}
 */
export class DeviceMonitor extends EventEmitter implements IDeviceMonitor {
    private serialDevices: SerialInfo = [];
    private hidDevices: HIDInfo = [];
    private intervalId?: NodeJS.Timeout;
    private debounceMap: Map<string, NodeJS.Timeout> = new Map();

    constructor(private monitoringInterval: number = 2000, private filterGhostDevices: boolean = false) {
        super();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        await this.monitorAll();
        this.intervalId = setInterval(() => this.monitorAll(), this.monitoringInterval);
    }

    private filterDevices<T extends DeviceInfo>(devices: T[]): T[] {
        if (!this.filterGhostDevices) {
            return devices;
        }
        return devices.filter(device => device.manufacturer !== undefined && device.manufacturer !== '');
    }

    private debounceEvent(deviceId: string, event: DeviceChangeEvent): void {
        if (this.debounceMap.has(deviceId)) {
            clearTimeout(this.debounceMap.get(deviceId)!);
        }
        this.debounceMap.set(deviceId, setTimeout(() => {
            this.emit('deviceChange', event);
            this.debounceMap.delete(deviceId);
        }, 1000)); // Adjust the debounce interval as needed
    }

    /**
     * Monitors serial devices for changes.
     * @returns {Promise<void>}
     */
    public async monitorSerialDevices(): Promise<void> {
        try {
            let currentSerialDevices: SerialInfo = await SerialPort.list();
            currentSerialDevices = this.filterDevices(currentSerialDevices);

            const removedSerialDevices = this.serialDevices.filter(device =>
                !currentSerialDevices.some(current => current.path === device.path)
            );
            removedSerialDevices.forEach(device => this.debounceEvent(device.path, {
                type: 'removed',
                deviceType: 'serial',
                device
            }));

            const addedSerialDevices = currentSerialDevices.filter(device =>
                !this.serialDevices.some(prev => prev.path === device.path)
            );
            addedSerialDevices.forEach(device => this.debounceEvent(device.path, {
                type: 'added',
                deviceType: 'serial',
                device
            }));

            this.serialDevices = currentSerialDevices;
        } catch (err) {
            console.error('Error listing serial devices:', err);
        }
    }

    /**
     * Monitors HID devices for changes.
     * @returns {Promise<void>}
     */
    public async monitorHID(): Promise<void> {
        try {
            let currentHIDDevices: HIDInfo = HID.devices();
            currentHIDDevices = this.filterDevices(currentHIDDevices);

            const removedHIDDevices = this.hidDevices.filter(device =>
                !currentHIDDevices.some(current => current.path === device.path)
            );
            removedHIDDevices.forEach(device => this.debounceEvent(device.path || device.serialNumber || '', {
                type: 'removed',
                deviceType: 'hid',
                device
            }));

            const addedHIDDevices = currentHIDDevices.filter(device =>
                !this.hidDevices.some(prev => prev.path === device.path)
            );
            addedHIDDevices.forEach(device => this.debounceEvent(device.path || device.serialNumber || '', {
                type: 'added',
                deviceType: 'hid',
                device
            }));

            this.hidDevices = currentHIDDevices;
        } catch (err) {
            console.error('Error listing HID devices:', err);
        }
    }

    /**
     * Monitors all devices for changes.
     * @returns {Promise<void>}
     */
    public async monitorAll(): Promise<void> {
        await Promise.all([this.monitorSerialDevices(), this.monitorHID()]);
    }

    /**
     * Adds an event listener for the specified event.
     * @param {DeviceEventNames} event - The event name.
     * @param {(event: DeviceChangeEvent) => void} listener - The event listener.
     * @returns {this}
     */
    public on(event: DeviceEventNames, listener: (event: DeviceChangeEvent) => void): this {
        return super.on(event, listener);
    }

    /**
     * Stops the device monitoring.
     */
    public stopMonitoring(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
}
