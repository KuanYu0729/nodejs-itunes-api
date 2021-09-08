import { QueryCertificateResult } from "./Certificate/CertificateManager";
import { iTunesOptions } from "./iTunesOptions";
import { ModifyDeviceResult, QueryDeviceResult, RegisterDeviceResult } from "./Device/DeviceManager";
import { DeviceType } from "./DeviceType";
import { CertificateType } from "./CertificateType";
import { CreateBundleIDResult, QueryBundleIDResult } from "./BundleID/BundleIDManager";
import { CapabilityType } from "./CapabilityType";
import { CreateProfileResult, GetProfileResult } from "./Profile/ProfileManager";
import { ProfileType } from "./ProfileType";
import { ProfileState } from "./ProfileState";
declare class iTunes {
    DeviceType: typeof DeviceType;
    CertificateType: typeof CertificateType;
    CapabilityType: typeof CapabilityType;
    ProfileType: typeof ProfileType;
    ProfileState: typeof ProfileState;
    constructor(options: iTunesOptions);
    getCertificate(certType: CertificateType): Promise<QueryCertificateResult>;
    getAllCertificate(): Promise<QueryCertificateResult>;
    registerDevice(name: string, udid: string, deviceType: DeviceType): Promise<RegisterDeviceResult>;
    getDeviceList(deviceType?: DeviceType): Promise<QueryDeviceResult>;
    renameDevice(udid: string, newName: string): Promise<ModifyDeviceResult>;
    createBundleId(name: string, bundleId: string, deviceType: DeviceType, capabilityType?: CapabilityType[] | CapabilityType): Promise<CreateBundleIDResult>;
    getBundleIdList(): Promise<QueryBundleIDResult>;
    deleleBundleId(id: string): Promise<any>;
    createProfile(name: string, certId: string[] | string, bundleId: string, deviceId: string[] | string, profileType: ProfileType): Promise<CreateProfileResult>;
    deleteProfile(id: string): Promise<any>;
    getAllProfile(): Promise<GetProfileResult>;
    getProfile(type: ProfileType, state: ProfileState): Promise<GetProfileResult>;
}
export default iTunes;
