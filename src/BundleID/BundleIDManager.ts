import axios from "axios";
import urljoin from "url-join";
import { CapabilityType } from "../CapabilityType";
import { DeviceType } from "../DeviceType";
import TokenManager from "../Token/TokenManager";
import { BundleID } from "./BundleID.interface";

const URL = "https://api.appstoreconnect.apple.com/v1/bundleIds";
const CAPABILITY_URL = "https://api.appstoreconnect.apple.com/v1/bundleIdCapabilities";

export interface CreateBundleIDResult {
	data: BundleID;
}

export interface QueryBundleIDResult {
	data: BundleID[];
}

export interface QueryBundleIDInformationResult {
	data: BundleID;
}

export interface ModifyCapabilityResult {
	data: BundleID;
}


class BundleIDManager {
	async create(name: string, bundleId: string, deviceType: DeviceType, capabilityType?: CapabilityType[] | CapabilityType): Promise<CreateBundleIDResult> {
		const TOKEN = TokenManager.getToken();
		let result = await axios({
			"url": URL,
			"method": "post",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			},
			"data": JSON.stringify({
				"data": {
					"type": "bundleIds",
					"attributes": {
						name,
						"identifier": bundleId,
						"platform": deviceType
					}
				}
			})
		}).then(response => {
			return response.data;
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
		if (typeof capabilityType === "undefined") {
			return result;
		}
		let id = result.data.id;
		return this.enable(result.data.id, capabilityType).then(() => {
			return this.getInfo(id);
		});
	}

	async getInfo(id: string): Promise<QueryBundleIDInformationResult> {
		if (typeof id !== "string") {
			throw new Error("Invalid id of bundle-id");
		}
		const TOKEN = TokenManager.getToken();
		let url = urljoin(URL, id);
		return await axios({
			"url": url,
			"method": "get",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			}
		}).then(response => {
			return response.data;
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
	}

	async getList(): Promise<QueryBundleIDResult> {
		let deviceTypeList = [DeviceType.IOS, DeviceType.MAC_OS];
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
					"limit": 200
				}
			}).then(response => {
				return response.data;
			}).then(function (result: QueryBundleIDResult, subResult: QueryBundleIDResult) {
				let newData = result.data;
				for (let i = 0; i < subResult.data.length; i += 1) {
					let isExist = false;
					for (let j = 0; j < newData.length; j += 1) {
						if (subResult.data[i].id === newData[j].id) {
							isExist = true;
							break;
						}
					}
					if (!isExist) {
						newData.push(subResult.data[i]);
					}

				}
				return {
					"data": newData
				};
			}.bind(this, result)).catch(error => {
				throw new Error(error.response.data.errors[0].detail)
			});
		}, Promise.resolve({
			"data": []
		}));
	}

	async enable(id: string, capabilityType: CapabilityType[] | CapabilityType): Promise<ModifyCapabilityResult> {
		let capabilityTypeList;
		if (!Array.isArray(capabilityType)) {
			capabilityTypeList = [capabilityType];
		} else {
			capabilityTypeList = capabilityType;
		}
		let typeList = Object.values(CapabilityType);
		for (let i = 0; i < capabilityTypeList.length; i += 1) {
			if (typeList.indexOf(capabilityTypeList[i]) === -1) {
				throw new Error(`Invalid capability type: ${capabilityTypeList}`);
			}
		}
		if (capabilityTypeList.length === 0) {
			throw new Error("No valid capability type");
		}
		const TOKEN = TokenManager.getToken();
		return capabilityTypeList.reduce(async (promise, type) => {
			await promise;
			return axios({
				"url": CAPABILITY_URL,
				"method": "post",
				"headers": {
					'Authorization': 'Bearer ' + TOKEN,
					'Content-Type': 'application/json'
				},
				"data": JSON.stringify({
					"data": {
						"type": "bundleIdCapabilities",
						"attributes": {
							"capabilityType": type
						},
						"relationships": {
							"bundleId": {
								"data": {
									"type": "bundleIds",
									"id": id
								}
							}
						}
					}
				})
			}).then(response => {
				return response.data;
			}, error => {
				throw new Error(error.response.data.errors[0].detail)
			});
		}, Promise.resolve({
			"data": {}
		}));
	}
}

export default new BundleIDManager();