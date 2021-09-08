import axios from "axios";
import urljoin from "url-join";
import urlJoin from "url-join";
import { ProfileInfo } from "../ProfileInfo";
import { ProfileState } from "../ProfileState";
import { ProfileType } from "../ProfileType";
import TokenManager from "../Token/TokenManager";
import Profile from "./Profile";
const URL = "https://api.appstoreconnect.apple.com/v1/profiles";



export interface CreateProfileResult {
	data: Profile;
}

export interface GetProfileResult {
	data: Profile[];
}
class ProfileManager {
	async create(name: string, certId: string[] | string, bundleId: string, deviceId: string[] | string, profileType: ProfileType): Promise<CreateProfileResult> {
		let certificateData = [];
		if (!Array.isArray(certId)) {
			if (typeof certId === "string") {
				certificateData.push({
					"id": certId,
					"type": "certificates"
				});
			}
		} else {
			certificateData = certId.map(function (id) {
				return {
					"id": id,
					"type": "certificates"
				};
			});
		}
		let deviceData = [];
		if (!Array.isArray(deviceId)) {
			if (typeof deviceId === "string") {
				deviceData.push({
					"id": deviceId,
					"type": "devices"
				});
			}
		} else {
			deviceData = deviceId.map(function (id) {
				return {
					"id": id,
					"type": "devices"
				};
			});
		}
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
					"type": "profiles",
					"attributes": {
						name,
						profileType
					},
					"relationships": {
						"bundleId": {
							"data": {
								"id": bundleId,
								"type": "bundleIds"
							}
						},
						"certificates": {
							"data": certificateData
						},
						"devices": {
							"data": deviceData
						}

					}
				}
			})
		}).then(response => {
			return response.data;
		}).then(function (result) {
			return {
				"data": new Profile(result.data)
			};
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
	}

	async delete(id: string): Promise<any> {
		if (typeof id !== "string") {
			throw new Error("Invalid profile id");
		}
		const TOKEN = TokenManager.getToken();
		let url = urljoin(URL, id);
		return await axios({
			"url": url,
			"method": "delete",
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

	async getAllProfile(): Promise<GetProfileResult> {
		return Object.keys(ProfileType).reduce(async function (promise: Promise<GetProfileResult>, type: ProfileType) {
			let result = await promise;
			return Object.keys(ProfileState).reduce(async function (type: ProfileType, promise: Promise<GetProfileResult>, state: ProfileState) {
				let result = await promise;
				let subResult = await this.getProfile(type, state);
				result.data = result.data.concat(subResult.data);
				return result;
			}.bind(this, type), Promise.resolve(result));
		}.bind(this), Promise.resolve({
			"data": []
		}));
	}

	async getProfile(profileType: ProfileType, profileState: ProfileState): Promise<GetProfileResult> {
		const TOKEN = TokenManager.getToken();
		return axios({
			"url": URL,
			"method": "get",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			},
			"params": {
				"filter[profileState]": [profileState],
				"filter[profileType]": [profileType],
				"limit": 200
			}
		}).then(response => {
			return response.data
		}).then(function (result) {
			let profileList = result.data.map(function (info: ProfileInfo) {
				return new Profile(info);
			});
			return {
				"data": profileList
			};
		})
	}


}
export default new ProfileManager();