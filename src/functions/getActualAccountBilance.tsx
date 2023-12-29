import { FirebaseApiCredentials } from "../../api.config";
export default async function getActualAccountBilance(userKey: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const retrievedUserKey in data) {
			if (retrievedUserKey === userKey) {
				return data[retrievedUserKey].accountBilance;
			}
		}
	} catch (error) {
		console.log(error);
	}
	return 0.0;
}
