import { DeviceType } from "../DeviceType";
import { LinkList } from "../LinkList";
export interface RegisterDeviceResult {
    data: Device;
}
export interface QueryDeviceResult {
    data: Device[];
}
export interface ModifyDeviceResult {
    data: Device;
}
interface Device {
    type: "devices";
    /**
     * device id
     */
    id: string;
    attributes: DeviceAttribute;
    links: LinkList;
}
interface DeviceAttribute {
    /**
     * added date
     */
    addedDate: string;
    /**
     * device name
     */
    name: string;
    /**
     * device category
     */
    deviceClass: string;
    /**
     * model
     */
    model: string;
    /**
     * udid of device
     */
    udid: string;
    /**
     * device platform
     */
    platform: 'IOS' | 'MAC_OS';
    /**
     * status of this device
     */
    status: 'ENABLED' | 'DISABLED';
}
declare class DeviceManager {
    register(name: string, udid: string, deviceType: DeviceType): Promise<RegisterDeviceResult>;
    getList(deviceType?: DeviceType): Promise<QueryDeviceResult>;
    rename(udid: string, newName: string): Promise<ModifyDeviceResult>;
}
declare const _default: DeviceManager;
export default _default;
