import CertificateManager, { QueryCertificateResult } from "./Certificate/CertificateManager";
import { iTunesOptions } from "./iTunesOptions";
import TokenManager from "./Token/TokenManager";
import DeviceManager, { ModifyDeviceResult, QueryDeviceResult, RegisterDeviceResult } from "./Device/DeviceManager";
import { DeviceType } from "./DeviceType";
import { CertificateType } from "./CertificateType";
import BundleIDManager from "./BundleID/BundleIDManager";


class iTunes {
	registerDevice: (name: string, udid: string, deviceType: DeviceType) => Promise<RegisterDeviceResult>;
	getDeviceList: (deviceType?: DeviceType | DeviceType[]) => Promise<QueryDeviceResult>;
	DeviceType: typeof DeviceType;
	getAllCertificate: () => Promise<QueryCertificateResult>;
	getCertificate: (certType: CertificateType) => Promise<QueryCertificateResult>;
	CertificateType: typeof CertificateType;
	constructor(options: iTunesOptions) {
		TokenManager.setOptions(options);
		this.DeviceType = DeviceType;
		this.CertificateType = CertificateType;
		this.getCertificate = CertificateManager.getCertificate;
		this.getAllCertificate = CertificateManager.getAllCertificate;
		this.registerDevice = DeviceManager.register;
		this.getDeviceList = DeviceManager.getList;
	}

	renameDevice(udid: string, newName: string): Promise<ModifyDeviceResult> {
		return DeviceManager.rename(udid, newName);
	}

	createBundleId(name: string, bundleId: string, deviceType: DeviceType) {
		return BundleIDManager.create(name, bundleId, deviceType);
	}
}

export default iTunes;