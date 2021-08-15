import axios from "axios";
import { DeviceType } from "../DeviceType";
import TokenManager from "../Token/TokenManager";

const URL = "https://api.appstoreconnect.apple.com/v1/bundleIds";



class BundleIDManager {
	async create(name: string, bundleId: string, deviceType: DeviceType) {
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

}

export default new BundleIDManager();