import { DeviceChangeEvent } from '../events/deviceChangeEvent';
import { DeviceEventNames } from '../events/deviceEvents';

/**
 * @interface IDeviceMonitor
 */
export interface IDeviceMonitor {
    /**
     * @param {DeviceEventNames} event - The event name.
     * @param {(event: DeviceChangeEvent) => void} listener - The event listener.
     * @returns {this}
     */
    on(event: DeviceEventNames, listener: (event: DeviceChangeEvent) => void): this;

    /**
     * Monitors serial devices for changes.
     * @returns {Promise<void>}
     */
    monitorSerialDevices(): Promise<void>;

    /**
     * Monitors HID devices for changes.
     * @returns {Promise<void>}
     */
    monitorHID(): Promise<void>;

    /**
     * Monitors all devices for changes.
     * @returns {Promise<void>}
     */
    monitorAll(): Promise<void>;
}
