import { LinkList } from "../LinkList";

export interface BundleID {
	type: 'bundleIds';
	/**
	 * id
	 */
	id: string;
	attributes: BundleIDAttribute;
	links: LinkList
	relationships: RelationShips
}


interface RelationShips {
	app: App;
	bundleIdCapabilities: BundleIdCapabilities;
	profiles: Profiles;
}

interface Profile {
	type: 'profiles';
	id: string;
}

interface Profiles {
	data: Profile[];
	links: LinkList;
}

interface BundleIdCapabilities {
	data: BundleIdCapability[];
	links: LinkList;
}

interface App {

}


interface BundleIdCapability {
	type: 'bundleIdCapabilities';
	id: string;
}


interface BundleIDAttribute {
	/**
	 * bundle id name
	 */
	name: string;
	/**
	 * bundle id
	 */
	identifier: string;
	/**
	 * device platform
	 */
	platform: 'IOS' | 'MAC_OS';
	/**
	 * team id
	 */
	seedId: string;
}
