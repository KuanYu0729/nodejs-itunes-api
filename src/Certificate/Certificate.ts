import { Certificate as CertificateTool } from "@fidm/x509";
import fs from "fs";
import { CertificateAttribute, CertificateInfo } from "../CertificateInfo";


class Certificate {
	attributes: CertificateAttribute;

	constructor(config: CertificateInfo) {
		let { attributes } = config;
		this.attributes = attributes;
	}
	save(filePath: string) {
		let pem = `-----BEGIN CERTIFICATE-----
${this.attributes.certificateContent}
-----END CERTIFICATE-----`;
		let buffer = Buffer.from(pem, 'utf8');
		let cerBuffer = CertificateTool.fromPEM(buffer).raw;
		fs.writeFileSync(filePath, cerBuffer, "binary");
	}
}

export default Certificate;