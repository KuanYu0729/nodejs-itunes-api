import axios from "axios";
import { DeviceType } from "../DeviceType";
import { LinkList } from "../LinkList";
import TokenManager from "../Token/TokenManager";

const URL = "https://api.appstoreconnect.apple.com/v1/bundleIds";

export interface CreateBundleIDResult {
	data: BundleID;
}

export interface QueryBundleIDResult {
	data: BundleID[];
}

interface BundleIDAttribute {
	/**
	 * bundle id name
	 */
	name: string;
	/**
	 * bundle id
	 */
	identifier: string;
	/**
	 * device platform
	 */
	platform: 'IOS' | 'MAC_OS';
	/**
	 * team id
	 */
	seedId: string;
}

interface BundleIdCapability {
	type: 'bundleIdCapabilities';
	id: string;
}

interface Profile {
	type: 'profiles';
	id: string;
}

interface Profiles {
	data: Profile[];
	links: LinkList;
}

interface BundleIdCapabilities {
	data: BundleIdCapability[];
	links: LinkList;
}

interface App {

}

interface RelationShips {
	app: App;
	bundleIdCapabilities: BundleIdCapabilities;
	profiles: Profiles;
}

interface BundleID {
	type: 'bundleIds';
	/**
	 * id
	 */
	id: string;
	attributes: BundleIDAttribute;
	links: LinkList
	relationships: RelationShips
}


class BundleIDManager {
	async create(name: string, bundleId: string, deviceType: DeviceType): Promise<CreateBundleIDResult> {
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
		}, error => {
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
}

export default new BundleIDManager();