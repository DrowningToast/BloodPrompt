import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const donationHistoryId = params.donationId;

	const trpc = trpcOnServer(fetch);

	const donationHistory = await trpc.donationHistory.getDonationHistory.query({
		id: donationHistoryId
	});

	if (!donationHistory) {
		throw redirect(307, '/history');
	}

	// already make a feedback
	if (donationHistory.post_donation_db_id) {
		throw redirect(307, '/history');
	}

	const place = donationHistory?.Reservation.Reservation_Slot.Place;
	const questions = await trpc.postFeedback.getPostFeedbackQuestions.query();

	return {
		donationHistoryId: params.donationId,
		placeData: place,
		donationHistoryData: donationHistory,
		questions
	};
}) satisfies PageServerLoad;
