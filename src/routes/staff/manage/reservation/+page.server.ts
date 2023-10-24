import { trpcOnServer } from '$lib/API/TRPC/trpc';
import type { PageServerLoad } from '../reward/$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const [user, allReservation] = await Promise.all([
		trpc.auth.getUser.query(),
		trpc.reservation.findAll.query()
	]);

	const medicalAccount = await trpc.medicalStaff.findById.query({
		medicalStaffId: user?.user.id || ''
	});
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
