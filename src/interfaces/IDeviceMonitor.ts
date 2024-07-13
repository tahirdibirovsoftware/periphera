import { DeviceChangeEvent } from '../events/deviceChangeEvent';

export interface IDeviceMonitor {
    on(event: 'deviceChange', listener: (event: DeviceChangeEvent) => void): this;
    monitorSerialDevices(): Promise<void>;
    monitorHID(): Promise<void>;
    monitorAll(): Promise<void>;
}
