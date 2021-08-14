import axios from "axios";
import urlJoin from "url-join";
import { DeviceType } from "../DeviceType";
import TokenManager from "../Token/TokenManager";
export interface RegisterDeviceResult {
	data: Device
}

export interface QueryDeviceResult {
	data: Device[]
}

export interface ModifyDeviceResult {
	data: Device
}

interface Device {
	type: "devices";
	/**
	 * device id
	 */
	id: string;

	attributes: DeviceAttribute;

	links: LinkList;
}
interface LinkList {
	[key: string]: string;
}

interface DeviceAttribute {
	/**
	 * added date
	 */
	addedDate: string;
	/**
	 * device name
	 */
	name: string;
	/**
	 * device category
	 */
	deviceClass: string;
	/**
	 * model
	 */
	model: string;
	/**
	 * udid of device
	 */
	udid: string;
	/**
	 * device platform
	 */
	platform: 'IOS' | 'MAC_OS';
	/**
	 * status of this device
	 */
	status: 'ENABLED' | 'DISABLED';


}



const URL = "https://api.appstoreconnect.apple.com/v1/devices";

class DeviceManager {
	async register(name: string, udid: string, deviceType: DeviceType): Promise<RegisterDeviceResult> {
		const TOKEN = TokenManager.getToken();
		return await axios({
			"url": URL,
			"method": "post",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			},
			"data": JSON.stringify({
				"data": {
					"type": "devices",
					"attributes": {
						name,
						udid,
						"platform": deviceType
					}
				}
			})
		}).then(response => {
			return response.data;
		}).then(function (result) {
			return {
				"data": result.data
			};
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
	}

	async getList(deviceType?: DeviceType[] | DeviceType): Promise<QueryDeviceResult> {
		if (typeof deviceType === "undefined") {
			deviceType = [DeviceType.IOS];
		} else if (typeof deviceType === "string") {
			deviceType = [deviceType];
		}
		if (!Array.isArray(deviceType)) {
			deviceType = [];
		}
		deviceType = deviceType.filter(function (type: DeviceType) {
			return type === DeviceType.IOS || type === DeviceType.MAC_OS;
		});
		const TOKEN = TokenManager.getToken();
		return await axios({
			"url": URL,
			"method": "get",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			},
			"params": {
				"filter[platform]": deviceType,
				"filter[status]": ["ENABLED"],
				"limit": 200
			}
		}).then(response => {
			return response.data;
		}).then(function (result) {
			return {
				"data": result.data
			};
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
	}

	async rename(udid: string, newName: string): Promise<ModifyDeviceResult> {
		if (typeof udid !== "string") {
			throw new Error("udid is undefined");
		} else if (typeof newName !== "string") {
			throw new Error("newName is undefined");
		} else if (newName === "") {
			throw new Error("newName is empty string");
		}
		const TOKEN = TokenManager.getToken();
		return await axios({
			"url": urlJoin(URL, udid),
			"method": "patch",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			},
			"data": JSON.stringify({
				"data": {
					"id": udid,
					"type": "devices",
					"attributes": {
						name: newName
					}
				}
			})
		}).then(response => {
			return response.data;
		}).then(function (result) {
			return {
				"data": result.data
			};
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
	}
}

export default new DeviceManager();