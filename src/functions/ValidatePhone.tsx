export default function validatePhone(phone: string) {
	const phoneRegexPattern = /^\+?[0-9]{9,11}$/;
	return (
		phone.length >= 9 && phone.length <= 12 && phoneRegexPattern.test(phone)
	);
}
