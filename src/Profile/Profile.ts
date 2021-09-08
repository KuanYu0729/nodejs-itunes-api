import { ProfileAttribute, ProfileInfo } from "../ProfileInfo";
import fs from "fs";

class Profile {
	attributes: ProfileAttribute;
	constructor(config: ProfileInfo) {
		let { attributes } = config;
		this.attributes = attributes;
	}
	getName() {
		return this.attributes.name;
	}
	save(filePath: string) {
		let buffer = Buffer.from(this.attributes.profileContent, 'base64');
		fs.writeFileSync(filePath, buffer, "binary");
	}

}

export default Profile;