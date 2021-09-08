import { CertificateAttribute, CertificateInfo } from "../CertificateInfo";
declare class Certificate {
    attributes: CertificateAttribute;
    constructor(config: CertificateInfo);
    save(filePath: string): void;
}
export default Certificate;
