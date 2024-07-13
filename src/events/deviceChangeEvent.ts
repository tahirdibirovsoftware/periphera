import { DeviceInfo } from '../types/deviceTypes';

/**
 * @typedef {Object} DeviceChangeEvent
 * @property {'added' | 'removed'} type - The type of the event.
 * @property {'serial' | 'hid'} deviceType - The type of the device.
 * @property {DeviceInfo} device - The device information.
 */
export interface DeviceChangeEvent {
    type: 'added' | 'removed';
    deviceType: 'serial' | 'hid';
    device: DeviceInfo;
}
