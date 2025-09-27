export function isValidReadableDate(dateStr: string): boolean {
	const [datePart, timePart, ...rest] = dateStr.split(" ");
	if (!datePart || !timePart || rest.length > 0) return false;

	const dateSegments = datePart.split(":");
	const timeSegments = timePart.split(":");

	if (dateSegments.length !== 3 || timeSegments.length !== 2) return false;

	const [dayStr, monthStr, yearStr] = dateSegments;
	const [hoursStr, minutesStr] = timeSegments;

	const day = Number(dayStr);
	const month = Number(monthStr);
	const year = Number(yearStr);
	const hours = Number(hoursStr);
	const minutes = Number(minutesStr);

	if ([day, month, year, hours, minutes].some(isNaN)) return false;

	if (year < 1000 || year > 9999) return false;
	if (month < 1 || month > 12) return false;
	if (day < 1 || day > 31) return false;
	if (hours < 0 || hours > 23) return false;
	if (minutes < 0 || minutes > 59) return false;

	const dateObj = new Date(year, month - 1, day, hours, minutes);
	if (
		dateObj.getFullYear() !== year ||
		dateObj.getMonth() !== month - 1 ||
		dateObj.getDate() !== day ||
		dateObj.getHours() !== hours ||
		dateObj.getMinutes() !== minutes
	) {
		return false;
	}

	return true;
}
