import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { mock_hospitalData } from '../utils';
import { get24HoursTimeString } from '../date/utils';

export const load = (async ({ url, params }) => {
	console.log('yed');
	const placeId = params.placeId;
	const date = url.searchParams.get('date');

	console.log('1');

	if (!placeId) {
		throw redirect(307, `/reservation`);
	}

	console.log('2');

	if (!date) {
		throw redirect(307, `/reservation/${placeId}/date`);
	}

	console.log('3');

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

	console.log(filteredByDate);

	const filteredByTime = filteredByDate?.periods?.find((p) => {
		// check time only
		console.log(p.time);
		console.log(get24HoursTimeString(selectedDate));
		if (p.time === get24HoursTimeString(selectedDate) && p.available) {
			return true;
		}
	});

	console.log(filteredByTime);

	if (!filteredByTime) {
		throw redirect(307, `/reservation/${placeId}/date`);
	}

	return {
		selected: filteredByTime
	};
}) satisfies PageServerLoad;
