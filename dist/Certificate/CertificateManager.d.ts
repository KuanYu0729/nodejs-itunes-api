import { CertificateType } from "../CertificateType";
export interface QueryCertificateResult {
    data: Certificate[];
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
    links: LinkList;
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
declare class CertificateManager {
    getAllCertificate(): Promise<QueryCertificateResult>;
    getCertificate(certType: CertificateType): Promise<QueryCertificateResult>;
}
declare const _default: CertificateManager;
export default _default;
