// ISO → "dd:mm:yyyy hh:mm:ss"
export function formatDateToReadable(isoDate: string): string {
	const date = new Date(isoDate);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${day}:${month}:${year} ${hours}:${minutes}:${seconds}`;
}

// "dd:mm:yyyy hh:mm:ss" → ISO
export function parseReadableToISO(readableDate: string): string {
	const [datePart, timePart] = readableDate.split(" ");
	const [day, month, year] = datePart.split(":").map(Number);
	const [hours, minutes, seconds] = timePart.split(":").map(Number);

	const date = new Date(year, month - 1, day, hours, minutes, seconds);
	return date.toISOString();
}
