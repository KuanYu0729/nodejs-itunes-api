import { iTunesOptions } from "../iTunesOptions";
declare class TokenManager {
    options: iTunesOptions | undefined;
    expireTime: number | undefined;
    private token;
    setOptions(options: iTunesOptions): void;
    private updateToken;
    getToken(): string;
}
declare const _default: TokenManager;
export default _default;
