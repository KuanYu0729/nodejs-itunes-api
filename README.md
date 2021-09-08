# Installation

- Using npm: 

```
npm install nodejs-itunes-api
```

# How to use

### Create instance

```js
let privateKey = fs.readFileSync(/* file of p8 key */));
let itunes = new iTunes({
	"apiKey": "API_KEY",
	"issuerId": "ISSUER_ID",
	"privateKey": privateKey
});
```

### Get all certificate

```js
itunes.getAllCertificate()
	.then(function(response) {
		/* Query certificate result */
	})
	.catch(error => {
		console.error(error);
	});
```

### Get specific type of certificate

- Support certificate: `IOS_DEVELOPMENT`, `IOS_DISTRIBUTION`, `DEVELOPMENT`, `DISTRIBUTION`

```js
const CertificateType = itunes.CertificateType;
itunes.getCertificate(CertificateType.DEVELOPMENT)
	.then(function(response) {
		/* Query certificate result */
	})
	.catch(error => {
		console.error(error);
	});
```

### Register device UDID

```js
const DEVICE_NAME = "DEVICE NAME";
const UDID = "UDID";
const DeviceType = itunes.DeviceType;

itunes.registerDevice(DEVICE_NAME, UDID, DeviceType.IOS)
	.then(function(response) {
		/* register result */
	})
	.catch(error => {
		console.error(error);
	});
```

### Get device list

```js
itunes.getDeviceList()
	.then(function(response) {
		/* Query device list */
	})
	.catch(error => {
		console.error(error);
	});
```

### Create bundle id

```js
const BUNDLE_ID_NAME = "BUNDLE_ID_NAME";
const BUNDLE_ID = "BUNDLE_ID";
const DeviceType = itunes.DeviceType;

itunes.createBundleId(BUNDLE_ID_NAME, BUNDLE_ID, DeviceType.IOS)
	.then(function(response) {
		/* Create bundle id result*/
	})
	.catch(error => {
		console.error(error);
	});
```

### Create bundle id with capability

- Create bundle id with single capability.

```js
const BUNDLE_ID_NAME = "BUNDLE_ID_NAME";
const BUNDLE_ID = "BUNDLE_ID";
const DeviceType = itunes.DeviceType;
const Capability = itunes.CapabilityType;

itunes.createBundleId(BUNDLE_ID_NAME, BUNDLE_ID, DeviceType.IOS, Capability.PUSH_NOTIFICATIONS)
	.then(function(response) {
		/* Create bundle id result*/
	})
	.catch(error => {
		console.error(error);
	});
```

- Create bundle id with multiple capability.

```js
const BUNDLE_ID_NAME = "BUNDLE_ID_NAME";
const BUNDLE_ID = "BUNDLE_ID";
const DeviceType = itunes.DeviceType;
const Capability = itunes.CapabilityType;

itunes.createBundleId(BUNDLE_ID_NAME, BUNDLE_ID, DeviceType.IOS, [Capability.PUSH_NOTIFICATIONS, Capability.ICLOUD])
	.then(function(response) {
		/* Create bundle id result*/
	})
	.catch(error => {
		console.error(error);
	});
```

### Delete bundle id

```js
const BUNDLE_ID = "ID of Bundle-ID";

itunes.deleleBundleId(BUNDLE_ID)
	.then(function() {
		/* delete bundle-id success */
	}).catch(error => {
		console.error(error);
	});
```

### Create profile

- Support profile type: `IOS_APP_DEVELOPMENT`, `IOS_APP_STORE`, `IOS_APP_ADHOC`, `IOS_APP_INHOUSE`, `MAC_APP_DEVELOPMENT`, `MAC_APP_STORE`, `MAC_APP_DIRECT`, `TVOS_APP_DEVELOPMENT`, `TVOS_APP_STORE`, `TVOS_APP_ADHOC`, `TVOS_APP_INHOUSE`, `MAC_CATALYST_APP_DEVELOPMENT`, `MAC_CATALYST_APP_STORE` and `MAC_CATALYST_APP_DIRECT`

```js
const ProfileType = itunes.ProfileType;
const CERT_ID = "CERTIFICATE_ID";
const BUNDLE_ID = "ID of Bundle-ID";
const PROFILE_NAME = "PROFILE_NAME";

itunes.getDeviceList()
	.then(function(response) {
		let deviceIdList = response.data.map(function(info) {
			return info.id;
		});

		return itunes.createProfile(PROFILE_NAME, CERT_ID, BUNDLE_ID, deviceIdList, ProfileType.IOS_APP_DEVELOPMENT)
			.then(function(response) {
				/* create profile result */
			})
			.catch(error => {
				console.error(error);
			});
	})
	.catch(error => {
		console.error(error);
	});
```

### Delete profile

```js
const ProfileType = itunes.ProfileType;
const CERT_ID = "CERTIFICATE_ID";
const BUNDLE_ID = "ID of Bundle-ID";
const PROFILE_NAME = "PROFILE_NAME";
itunes.getDeviceList()
	.then(function(response) {
		let deviceIdList = response.data.map(function(info) {
			return info.id;
		});

		return itunes.createProfile(PROFILE_NAME, CERT_ID, BUNDLE_ID, deviceIdList, ProfileType.IOS_APP_DEVELOPMENT);
	})
	.then(function(response) {
		let profileId = response.data.id;
		return itunes.deleteProfile(profileId);
	})
	.then(function() {
		/* delete profile success */
	})
	.catch(error => {
		console.error(error);
	});
```

### Get Profile

```js
let ProfileType = itunes.ProfileType;
let ProfileState = itunes.ProfileState;

itunes.getProfile(ProfileType.IOS_APP_DEVELOPMENT, ProfileState.ACTIVE)
	.then(function(result) {
		let dirPath = /* directory path */;
		for (let i = 0; i < result.data.length; i += 1) {
			let profile = result.data[i];
			let fileName = `${profile.getName()}.mobileprovision`;
			let filePath = path.join(dirPath, fileName);
			profile.save(filePath);
		}
	})
	.catch(error => {
		console.error(error);
	});
```



# Next

- ~~Fixed device rename by UDID~~

- ~~Support create bundle-id~~

- ~~Support bundle-id capabilities~~

- ~~Support delete bundle-id~~

- ~~Support create profile~~

- ~~Support delete profile~~

- Support modify profile (delete original profile and create new profile)

- Support bundle-id filter
