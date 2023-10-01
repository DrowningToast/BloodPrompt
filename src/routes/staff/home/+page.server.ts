import type { PageServerLoad } from './$types';
import { trpcOnServer } from '$lib/trpc';
import prisma from '$lib/server/database';

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
	const places = await trpc.places.findAll.query();
	const medicalAccounts = await trpc.medicalStaff.findAll.query();
	const donators = await trpc.donators.findAll.query();
	const currentUser = await trpc.auth.getUser.query();
	const currentStaff = await trpc.medicalStaff.findById.query({
		medicalStaffId: currentUser?.user.id || ''
	});
	const reservations = await trpc.reservation.findAll.query();
	const allReservation = [];
	for (const reservation of reservations) {
		if (reservation.Reservation_Slot.place_id === currentStaff?.Place.id) {
			allReservation.push(reservation);
		}
	}

	// Prisma Group by
	const bloodTypeAggregations = await prisma.donation_History.groupBy({
		by: ['blood_type'],
		_count: {
			blood_type: true
		}
	});

	// Sample array of date objects
	const dateArray: Date[] = [];
	const donationHistories = await prisma.donation_History.findMany();
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

	const specialEvent = await trpc.specialEvent.getEvent.query();

	return {
		places,
		medicalAccounts,
		donators,
		bloodTypeCount,
		donationCount,
		currentStaff,
		allReservation,
		specialEvent
	};
}) satisfies PageServerLoad;
