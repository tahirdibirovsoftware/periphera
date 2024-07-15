import { DeviceMonitor } from './deviceMonitor';
import { SerialInfo, HIDInfo, DeviceInfo } from '../types/deviceTypes';

export class DeviceManager {
    private deviceMonitor: DeviceMonitor;

    constructor(monitoringInterval: number = 2000, filterGhostDevices: boolean = false) {
        this.deviceMonitor = new DeviceMonitor(monitoringInterval, filterGhostDevices);
    }

    /**
     * Finds serial devices by a given property and value (case-insensitive and partial match).
     * @param {keyof SerialInfo[0]} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {SerialInfo}
     */
    public findSerialDevicesBy(property: keyof SerialInfo[0], value: string): SerialInfo {
        const lowerCaseValue = value.toLowerCase();
        return this.deviceMonitor['serialDevices'].filter(device =>
            device[property]?.toString().toLowerCase().includes(lowerCaseValue)
        );
    }

    /**
     * Finds HID devices by a given property and value (case-insensitive and partial match).
     * @param {keyof HIDInfo[0]} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {HIDInfo}
     */
    public findHIDDevicesBy(property: keyof HIDInfo[0], value: string): HIDInfo {
        const lowerCaseValue = value.toLowerCase();
        return this.deviceMonitor['hidDevices'].filter(device =>
            device[property]?.toString().toLowerCase().includes(lowerCaseValue)
        );
    }

    /**
     * Finds all devices (serial and HID) by a given property and value (case-insensitive and partial match).
     * @param {keyof DeviceInfo} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {DeviceInfo[]}
     */
    public findAllDevicesBy(property: keyof DeviceInfo, value: string): DeviceInfo[] {
        const lowerCaseValue = value.toLowerCase();
        const serialDevices = this.findSerialDevicesBy(property as keyof SerialInfo[0], lowerCaseValue);
        const hidDevices = this.findHIDDevicesBy(property as keyof HIDInfo[0], lowerCaseValue);
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
