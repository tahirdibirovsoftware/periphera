import { DeviceChangeEvent } from '../events/deviceChangeEvent';
import { DeviceEventNames } from '../events/deviceEvents';

/**
 * @interface IDeviceMonitor
 */
export interface IDeviceMonitor {
    on(event: DeviceEventNames, listener: (event: DeviceChangeEvent) => void): this;
    monitorSerialDevices(): Promise<void>;
    monitorHID(): Promise<void>;
    monitorAll(): Promise<void>;
    stopMonitoring(): void;
}
