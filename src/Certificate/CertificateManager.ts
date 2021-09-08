import axios from "axios";
import { CertificateInfo } from "../CertificateInfo";
import { CertificateType } from "../CertificateType";
import { LinkList } from "../LinkList";
import TokenManager from "../Token/TokenManager";
import Certificate from "./Certificate";

export interface QueryCertificateResult {
	data: Certificate[]
}






class CertificateManager {
	getAllCertificate(): Promise<QueryCertificateResult> {
		return Object.values(CertificateType).reduce(async (promise, certType) => {
			let result = await promise;
			return this.getCertificate(certType).then(function (subResult) {
				let data = result.data.concat(subResult.data);
				return {
					data
				};
			});
		}, Promise.resolve({
			"data": []
		}));
	}

	getCertificate(certType: CertificateType): Promise<QueryCertificateResult> {
		let validTypeList = Object.values(CertificateType);
		if (validTypeList.indexOf(certType) === -1) {
			throw new Error(`Invalid certificate type: ${certType}`)
		}
		const TOKEN = TokenManager.getToken();
		return axios({
			"url": "https://api.appstoreconnect.apple.com/v1/certificates",
			"method": "get",
			"headers": {
				'Authorization': 'Bearer ' + TOKEN,
				'Content-Type': 'application/json'
			},
			"params": {
				"fields[certificates]": "certificateContent, certificateType, csrContent, displayName, expirationDate, name, platform, serialNumber",
				"filter[certificateType]": [certType],
				"limit": 200
			}
		}).then(response => {
			return response.data;
		}).then(result => {
			let data;
			if (Array.isArray(result.data)) {
				data = result.data.map(function (data: CertificateInfo) {
					return new Certificate(data);
				});
			} else {
				data = [];
			}
			return {
				data
			};
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
	}
}
export default new CertificateManager();