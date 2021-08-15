import { ProfileType } from "../ProfileType";
interface Profile {
}
export interface CreateProfileResult {
    data: Profile;
}
declare class ProfileManager {
    create(name: string, certId: string[] | string, bundleId: string, deviceId: string[] | string, profileType: ProfileType): Promise<CreateProfileResult>;
}
declare const _default: ProfileManager;
export default _default;
