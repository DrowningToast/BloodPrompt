import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const reservationLog = await trpc.reservation.getLog.query();
	const donationHistoryData = await trpc.donationHistory.getDonationHistories.query();

	return { reservationLog, donationHistoryData };
}) satisfies PageServerLoad;
