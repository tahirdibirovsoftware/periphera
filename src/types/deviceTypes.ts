import { SerialPort } from 'serialport';
import HID from 'node-hid';

export type SerialInfo = Awaited<ReturnType<typeof SerialPort.list>>;
export type HIDInfo = Awaited<ReturnType<typeof HID.devices>>;

export type DeviceInfo = SerialInfo[number] | HIDInfo[number];
