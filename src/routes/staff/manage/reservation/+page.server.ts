import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from '../reward/$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const user = await trpc.auth.getUser.query();
	const medicalAccount = await trpc.medicalStaff.findById.query({
		medicalStaffId: user?.user.id || ''
	});
	const allReservation = await trpc.reservation.findAll.query();
	const placeReservations = [];
	for (const reservation of allReservation) {
		if (reservation.Reservation_Slot.place_id === medicalAccount?.Place.id) {
			placeReservations.push(reservation);
		}
	}

	return {
		allReservation: placeReservations
	};
}) satisfies PageServerLoad;
