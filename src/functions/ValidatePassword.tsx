export default function validatePassword(password: string) {
	const passwordRegexPattern =
		/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
	return (
		password.length >= 8 &&
		password.length <= 32 &&
		passwordRegexPattern.test(password)
	);
}
