import { DeviceType } from "../DeviceType";
import { LinkList } from "../LinkList";
export interface CreateBundleIDResult {
    data: BundleID;
}
export interface QueryBundleIDResult {
    data: BundleID[];
}
interface BundleIDAttribute {
    /**
     * bundle id name
     */
    name: string;
    /**
     * bundle id
     */
    identifier: string;
    /**
     * device platform
     */
    platform: 'IOS' | 'MAC_OS';
    /**
     * team id
     */
    seedId: string;
}
interface BundleID {
    type: 'bundleIds';
    /**
     * id
     */
    id: string;
    attributes: BundleIDAttribute;
    links: LinkList;
}
declare class BundleIDManager {
    create(name: string, bundleId: string, deviceType: DeviceType): Promise<CreateBundleIDResult>;
    getList(): Promise<QueryBundleIDResult>;
    enable(): Promise<void>;
}
declare const _default: BundleIDManager;
export default _default;
