import axios from "axios";
import urlJoin from "url-join";
import { DeviceType } from "../DeviceType";
import { LinkList } from "../LinkList";
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

	async getList(deviceType?: DeviceType): Promise<QueryDeviceResult> {
		let deviceTypeList: string[] = [];
		if (typeof deviceType === "undefined") {
			deviceTypeList = [DeviceType.IOS, DeviceType.MAC_OS];
		} else if (typeof deviceType === "string") {
			deviceTypeList = [deviceType];
		}
		if (!Array.isArray(deviceTypeList)) {
			deviceTypeList = [];
		}
		deviceTypeList = deviceTypeList.filter(function (type: DeviceType) {
			return type === DeviceType.IOS || type === DeviceType.MAC_OS;
		});
		const TOKEN = TokenManager.getToken();
		return deviceTypeList.reduce(async function (promise, deviceType) {
			let result = await promise;
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
			}).then(function (result: QueryDeviceResult, subResult: QueryDeviceResult) {
				return {
					"data": result.data.concat(subResult.data)
				};
			}.bind(this, result)).catch(error => {
				throw new Error(error.response.data.errors[0].detail)
			});
		}, Promise.resolve({
			"data": []
		}));

	}

	async rename(udid: string, newName: string): Promise<ModifyDeviceResult> {
		if (typeof udid !== "string") {
			throw new Error("udid is undefined");
		} else if (typeof newName !== "string") {
			throw new Error("newName is undefined");
		} else if (newName === "") {
			throw new Error("newName is empty string");
		}
		let deviceList = (await this.getList()).data;

		let deviceId;
		for (let i = 0; i < deviceList.length; i += 1) {
			let device = deviceList[i];
			if (udid === device.attributes.udid) {
				deviceId = device.id;
				break;
			}
		}
		const TOKEN = TokenManager.getToken();
		return await axios({
			"url": urlJoin(URL, deviceId),
			"method": "patch",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			},
			"data": JSON.stringify({
				"data": {
					"id": deviceId,
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