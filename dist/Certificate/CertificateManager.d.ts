import { CertificateType } from "../CertificateType";
import Certificate from "./Certificate";
export interface QueryCertificateResult {
    data: Certificate[];
}
declare class CertificateManager {
    getAllCertificate(): Promise<QueryCertificateResult>;
    getCertificate(certType: CertificateType): Promise<QueryCertificateResult>;
}
declare const _default: CertificateManager;
export default _default;
