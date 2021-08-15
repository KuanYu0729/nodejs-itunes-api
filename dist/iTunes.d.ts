import { QueryCertificateResult } from "./Certificate/CertificateManager";
import { iTunesOptions } from "./iTunesOptions";
import { ModifyDeviceResult, QueryDeviceResult, RegisterDeviceResult } from "./Device/DeviceManager";
import { DeviceType } from "./DeviceType";
import { CertificateType } from "./CertificateType";
declare class iTunes {
    registerDevice: (name: string, udid: string, deviceType: DeviceType) => Promise<RegisterDeviceResult>;
    getDeviceList: (deviceType?: DeviceType | DeviceType[]) => Promise<QueryDeviceResult>;
    DeviceType: typeof DeviceType;
    getAllCertificate: () => Promise<QueryCertificateResult>;
    getCertificate: (certType: CertificateType) => Promise<QueryCertificateResult>;
    CertificateType: typeof CertificateType;
    constructor(options: iTunesOptions);
    renameDevice(udid: string, newName: string): Promise<ModifyDeviceResult>;
}
export default iTunes;
