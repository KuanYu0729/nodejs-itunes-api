import { DeviceType } from "../DeviceType";
declare class BundleIDManager {
    create(name: string, bundleId: string, deviceType: DeviceType): Promise<any>;
    enable(): Promise<void>;
}
declare const _default: BundleIDManager;
export default _default;
