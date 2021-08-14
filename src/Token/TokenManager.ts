import { iTunesOptions } from "../iTunesOptions";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";

class TokenManager {
	options: iTunesOptions | undefined;
	expireTime: number | undefined;
	private token: string | undefined;
	setOptions(options: iTunesOptions) {
		this.options = options;
	}
	private updateToken(): string | undefined {
		if (typeof this.options === "undefined") {
			return;
		}
		let options = this.options;
		let currentTimeStamp = Date.now();
		if (typeof this.expireTime !== "undefined" &&
			currentTimeStamp < this.expireTime) {
			return this.token;
		}
		let now = Math.floor(currentTimeStamp / 1000);
		let expriresIn = options.expriresIn;
		if (typeof expriresIn === "undefined" || isNaN(expriresIn)) {
			expriresIn = 1200;
		}
		let expireTime = now + expriresIn;
		this.expireTime = expireTime * 1000;
		const PAYLOAD = {
			'iss': options.issuerId,
			'exp': expireTime,
			'aud': 'appstoreconnect-v1'
		};
		const SIGN_OPTS: SignOptions = {
			'algorithm': 'ES256',
			'header': {
				'alg': 'ES256',
				'kid': options.apiKey,
				'typ': 'JWT'
			}
		};
		return this.token = jsonwebtoken.sign(PAYLOAD, options.privateKey, SIGN_OPTS);
	}

	getToken() {
		this.updateToken();
		return this.token;
	}
}
export default new TokenManager();