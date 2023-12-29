export default function validateRepeatedPassword(
	password: string,
	repeatedPassword: string
) {
	return repeatedPassword === password;
}
