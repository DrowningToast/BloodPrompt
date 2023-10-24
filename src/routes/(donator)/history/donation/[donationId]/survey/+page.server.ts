import { trpcOnServer } from '$lib/API/TRPC/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const donationHistoryId = params.donationId;

	const trpc = trpcOnServer(fetch);

	// promise all
	const [donationHistory, questions] = await Promise.all([
		trpc.donationHistory.getDonationHistory.query({
			id: donationHistoryId
		}),
		trpc.postFeedback.getPostFeedbackQuestions.query()
	]);

	if (!donationHistory) {
		throw redirect(307, '/history');
	}

	// already make a feedback
	if (donationHistory.post_donation_db_id) {
		throw redirect(307, '/history');
	}

	const place = donationHistory?.Reservation.Reservation_Slot.Place;

	return {
		donationHistoryId: params.donationId,
		placeData: place,
		donationHistoryData: donationHistory,
		questions
	};
}) satisfies PageServerLoad;
