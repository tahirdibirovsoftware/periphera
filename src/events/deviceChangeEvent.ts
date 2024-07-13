export interface DeviceChangeEvent {
    type: 'added' | 'removed';
    deviceType: 'serial' | 'hid';
    device: any;
}
