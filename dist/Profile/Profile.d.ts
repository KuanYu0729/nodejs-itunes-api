import { ProfileAttribute, ProfileInfo } from "../ProfileInfo";
declare class Profile {
    attributes: ProfileAttribute;
    constructor(config: ProfileInfo);
    getName(): string;
    save(filePath: string): void;
}
export default Profile;
