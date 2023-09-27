import type { PageServerLoad } from './$types';

export interface HospitalAvailability {
	id: string;
	name: string;
	availableDates: {
		date: Date;
		periods:
			| {
					time: string;
					available: boolean;
			  }[]
			| undefined;
	}[];
}

export const load = (async ({ params }) => {
	const { placeId } = params;

	// mock get hospital data from database
	const hospitalData: HospitalAvailability = {
		id: placeId,
		name: 'Hospital',
		availableDates: [
			{
				date: new Date('09-29-2023'),
				periods: [
					{ time: '09:00', available: true },
					{ time: '10:00', available: true },
					{ time: '11:00', available: true },
					{ time: '13:00', available: false },
					{ time: '14:00', available: false },
					{ time: '15:00', available: true },
					{ time: '16:00', available: true },
					{ time: '17:00', available: true }
				]
			},
			{
				date: new Date('09-30-2023'),
				periods: [
					{ time: '09:00', available: true },
					{ time: '10:00', available: true },
					{ time: '11:00', available: true },
					{ time: '13:00', available: false },
					{ time: '14:00', available: false },
					{ time: '15:00', available: true },
					{ time: '16:00', available: true },
					{ time: '17:00', available: true }
				]
			},
			{
				date: new Date('10-01-2023'),
				periods: [
					{ time: '09:00', available: true },
					{ time: '10:00', available: true },
					{ time: '11:00', available: true },
					{ time: '13:00', available: false },
					{ time: '14:00', available: false },
					{ time: '15:00', available: true },
					{ time: '16:00', available: true },
					{ time: '17:00', available: true }
				]
			}
		]
	};

	return { hospitalData };
}) satisfies PageServerLoad;
