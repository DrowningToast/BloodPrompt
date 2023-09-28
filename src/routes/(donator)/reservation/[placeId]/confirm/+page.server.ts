import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { mock_hospitalData } from '../utils';
import { get24HoursTimeString } from '../date/utils';

export const load = (async ({ url, params }) => {
	const placeId = params.placeId;
	const date = url.searchParams.get('date');

	if (!placeId) {
		throw redirect(307, `/reservation`);
	}

	if (!date) {
		throw redirect(307, `/reservation/${placeId}/date`);
	}

	const selectedDate = new Date(+date);

	// check for valid available dates
	// mock checking
	const hospitalData = mock_hospitalData(placeId);
	const filteredByDate = hospitalData.availableDates.find((d) => {
		// check date only
		if (
			d.date.getFullYear() === selectedDate.getFullYear() &&
			d.date.getMonth() === selectedDate.getMonth() &&
			d.date.getDate() === selectedDate.getDate()
		) {
			return true;
		}
	});

	const filteredByTime = filteredByDate?.periods?.find((p) => {
		// check time only
		if (p.time === get24HoursTimeString(selectedDate) && p.available) {
			return true;
		}
	});

	if (!filteredByTime) {
		throw redirect(307, `/reservation/${placeId}/date`);
	}

	return {
		hospitalData: hospitalData,
		dateTime: selectedDate
	};
}) satisfies PageServerLoad;
