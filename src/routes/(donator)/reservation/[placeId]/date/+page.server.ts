import { mock_hospitalData, type HospitalAvailability } from '../utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { placeId } = params;

	// mock get hospital data from database
	const hospitalData: HospitalAvailability = mock_hospitalData(placeId);

	return { hospitalData };
}) satisfies PageServerLoad;
