import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const trpc = trpcOnServer(fetch);
	const redemptionHistory = await trpc.reward.getRedemptionHistoryById.query({
		redemptionHistoryId: params.redeemId
	});
	const place = await trpc.places.findById.query({
		placeId: redemptionHistory?.Reward.place_id || ''
	});
	console.log(redemptionHistory);
	return {
		redemptionHistory,
		place
	};
}) satisfies PageServerLoad;
