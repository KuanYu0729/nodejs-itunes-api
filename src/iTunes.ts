import CertificateManager, { QueryCertificateResult } from "./Certificate/CertificateManager";
import { iTunesOptions } from "./iTunesOptions";
import TokenManager from "./Token/TokenManager";
import DeviceManager, { ModifyDeviceResult, QueryDeviceResult, RegisterDeviceResult } from "./Device/DeviceManager";
import { DeviceType } from "./DeviceType";
import { CertificateType } from "/Users/kuan-yuchou/Documents/nodejs/nodejs-itunes-api/itunes/src/CertificateType";


class iTunes {
	registerDevice: (name: string, udid: string, deviceType: DeviceType) => Promise<RegisterDeviceResult>;
	getDeviceList: (deviceType?: DeviceType | DeviceType[]) => Promise<QueryDeviceResult>;
	DeviceType: typeof DeviceType;
	getAllCertificate: () => Promise<QueryCertificateResult>;
	renameDevice: (udid: string, newName: string) => Promise<ModifyDeviceResult>;
	getCertificate: (certType: import("/Users/kuan-yuchou/Documents/nodejs/nodejs-itunes-api/itunes/src/CertificateType").CertificateType) => Promise<QueryCertificateResult>;
	CertificateType: typeof CertificateType;
	constructor(options: iTunesOptions) {
		TokenManager.setOptions(options);
		this.DeviceType = DeviceType;
		this.CertificateType = CertificateType;
		this.getCertificate = CertificateManager.getCertificate;
		this.getAllCertificate = CertificateManager.getAllCertificate;
		this.registerDevice = DeviceManager.register;
		this.getDeviceList = DeviceManager.getList;
		this.renameDevice = DeviceManager.rename;
	}
}

export default iTunes;