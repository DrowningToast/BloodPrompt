export interface HospitalAvailability {
	id: string;
	name: string;
	googleMapUrl: string;
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

export const SEAT_PER_TIME_SLOT = 3;
export const DEFAULT_TIME_SLOT = [
	{ time: '09:00', available: true },
	{ time: '10:00', available: true },
	{ time: '11:00', available: true },
	{ time: '13:00', available: false },
	{ time: '14:00', available: false },
	{ time: '15:00', available: true },
	{ time: '16:00', available: true },
	{ time: '17:00', available: true }
];

export const getDatesFrom = (start: Date, days: number) => {
	const dates = [];
	for (let i = 0; i < days; i++) {
		const date = new Date(start);
		date.setDate(date.getDate() + i);
		dates.push(date);
	}
	return dates;
};

export const mock_hospitalData = (placeId: any): HospitalAvailability => ({
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
	],
	googleMapUrl: 'https://www.google.com/maps/place/1.3521,103.8198'
});
