import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { get24HoursTimeString } from '../date/utils';
import { trpcOnServer } from '$lib/server/API/TRPC/trpc';
import reservationController from '$lib/server/DatabaseController/reservationController';

export const load = (async ({ url, params, fetch }) => {
	const placeId = params.placeId;
	const date = url.searchParams.get('date');

	const trpcServer = trpcOnServer(fetch);

	if (!placeId) {
		throw redirect(307, `/reservation`);
	}

	if (!date) {
		throw redirect(307, `/reservation/${placeId}/date`);
	}

	const selectedDate = new Date(+date);

	// promise all
	const [hospital, availableDates] = await Promise.all([
		trpcServer.places.findById.query({ placeId: placeId }),
		reservationController.getAvailbleTimeSlots(placeId)
	]);

	if (!hospital) {
		throw redirect(307, `/reservation`);
	}

	const filteredByDate = availableDates.find((d) => {
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
		hospitalData: hospital,
		dateTime: selectedDate
	};
}) satisfies PageServerLoad;
