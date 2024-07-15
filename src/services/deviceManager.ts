import { DeviceMonitor } from './deviceMonitor';
import { SerialInfo, HIDInfo, DeviceInfo } from '../types/deviceTypes';

export class DeviceManager {
    private deviceMonitor: DeviceMonitor;

    constructor(deviceMonitor: DeviceMonitor) {
        this.deviceMonitor = deviceMonitor;
    }

    /**
     * Finds devices by a given property and value (case-insensitive and partial match).
     * @param {keyof DeviceInfo} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {DeviceInfo[]}
     */
    public findDeviceBy(property: keyof DeviceInfo, value: string): DeviceInfo[] {
        const lowerCaseValue = value.toLowerCase();
        const serialDevices = this.findSerialDevicesBy(property as keyof SerialInfo[0], lowerCaseValue);
        const hidDevices = this.findHIDDevicesBy(property as keyof HIDInfo[0], lowerCaseValue);
        return [...serialDevices, ...hidDevices];
    }

    /**
     * Finds serial devices by a given property and value (case-insensitive and partial match).
     * @param {keyof SerialInfo[0]} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {SerialInfo}
     */
    private findSerialDevicesBy(property: keyof SerialInfo[0], value: string): SerialInfo {
        const lowerCaseValue = value.toLowerCase();
        return this.deviceMonitor.getSerialDevices().filter(device =>
            device[property]?.toString().toLowerCase().includes(lowerCaseValue)
        );
    }

    /**
     * Finds HID devices by a given property and value (case-insensitive and partial match).
     * @param {keyof HIDInfo[0]} property - The property to search by.
     * @param {string} value - The value to match.
     * @returns {HIDInfo}
     */
    private findHIDDevicesBy(property: keyof HIDInfo[0], value: string): HIDInfo {
        const lowerCaseValue = value.toLowerCase();
        return this.deviceMonitor.getHIDDevices().filter(device =>
            device[property]?.toString().toLowerCase().includes(lowerCaseValue)
        );
    }
}
