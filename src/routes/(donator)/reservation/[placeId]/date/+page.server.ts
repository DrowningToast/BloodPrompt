import prisma from '$lib/server/database';
import { placeController } from '$lib/server/database/controllers/placeController';
import reservationController from '$lib/server/database/controllers/reservationController';
import { placesRouter } from '$lib/server/routes/placesRouter';
import type { HospitalAvailability } from '../utils';

import type { PageServerLoad } from './$types';
import { checkEquivalenceDate, get24HoursTimeString } from './utils';

export const load = (async ({ params }) => {
	const { placeId } = params;

	const [hospital, availableDates] = await Promise.all([
		placeController.get({
			where: {
				id: placeId
			}
		}),

		reservationController.getAvailbleTimeSlots(placeId)
	]);

	// check if placeId exists or not

	if (!hospital) {
		throw {
			status: 404,
			error: 'Hospital not found'
		};
	}

	const hospitalAvailability: HospitalAvailability = {
		id: placeId,
		name: hospital.name,
		availableDates
	};

	return { hospitalData: hospitalAvailability };
}) satisfies PageServerLoad;
