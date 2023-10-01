import reservationController from '$lib/server/database/controllers/reservationController';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const reservation = await reservationController.getReservation({
		id: params.reservationId
	});
	if (!reservation) {
		throw redirect(307, '/home');
	}

	const place = reservation.Reservation_Slot.Place;

	return {
		reservationData: reservation,
		placeData: place,
		donatorData: reservation.Donator
	};
}) satisfies PageServerLoad;
