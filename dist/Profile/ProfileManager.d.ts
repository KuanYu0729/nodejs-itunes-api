import { ProfileState } from "../ProfileState";
import { ProfileType } from "../ProfileType";
import Profile from "./Profile";
export interface CreateProfileResult {
    data: Profile;
}
export interface GetProfileResult {
    data: Profile[];
}
declare class ProfileManager {
    create(name: string, certId: string[] | string, bundleId: string, deviceId: string[] | string, profileType: ProfileType): Promise<CreateProfileResult>;
    delete(id: string): Promise<any>;
    getAllProfile(): Promise<GetProfileResult>;
    getProfile(profileType: ProfileType, profileState: ProfileState): Promise<GetProfileResult>;
}
declare const _default: ProfileManager;
export default _default;
