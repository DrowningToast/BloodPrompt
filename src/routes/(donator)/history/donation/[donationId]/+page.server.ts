import { trpcOnServer } from '$lib/server/API/TRPC/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const trpc = trpcOnServer(fetch);

	const donation = await trpc.donationHistory.getDonationHistory.query({
		id: params.donationId
	});

	if (!donation) {
		throw redirect(307, '/history');
	}

	const placeData = donation?.Reservation.Reservation_Slot.Place;
	const donator = donation?.Reservation.Donator;

	return {
		donationData: donation,
		placeData,
		donatorData: donator
	};
}) satisfies PageServerLoad;
