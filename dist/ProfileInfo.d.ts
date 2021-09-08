import { LinkList } from "./LinkList";
import { ProfileState } from "./ProfileState";
import { ProfileType } from "./ProfileType";
export interface ProfileInfo {
    type: 'profiles';
    id: string;
    attributes: ProfileAttribute;
    links: LinkList;
}
export interface ProfileAttribute {
    profileState: ProfileState;
    createdDate: string;
    profileType: ProfileType;
    name: string;
    profileContent: string;
    uuid: string;
    platform: 'IOS' | 'MAC_OS';
    expirationDate: string;
}
