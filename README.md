# Installation

- Using npm: 

```
npm install nodejs-itunes-api
```

# How to use

## Create instance

```js
let privateKey = fs.readFileSync(/* file of p8 key */));
let itunes = new iTunes({
	"apiKey": "API_KEY",
	"issuerId": "ISSUER_ID",
	"privateKey": privateKey
});
```

## Get all certificate

```js
itunes.getAllCertificate()
	.then(function(response) {
		/* Query certificate result */
	})
	.catch(error => {
		console.error(error);
	});
```

## Get specific type of certificate

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

## Register device UDID

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

## Get device list

```js
itunes.getDeviceList()
	.then(function(response) {
		/* Query device list */
	})
	.catch(error => {
		console.error(error);
	});
```

