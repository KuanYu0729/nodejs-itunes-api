import { iTunesOptions } from "./iTunesOptions";
declare class iTunes {
    constructor(options: iTunesOptions);
    getAllCertificate(): Promise<any>;
}
export default iTunes;
