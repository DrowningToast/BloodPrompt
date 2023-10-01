import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const reservationLog = await trpc.reservation.getLog.query();
	const donationHistoryData = await trpc.donationHistory.getDonationHistories.query();
	const pendingFeedback = await trpc.postFeedback.checkPendingFeedback.query();

	return { reservationLog, donationHistoryData, pendingFeedback };
}) satisfies PageServerLoad;

export const ssr = false;
