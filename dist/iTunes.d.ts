import { QueryCertificateResult } from "./Certificate/CertificateManager";
import { iTunesOptions } from "./iTunesOptions";
import { ModifyDeviceResult, QueryDeviceResult, RegisterDeviceResult } from "./Device/DeviceManager";
import { DeviceType } from "./DeviceType";
import { CertificateType } from "./CertificateType";
import { CreateBundleIDResult, QueryBundleIDResult } from "./BundleID/BundleIDManager";
import { CapabilityType } from "./CapabilityType";
import { CreateProfileResult } from "./Profile/ProfileManager";
import { ProfileType } from "./ProfileType";
declare class iTunes {
    DeviceType: typeof DeviceType;
    CertificateType: typeof CertificateType;
    CapabilityType: typeof CapabilityType;
    ProfileType: typeof ProfileType;
    constructor(options: iTunesOptions);
    getCertificate(certType: CertificateType): Promise<QueryCertificateResult>;
    getAllCertificate(): Promise<QueryCertificateResult>;
    registerDevice(name: string, udid: string, deviceType: DeviceType): Promise<RegisterDeviceResult>;
    getDeviceList(deviceType?: DeviceType): Promise<QueryDeviceResult>;
    renameDevice(udid: string, newName: string): Promise<ModifyDeviceResult>;
    createBundleId(name: string, bundleId: string, deviceType: DeviceType, capabilityType?: CapabilityType[] | CapabilityType): Promise<CreateBundleIDResult>;
    getBundleIdList(): Promise<QueryBundleIDResult>;
    createProfile(name: string, certId: string[] | string, bundleId: string, deviceId: string[] | string, profileType: ProfileType): Promise<CreateProfileResult>;
}
export default iTunes;
