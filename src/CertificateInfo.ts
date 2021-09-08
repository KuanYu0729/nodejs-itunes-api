import { CertificateType } from "./CertificateType";
import { LinkList } from "./LinkList";

export interface CertificateInfo {
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
	links: LinkList;
}

export interface CertificateAttribute {
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
