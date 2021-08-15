import CertificateManager, { QueryCertificateResult } from "./Certificate/CertificateManager";
import { iTunesOptions } from "./iTunesOptions";
import TokenManager from "./Token/TokenManager";
import DeviceManager, { ModifyDeviceResult, QueryDeviceResult, RegisterDeviceResult } from "./Device/DeviceManager";
import { DeviceType } from "./DeviceType";
import { CertificateType } from "./CertificateType";
import BundleIDManager, { CreateBundleIDResult, QueryBundleIDResult } from "./BundleID/BundleIDManager";
import { CapabilityType } from "./CapabilityType";


class iTunes {



	DeviceType: typeof DeviceType;
	CertificateType: typeof CertificateType;
	CapabilityType: typeof CapabilityType;
	constructor(options: iTunesOptions) {
		TokenManager.setOptions(options);
		this.DeviceType = DeviceType;
		this.CertificateType = CertificateType;
		this.CapabilityType = CapabilityType;
	}

	// Certificate

	getCertificate(certType: CertificateType): Promise<QueryCertificateResult> {
		return CertificateManager.getCertificate(certType);
	}

	getAllCertificate(): Promise<QueryCertificateResult> {
		return CertificateManager.getAllCertificate();
	}

	// Device

	registerDevice(name: string, udid: string, deviceType: DeviceType): Promise<RegisterDeviceResult> {
		return DeviceManager.register(name, udid, deviceType);
	}

	getDeviceList(deviceType?: DeviceType): Promise<QueryDeviceResult> {
		return DeviceManager.getList(deviceType);
	}

	renameDevice(udid: string, newName: string): Promise<ModifyDeviceResult> {
		return DeviceManager.rename(udid, newName);
	}

	// Bundle ID

	createBundleId(name: string, bundleId: string, deviceType: DeviceType, capabilityType?: CapabilityType[] | CapabilityType): Promise<CreateBundleIDResult> {
		return BundleIDManager.create(name, bundleId, deviceType, capabilityType);
	}

	getBundleIdList(): Promise<QueryBundleIDResult> {
		return BundleIDManager.getList();
	}
}

export default iTunes;