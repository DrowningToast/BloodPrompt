import type { HospitalAvailability } from '../utils';

/**
 *
 * @param month starts at 0 btw
 * @param year
 * @returns
 */
export function daysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate();
}

/**
 *
 * @param start
 * @param stop
 * @param step
 * @returns
 */
export const ArrayRange = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

export const getAvilableDays = (availableHospitalDates: HospitalAvailability, month: number) => {
	const availableDates = availableHospitalDates.availableDates.filter((date) => {
		return date.date.getTime() > Date.now();
	});
	const availableDatesInMonth = availableDates.filter((date) => {
		return date.date.getMonth() === month;
	});

	const _ = availableDatesInMonth.map((d) => {
		return d.date.getDate();
	});
	return _;
};

export const checkEquivalenceTime = (a: Date, b: Date) => {
	return a.getHours() === b.getHours() && a.getMinutes() === b.getMinutes();
};

export const get24HoursTimeString = (date: Date) => {
	return `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${
		(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
	}`;
};
