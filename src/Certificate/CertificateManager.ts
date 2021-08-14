import axios from "axios";
import { CertificateType } from "../CertificateType";
import TokenManager from "../Token/TokenManager";

export interface QueryCertificateResult {
	data: Certificate[]
}

interface Certificate {
	type: 'certificates';
	/**
	 * certificate id
	 */
	id: string;
	/**
	 * certificate attribute
	 */
	attributes: CertificateAttribute;
	/**
	 * certificate links
	 */
	links: LinkList
}

interface LinkList {
	[key: string]: string;
}

interface CertificateAttribute {
	/**
	 * serial number
	 */
	serialNumber: string;
	/**
	 * certificate content
	 */
	certificateContent: string;
	/**
	 * creator user name
	 */
	displayName: string;
	/**
	 * certificate name
	 */
	name: string;
	/**
	 * expiration date
	 */
	expirationDate: string;
	/**
	 * certificate type
	 */
	certificateType: CertificateType;

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
			return {
				"data": result.data
			};
		}).catch(error => {
			throw new Error(error.response.data.errors[0].detail)
		});
	}
}
export default new CertificateManager();