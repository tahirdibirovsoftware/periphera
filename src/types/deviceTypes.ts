import { SerialPort } from 'serialport';
import HID from 'node-hid';

export type SerialInfo = Awaited<ReturnType<typeof SerialPort.list>>;
export type HIDInfo = Awaited<ReturnType<typeof HID.devicesAsync>>;

export type DeviceInfo = SerialInfo[number] | HIDInfo[number];
