export default function validateName(name: string) {
	return name.length >= 3 && name.length <= 50;
}
