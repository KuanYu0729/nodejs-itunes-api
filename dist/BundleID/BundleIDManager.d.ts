import { CapabilityType } from "../CapabilityType";
import { DeviceType } from "../DeviceType";
import { BundleID } from "./BundleID.interface";
export interface CreateBundleIDResult {
    data: BundleID;
}
export interface QueryBundleIDResult {
    data: BundleID[];
}
export interface QueryBundleIDInformationResult {
    data: BundleID;
}
export interface ModifyCapabilityResult {
    data: BundleID;
}
declare class BundleIDManager {
    create(name: string, bundleId: string, deviceType: DeviceType, capabilityType?: CapabilityType[] | CapabilityType): Promise<CreateBundleIDResult>;
    getInfo(id: string): Promise<QueryBundleIDInformationResult>;
    getList(): Promise<QueryBundleIDResult>;
    enable(id: string, capabilityType: CapabilityType[] | CapabilityType): Promise<ModifyCapabilityResult>;
}
declare const _default: BundleIDManager;
export default _default;
