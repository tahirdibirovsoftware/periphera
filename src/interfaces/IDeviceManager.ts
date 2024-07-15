import { SerialInfo, HIDInfo, DeviceInfo } from '../types/deviceTypes';

/**
 * @interface IDeviceManager
 */
export interface IDeviceManager {
    findDeviceBy(property: keyof DeviceInfo, value: string): DeviceInfo[];
    findSerialDevicesBy(property: keyof SerialInfo[0], value: string): SerialInfo;
    findHIDDevicesBy(property: keyof HIDInfo[0], value: string): HIDInfo;
}
