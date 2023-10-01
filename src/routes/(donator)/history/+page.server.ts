import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const user = await trpc.auth.getUser.query();

	const donationHistoryData = await trpc.donationHistory.getAllDonationHistoryByDonatorId.query({
		donatorId: user?.user.id || ''
	});
	console.log(donationHistoryData[0].Resevation.Reservation_Slot.Place.name);
	return { donationHistoryData };
}) satisfies PageServerLoad;

export const ssr = false;
