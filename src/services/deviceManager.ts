import { DeviceMonitor } from './deviceMonitor';
import { SerialInfo, HIDInfo, DeviceInfo } from '../types/deviceTypes';

export class DeviceManager {
    private deviceMonitor: DeviceMonitor;

    constructor(monitoringInterval: number = 2000, filterGhostDevices: boolean = false) {
        this.deviceMonitor = new DeviceMonitor(monitoringInterval, filterGhostDevices);
    }

    /**
     * Finds serial devices by a given property and value.
     * @param {keyof SerialPort.PortInfo} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {SerialPort.PortInfo[]}
     */
    public findSerialDevicesBy(property: keyof SerialInfo[0], value: string): SerialInfo {
        return this.deviceMonitor['serialDevices'].filter(device => device[property] === value);
    }

    /**
     * Finds HID devices by a given property and value.
     * @param {keyof HID.Device} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {HID.Device[]}
     */
    public findHIDDevicesBy(property: keyof HIDInfo[0], value: string): HIDInfo {
        return this.deviceMonitor['hidDevices'].filter(device => device[property] === value);
    }

    /**
     * Finds all devices (serial and HID) by a given property and value.
     * @param {keyof DeviceInfo} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {DeviceInfo[]}
     */
    public findAllDevicesBy(property: keyof DeviceInfo, value: string): DeviceInfo[] {
        const serialDevices = this.findSerialDevicesBy(property as keyof SerialInfo[0], value);
        const hidDevices = this.findHIDDevicesBy(property as keyof HIDInfo[0], value);
        return [...serialDevices, ...hidDevices];
    }

    /**
     * Starts monitoring devices.
     * @returns {Promise<void>}
     */
    public async startMonitoring(): Promise<void> {
        await this.deviceMonitor.monitorAll();
    }

    /**
     * Stops monitoring devices.
     */
    public stopMonitoring(): void {
        this.deviceMonitor.stopMonitoring();
    }
}
