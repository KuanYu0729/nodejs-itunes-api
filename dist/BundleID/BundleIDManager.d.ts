import { DeviceType } from "../DeviceType";
declare class BundleIDManager {
    create(name: string, bundleId: string, deviceType: DeviceType): Promise<any>;
}
declare const _default: BundleIDManager;
export default _default;
