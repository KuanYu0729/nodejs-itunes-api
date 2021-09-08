import CertificateManager, { QueryCertificateResult } from "./Certificate/CertificateManager";
import { iTunesOptions } from "./iTunesOptions";
import TokenManager from "./Token/TokenManager";
import DeviceManager, { ModifyDeviceResult, QueryDeviceResult, RegisterDeviceResult } from "./Device/DeviceManager";
import { DeviceType } from "./DeviceType";
import { CertificateType } from "./CertificateType";
import BundleIDManager, { CreateBundleIDResult, QueryBundleIDResult } from "./BundleID/BundleIDManager";
import { CapabilityType } from "./CapabilityType";
import ProfileManager, { CreateProfileResult, GetProfileResult } from "./Profile/ProfileManager";
import { ProfileType } from "./ProfileType";
import { ProfileState } from "./ProfileState";


class iTunes {
	DeviceType: typeof DeviceType;
	CertificateType: typeof CertificateType;
	CapabilityType: typeof CapabilityType;
	ProfileType: typeof ProfileType;
	ProfileState: typeof ProfileState;
	constructor(options: iTunesOptions) {
		TokenManager.setOptions(options);
		this.DeviceType = DeviceType;
		this.CertificateType = CertificateType;
		this.CapabilityType = CapabilityType;
		this.ProfileType = ProfileType;
		this.ProfileState = ProfileState;
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

	deleleBundleId(id: string): Promise<any> {
		return BundleIDManager.delete(id);
	}

	// Profile

	createProfile(name: string, certId: string[] | string, bundleId: string, deviceId: string[] | string, profileType: ProfileType): Promise<CreateProfileResult> {
		return ProfileManager.create(name, certId, bundleId, deviceId, profileType);
	}

	deleteProfile(id: string): Promise<any> {
		return ProfileManager.delete(id);
	}

	getAllProfile(): Promise<GetProfileResult> {
		return ProfileManager.getAllProfile();
	}

	getProfile(type: ProfileType, state: ProfileState): Promise<GetProfileResult> {
		return ProfileManager.getProfile(type, state);

	}
}

export default iTunes;