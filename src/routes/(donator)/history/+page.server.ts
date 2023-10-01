import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const userContext = await trpc.auth.getUser.query();
	if (userContext?.type !== 'DONATOR') {
		throw redirect(307, '/login');
	}

	if (userContext.user?.id === undefined) {
		throw redirect(307, '/login');
	}

	const reservationLog = await trpc.reservationSlot.getLog.query();
	const donationHistoryData = await trpc.donationHistory.getDonationHistories.query();
	const pendingFeedback = await trpc.postFeedback.checkPendingFeedback.query({
		id: userContext.user.id
	});

	console.log(pendingFeedback);

	return { reservationLog, donationHistoryData, pendingFeedback };
}) satisfies PageServerLoad;
