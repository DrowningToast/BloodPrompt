import prisma from '$lib/server/database';
import {
	type HospitalAvailability,
	getDatesFrom,
	DEFAULT_TIME_SLOT,
	MAX_SEAT_PER_TIME_SLOT
} from '../utils';
import type { PageServerLoad } from './$types';
import { checkEquivalenceDate, get24HoursTimeString } from './utils';

export const load = (async ({ params }) => {
	const { placeId } = params;

	const [hospital, alreadyReserved] = await Promise.all([
		prisma.places.findUnique({
			where: {
				id: placeId
			}
		}),
		prisma.reservation_Slots.findMany({
			where: {
				Place: {
					id: placeId
				},
				reserve_date: {
					gt: new Date()
				}
			}
		})
	]);

	// check if placeId exists or not

	if (!hospital) {
		throw {
			status: 404,
			error: 'Hospital not found'
		};
	}

	const availableDates = getDatesFrom(new Date(), 14).map((date) => ({
		date,
		periods: DEFAULT_TIME_SLOT.map((time) => ({
			...time,
			available:
				alreadyReserved.filter((reservation) => {
					return (
						checkEquivalenceDate(reservation.reserve_date, date) &&
						get24HoursTimeString(reservation.reserve_time) === time.time
					);
				}).length < MAX_SEAT_PER_TIME_SLOT && time.available
		}))
	}));

	const hospitalAvailability: HospitalAvailability = {
		id: placeId,
		name: hospital.name,
		availableDates
	};

	return { hospitalData: hospitalAvailability };
}) satisfies PageServerLoad;
