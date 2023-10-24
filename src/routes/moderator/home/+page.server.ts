import type { PageServerLoad } from './$types';
import { trpcOnServer } from '$lib/API/TRPC/trpc';
import prisma from '$lib/ORM';

function groupDatesByDay(dateArray: Date[]): Record<string, Date[]> {
	const groupedDates: Record<string, Date[]> = {};

	dateArray.forEach((date) => {
		// Get the date in 'YYYY-MM-DD' format
		const formattedDate: string = date.toISOString().slice(0, 10);

		// If the group for this date doesn't exist, create it
		if (!groupedDates[formattedDate]) {
			groupedDates[formattedDate] = [];
		}

		// Add the date to its respective group
		groupedDates[formattedDate].push(date);
	});

	return groupedDates;
}

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	// Sample array of date objects
	const dateArray: Date[] = [];

	// promise all
	const [places, medicalAccounts, donators, bloodTypeAggregations, donationHistories] =
		await Promise.all([
			trpc.places.findAll.query(),
			trpc.medicalStaff.findAll.query(),
			trpc.donators.findAll.query(),
			prisma.donation_History.groupBy({
				by: ['blood_type'],
				_count: {
					blood_type: true
				}
			}),
			prisma.donation_History.findMany()
		]);

	for (const data of donationHistories) {
		dateArray.push(new Date(data.created_at));
	}

	const groupedByDay: Record<string, Date[]> = groupDatesByDay(dateArray);

	const bloodTypeCount = [];
	for (const data of bloodTypeAggregations) {
		bloodTypeCount.push({
			group: data.blood_type,
			value: data._count.blood_type
		});
	}

	const donationCount = [];

	for (const key in groupedByDay) {
		const value = groupedByDay[key];
		donationCount.push({
			group: key,
			value: value.length
		});
	}

	return {
		places,
		medicalAccounts,
		donators,
		bloodTypeCount,
		donationCount
	};
}) satisfies PageServerLoad;
