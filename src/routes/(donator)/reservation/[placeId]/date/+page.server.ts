import prisma from '$lib/server/database';
import {
	mock_hospitalData,
	type HospitalAvailability,
	getDatesFrom,
	DEFAULT_TIME_SLOT,
	MAX_SEAT_PER_TIME_SLOT
} from '../utils';
import type { PageServerLoad } from './$types';
import { checkEquivalenceDate, get24HoursTimeString } from './utils';

export const load = (async ({ params }) => {
	// check if placeId exists or not
	const hospital = await prisma.places.findUnique({
		where: {
			id: params.placeId
		}
	});

	if (!hospital) {
		throw {
			status: 404,
			error: 'Hospital not found'
		};
	}

	const { placeId } = params;

	console.log(placeId);

	const alreadyReserved = await prisma.reservation_Slots.findMany({
		where: {
			Place: {
				id: placeId
			},
			reserve_date: {
				gt: new Date()
			}
		}
	});

	console.log(alreadyReserved);

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

	console.log(availableDates);

	const hospitalAvailability: HospitalAvailability = {
		id: placeId,
		name: hospital.name,
		availableDates
	};
	console.log(getDatesFrom(new Date(), 14));

	// mock get hospital data from database
	// const hospitalData: HospitalAvailability = mock_hospitalData(placeId);

	return { hospitalData: hospitalAvailability };
}) satisfies PageServerLoad;
