import { DeviceChangeEvent } from '../events/deviceChangeEvent';
import { DeviceEventNames } from '../events/deviceEvents';
import { SerialInfo, HIDInfo, DeviceInfo } from '../types/deviceTypes';

/**
 * @interface IDeviceMonitor
 */
export interface IDeviceMonitor {
    on(event: DeviceEventNames, listener: (event: DeviceChangeEvent | DeviceInfo) => void): this;
    monitorSerialDevices(): Promise<void>;
    monitorHID(): Promise<void>;
    monitorAll(): Promise<void>;
    stopMonitoring(): void;
    getSerialDevices(): SerialInfo;
    getHIDDevices(): HIDInfo;   
}
