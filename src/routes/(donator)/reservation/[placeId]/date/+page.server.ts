import prisma from '$lib/server/database';
import { mock_hospitalData, type HospitalAvailability } from '../utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// check if placeId exists or not
	const hospital = await prisma.places.findUnique({
		where: {
			id: params.placeId
		}
	});

	if (!hospital) {
		return {
			status: 404,
			error: 'Hospital not found'
		};
	}

	const { placeId } = params;

	const alreadyReserved = await prisma.reservation_Slots.findMany({
		where: {
			place_id: placeId,
			reserve_date: {
				lt: new Date()
			}
		}
	});

	console.log(alreadyReserved);

	// mock get hospital data from database
	const hospitalData: HospitalAvailability = mock_hospitalData(placeId);

	return { hospitalData };
}) satisfies PageServerLoad;
