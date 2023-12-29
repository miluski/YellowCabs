export default function validateSurname(surname: string) {
	const surnameRegexPattern = /^[a-zA-Z]+(?:[-\s][a-zA-Z]+)?$/;
	return (
		surname.length >= 3 &&
		surname.length <= 60 &&
		surnameRegexPattern.test(surname)
	);
}
